import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import gsap from 'gsap';
import { Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Bottle = ({ setTimeline }) => {
  const group = useRef();
  
  // Refs for components
  const capRef = useRef();
  const bodyRef = useRef();
  const liquidRef = useRef();
  const labelRef = useRef();

  const { camera, size } = useThree();
  const [gltf, setGltf] = useState(null);
  const [triedLoad, setTriedLoad] = useState(false);

  // Try to load an exported GLB if it exists. Fall back to procedural geometry if not.
  useEffect(() => {
    let mounted = true;
    const loader = new GLTFLoader();
    loader.load(
      '/assets/popcola_hero.glb',
      (data) => { if (mounted) setGltf(data); },
      undefined,
      () => { if (mounted) setGltf(null); }
    );
    // mark that we attempted loading regardless of success
    setTriedLoad(true);
    return () => { mounted = false; };
  }, []);

  const tlRef = useRef(null);

  useLayoutEffect(() => {
    // Create timeline that will be driven by scroll
    const tl = gsap.timeline({ paused: true });
    tlRef.current = tl;
    
    // We assume scroll goes from 0 to 1 over the whole page
    // The actual mapping will be handled by ScrollTrigger in Scene.jsx
    // But let's build the sequence here.
    
    // 1. Hero -> What Makes It Pop (Move to the right, scale down, rotate)
    tl.to(group.current.position, {
      x: 3,
      y: -1.5,
      z: -2,
      duration: 1,
      ease: "power2.inOut"
    }, 0);
    
    tl.to(group.current.rotation, {
      y: Math.PI * 0.5,
      x: 0.2,
      duration: 1,
      ease: "power2.inOut"
    }, 0);

    // 2. What Makes It Pop -> Exploded View (Move to left, explode)
    // Starts at time = 1, ends at time = 2
    tl.to(group.current.position, {
      x: -2.5,
      y: -1,
      z: 0,
      duration: 1,
      ease: "power2.inOut"
    }, 1);

    tl.to(group.current.rotation, {
      y: Math.PI * 2,
      x: 0,
      duration: 1,
      ease: "power2.inOut"
    }, 1);

    // The Explosion
    tl.to(capRef.current.position, {
      y: 4.5,
      duration: 1,
      ease: "power2.inOut"
    }, 1);
    
    tl.to(bodyRef.current.position, {
      y: 1.5,
      duration: 1,
      ease: "power2.inOut"
    }, 1);
    
    tl.to(liquidRef.current.position, {
      y: -1.5,
      duration: 1,
      ease: "power2.inOut"
    }, 1);
    
    tl.to(labelRef.current.position, {
      y: -0.5,
      z: 1.5,
      duration: 1,
      ease: "power2.inOut"
    }, 1);

    // 3. Reassemble (Scroll past exploded view)
    // Starts at time = 2, ends at time = 3
    tl.to(capRef.current.position, { y: 2.5, duration: 1, ease: "power2.inOut" }, 2);
    tl.to(bodyRef.current.position, { y: 0, duration: 1, ease: "power2.inOut" }, 2);
    tl.to(liquidRef.current.position, { y: -0.1, duration: 1, ease: "power2.inOut" }, 2);
    tl.to(labelRef.current.position, { y: 0, z: 0, duration: 1, ease: "power2.inOut" }, 2);
    
    tl.to(group.current.position, {
      x: 0,
      y: -1,
      duration: 1,
      ease: "power2.inOut"
    }, 2);

    // Expose a helper to project the bottle's current world position to screen coordinates
    // This is used by the DOM-based add-to-cart animation.
    const v3 = new Vector3();

    // attach function to window for simplicity (could be event bus instead)
    window.getBottleScreenPosition = (opts = {}) => {
      if (!group.current) return null;
      // get center of group in world space
      group.current.getWorldPosition(v3);

      // slight upward offset so the flying ball appears from the bottle center/top
      if (opts.offset) v3.y += opts.offset;

      // project to NDC
      const projected = v3.clone().project(camera);

      // Find the canvas bounding rect to convert NDC to client coordinates
      const canvas = document.querySelector('canvas');
      let left = 0, top = 0, width = window.innerWidth, height = window.innerHeight;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        left = rect.left; top = rect.top; width = rect.width; height = rect.height;
      }

      // convert NDC to pixel coords within canvas, then to page coordinates
      const x = left + (projected.x + 1) / 2 * width;
      const y = top + (-projected.y + 1) / 2 * height;

      // return client coordinates
      return { x, y };
    };

    if (setTimeline) {
      setTimeline(tl);
    }

    // expose play helper for external triggers (e.g., when hero video completes)
    window.playBottleSequence = () => {
      try {
        if (tlRef.current) {
          // tween to time = 2 (the reassemble phase) smoothly
          tlRef.current.tweenTo(2, { duration: 1.2, ease: 'power2.inOut' });
        }
      } catch (e) { /* ignore */ }
    };
    
    return () => {
      tl.kill();
      try { delete window.getBottleScreenPosition; } catch(e){}
      try { delete window.playBottleSequence; } catch(e){}
    };
  }, [setTimeline]);

  useFrame((state) => {
    // Continuous floating
    if (group.current) {
      group.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.002;
    }
  });

  return (
    <group ref={group} dispose={null} scale={[1.2, 1.2, 1.2]} position={[0, -1, 0]}>
      {gltf ? (
        // If a GLB was loaded, use it. We clone the scene so multiple instances remain independent.
        <primitive object={gltf.scene.clone(true)} />
      ) : (
        // Fallback procedural geometry (keeps previous behavior)
        <>
          {/* Cap */}
          <mesh ref={capRef} position={[0, 2.5, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.4, 32]} />
            <meshStandardMaterial color="#e61c24" roughness={0.2} metalness={0.1} />
          </mesh>

          {/* Body - Glass/Plastic */}
          <mesh ref={bodyRef} position={[0, 0, 0]}>
            <cylinderGeometry args={[0.8, 0.8, 4.5, 32]} />
            <MeshTransmissionMaterial 
              backside 
              samples={4} 
              thickness={0.5} 
              chromaticAberration={0.025} 
              anisotropy={0.1} 
              distortion={0.1} 
              distortionScale={0.1} 
              temporalDistortion={0.2} 
              clearcoat={1} 
              attenuationDistance={0.5} 
              attenuationColor="#ffffff" 
              color="#ffffff" 
            />
          </mesh>

          {/* Liquid */}
          <mesh ref={liquidRef} position={[0, -0.1, 0]}>
            <cylinderGeometry args={[0.75, 0.75, 4.2, 32]} />
            <meshStandardMaterial color="#2d1003" roughness={0.1} metalness={0.8} />
          </mesh>

          {/* Label */}
          <mesh ref={labelRef} position={[0, 0, 0]}>
            <cylinderGeometry args={[0.81, 0.81, 1.5, 32]} />
            <meshStandardMaterial color="#e61c24" roughness={0.4} metalness={0.1} />
          </mesh>
        </>
      )}
    </group>
  );
};

export default Bottle;
