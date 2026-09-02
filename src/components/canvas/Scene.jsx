import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, Float, PerspectiveCamera } from '@react-three/drei';
import Bottle from './Bottle';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Scene = () => {
  const [timeline, setTimeline] = useState(null);

  useEffect(() => {
    if (!timeline) return;

    // Master ScrollTrigger that drives the timeline passed from the Bottle
    const st = ScrollTrigger.create({
      trigger: '#root',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      animation: timeline,
    });

    return () => {
      st.kill();
    };
  }, [timeline]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={35} />
        
        {/* Lighting setup */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <Environment preset="studio" />
          
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <Bottle setTimeline={setTimeline} />
          </Float>
          
          <ContactShadows 
            position={[0, -3.5, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2} 
            far={10} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;
