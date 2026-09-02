import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const ScrollytellingHero = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);

  const frameCount = 196;
  const imagePath = '/ExplodedView/ezgif-frame-';

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const loadImages = async () => {
      const imagePromises = [];
      const priorityFrames = [1, frameCount];
      const regularFrames = [];

      for (let i = 2; i < frameCount; i++) {
        regularFrames.push(i);
      }

      for (const i of priorityFrames) {
        const img = new Image();
        const paddedIndex = i.toString().padStart(3, '0');
        img.src = `${imagePath}${paddedIndex}.jpg`;
        const promise = new Promise((resolve, reject) => {
          img.onload = () => {
            setLoadProgress(Math.round((priorityFrames.indexOf(i) + 1) / frameCount * 100));
            resolve();
          };
          img.onerror = reject;
        });
        imagesRef.current[i - 1] = img;
        imagePromises.push(promise);
      }

      for (const i of regularFrames) {
        const img = new Image();
        const paddedIndex = i.toString().padStart(3, '0');
        img.src = `${imagePath}${paddedIndex}.jpg`;
        const promise = new Promise((resolve, reject) => {
          img.onload = () => {
            const totalLoaded = priorityFrames.length + regularFrames.indexOf(i) + 1;
            setLoadProgress(Math.round((totalLoaded / frameCount) * 100));
            resolve();
          };
          img.onerror = reject;
        });
        imagesRef.current[i - 1] = img;
        imagePromises.push(promise);
      }

      await Promise.all(imagePromises);
      setImagesLoaded(true);
      renderFrame(0);
    };

    loadImages();

    const renderFrame = (frameIndex) => {
      const img = imagesRef.current[frameIndex];
      if (!img || !img.complete) return;

      context.fillStyle = '#000000';
      context.fillRect(0, 0, canvas.width, canvas.height);

      const imgAspect = img.width / img.height;
      const canvasAspect = canvas.width / canvas.height;
      let drawWidth, drawHeight, offsetX, offsetY;

      if (imgAspect > canvasAspect) {
        drawHeight = canvas.height;
        drawWidth = drawHeight * imgAspect;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      } else {
        drawWidth = canvas.width;
        drawHeight = drawWidth / imgAspect;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      }

      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      currentFrameRef.current = frameIndex;
    };

    let heroTrigger;

    const setupScrollAnimation = () => {
      heroTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          const frameIndex = Math.min(
            Math.floor(self.progress * (frameCount - 1)),
            frameCount - 1
          );
          if (frameIndex !== currentFrameRef.current) {
            renderFrame(frameIndex);
          }
        }
      });
    };

    if (imagesLoaded) {
      setupScrollAnimation();
    }

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      if (heroTrigger) heroTrigger.kill();
    };
  }, [imagesLoaded]);

  return (
    <section ref={containerRef} className="relative w-full" style={{ height: '500vh' }}>
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ background: '#000000' }}
        />

        {/* Loading overlay */}
        {!imagesLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-50">
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
                LOADING <span className="text-pop-red">POP</span>
              </h2>
              <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-pop-red transition-all duration-300 ease-out"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
              <p className="text-white/60 mt-4 text-lg">{loadProgress}%</p>
            </div>
          </div>
        )}

        {/* Beat 0 — entrance on load, exits on scroll */}
        <FirstBeat imagesLoaded={imagesLoaded} />


        {/* Beat 1 */}
        <ScrollyBeat
          start="15%"
          end="30%"
          className="items-start justify-center pl-8 md:pl-16 lg:pl-24"
          direction="left"
        >
          <h2 className="beat-headline text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight text-white">
            Feel the<br />fizz.
          </h2>
          <p className="beat-sub text-xl md:text-2xl text-gray-300 max-w-lg leading-relaxed font-light">
            Every bottle holds a little anticipation.
          </p>
          <p className="beat-sub text-xl md:text-2xl text-gray-300 mt-2 font-light">
            Then comes the <span className="text-pop-red font-bold">Pop.</span>
          </p>
        </ScrollyBeat>

        {/* Beat 2 */}
        <ScrollyBeat
          start="38%"
          end="55%"
          className="items-end justify-center pr-8 md:pr-16 lg:pr-24 text-right"
          direction="right"
        >
          <h2 className="beat-headline text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight text-white">
            Then everything<br />
            <span className="text-pop-red">changes.</span>
          </h2>
          <p className="beat-sub text-xl md:text-2xl text-gray-300 max-w-lg leading-relaxed font-light">One twist.</p>
          <p className="beat-sub text-xl md:text-2xl text-gray-300 font-light">One release.</p>
          <p className="beat-sub text-xl md:text-2xl text-gray-300 font-light">One unforgettable Pop.</p>
        </ScrollyBeat>

        {/* Beat 3 — final CTA */}
        <ScrollyBeat
          start="70%"
          end="100%"
          className="items-center justify-center text-center"
          direction="up"
        >
          <h2 className="beat-headline text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight text-white">
            Bold. Refreshing.<br />
            Unmistakably <span className="text-pop-red">Pop.</span>
          </h2>
          <p className="beat-sub text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed font-light mb-8">
            Rich cola flavor, crisp carbonation, and a refreshingly bold finish.
          </p>
          <div className="beat-sub flex flex-col sm:flex-row gap-4 items-center justify-center mt-8">
            <a
              href="#product"
              className="px-8 py-4 bg-pop-red hover:bg-pop-red-dark text-white font-bold text-lg rounded-full transition-all duration-300 transform hover:scale-105 uppercase tracking-wider"
            >
              Discover Pop Cola
            </a>
            <a
              href="#flavors"
              className="px-8 py-4 border-2 border-white hover:bg-white hover:text-black text-white font-bold text-lg rounded-full transition-all duration-300 uppercase tracking-wider"
            >
              Explore the range
            </a>
          </div>
        </ScrollyBeat>

        <ScrollIndicator imagesLoaded={imagesLoaded} />
      </div>
    </section>
  );
};

/* ─── First Beat: cinematic entrance on load, scroll-driven exit ─── */
const FirstBeat = ({ imagesLoaded }) => {
  const beatRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!imagesLoaded || hasAnimated.current) return;
    hasAnimated.current = true;

    const el = beatRef.current;
    if (!el) return;

    const heading = el.querySelector('.first-heading');
    const tagline = el.querySelector('.first-tagline');
    const sub = el.querySelector('.first-sub');
    const redWord = el.querySelector('.first-red');
    const cta = el.querySelector('.first-cta');

    // Split heading into chars for staggered entrance
    let split = null;
    try {
      split = new SplitText(heading, { type: 'chars,words' });
    } catch (e) {
      // SplitText not available — fall back gracefully
    }

    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    // Entrance
    gsap.set(el, { opacity: 1 });

    if (split && split.chars.length) {
      tl.from(split.chars, {
        opacity: 0,
        y: 80,
        rotateX: -90,
        transformOrigin: '50% 50% -40px',
        stagger: 0.025,
        duration: 1,
      });
    } else {
      tl.from(heading, { opacity: 0, y: 60, duration: 1 });
    }

    tl.from(
      redWord,
      { scale: 0.6, opacity: 0, duration: 0.7, ease: 'back.out(2)' },
      '-=0.4'
    );
    tl.from(tagline, { opacity: 0, y: 30, duration: 0.8 }, '-=0.3');
    if (sub) tl.from(sub, { opacity: 0, y: 20, duration: 0.7 }, '-=0.5');
    if (cta) tl.from(cta, { opacity: 0, y: 16, duration: 0.6 }, '-=0.4');

    // Scroll-driven exit
    const section = el.closest('section');
    if (section) {
      gsap.to(el, {
        opacity: 0,
        y: -60,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '12% top',
          scrub: 0.6,
        },
      });
    }

    return () => {
      split?.revert();
    };
  }, [imagesLoaded]);

  return (
    <div
      ref={beatRef}
      className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6 z-10"
      style={{ opacity: 0 }}
    >
      <div className="pointer-events-auto">
        <h1 className="first-heading text-6xl md:text-8xl lg:text-[clamp(4rem,10vw,9rem)] font-black leading-none mb-4 tracking-tighter text-white">
          Pop into something
        </h1>
        <h1 className="first-red text-6xl md:text-8xl lg:text-[clamp(4rem,10vw,9rem)] font-black leading-none mb-8 tracking-tighter text-pop-red inline-block">
          refreshing.
        </h1>

        <p className="first-tagline text-xl md:text-3xl text-gray-300 font-light max-w-2xl leading-relaxed mx-auto">
          Bold flavours. Crisp carbonation. Made in Nigeria.
        </p>

        <div className="first-cta flex flex-col sm:flex-row gap-4 items-center justify-center mt-10">
          <a
            href="#products"
            className="px-8 py-4 bg-pop-red hover:bg-pop-red-dark text-white font-bold text-base rounded-full transition-all duration-300 hover:scale-105 uppercase tracking-wider"
          >
            Our Range
          </a>
          <a
            href="#about"
            className="px-8 py-4 border border-white/30 hover:border-white text-white font-bold text-base rounded-full transition-all duration-300 uppercase tracking-wider"
          >
            Our Story
          </a>
        </div>
      </div>
    </div>
  );
};

/* ─── Subsequent beats: scroll-driven in + out ─── */
const ScrollyBeat = ({ start, end, className, direction = 'up', children }) => {
  const beatRef = useRef(null);

  const enterFrom = {
    up:    { y: 70,   x: 0,    rotateY: 0  },
    left:  { y: 0,    x: -80,  rotateY: 12 },
    right: { y: 0,    x: 80,   rotateY: -12 },
  }[direction] || { y: 70, x: 0, rotateY: 0 };

  useEffect(() => {
    const el = beatRef.current;
    if (!el) return;
    const section = el.closest('section');
    if (!section) return;

    const startPct = parseFloat(start) / 100;
    const endPct   = parseFloat(end) / 100;
    // Minimum fade window of 0.06 (6% of the scroll range) avoids frames
    // so short that the element flashes imperceptibly fast.
    const fadePct  = Math.max(0.06, Math.min(0.12, (endPct - startPct) * 0.28));

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      },
    });

    // Animate only the wrapper — do NOT separately tween opacity on children
    // while the parent opacity is also being tweened; that causes flicker from
    // compounding opacity multiplications at partial values.
    tl.fromTo(
      el,
      { opacity: 0, ...enterFrom },
      { opacity: 1, y: 0, x: 0, rotateY: 0, ease: 'power3.out', duration: fadePct },
      startPct
    );

    // Slide headline and subs using only transform (no opacity) so they don't
    // fight with the wrapper's own opacity fade.
    const headline = el.querySelector('.beat-headline');
    const subs     = el.querySelectorAll('.beat-sub');

    if (headline) {
      tl.fromTo(
        headline,
        { y: 40, skewY: 4 },
        { y: 0, skewY: 0, ease: 'expo.out', duration: fadePct * 0.8 },
        startPct + fadePct * 0.05
      );
    }
    if (subs.length) {
      tl.fromTo(
        subs,
        { y: 25 },
        { y: 0, ease: 'power2.out', stagger: 0.02, duration: fadePct * 0.6 },
        startPct + fadePct * 0.25
      );
    }

    // Exit — fade out wrapper only
    tl.to(
      el,
      { opacity: 0, y: direction === 'right' ? 0 : -50, x: direction === 'right' ? 80 : 0, ease: 'power2.in', duration: fadePct },
      endPct - fadePct
    );

    // Force timeline to exactly 1 second duration so percentages map perfectly to scroll
    tl.set({}, {}, 1);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [start, end, direction]);

  return (
    <div
      ref={beatRef}
      className={`absolute inset-0 flex flex-col pointer-events-none px-6 ${className}`}
      style={{ opacity: 0, perspective: '800px' }}
    >
      <div className="pointer-events-auto">
        {children}
      </div>
    </div>
  );
};

/* ─── Scroll indicator ─── */
const ScrollIndicator = ({ imagesLoaded }) => {
  const indicatorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (!imagesLoaded) return;

    // Pulse the dot
    gsap.to(dotRef.current, {
      scaleY: 0.3,
      opacity: 0,
      duration: 1,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    });

    // Fade out on first scroll
    gsap.to(indicatorRef.current, {
      opacity: 0,
      y: 10,
      scrollTrigger: {
        trigger: indicatorRef.current?.closest('section'),
        start: 'top top',
        end: '8% top',
        scrub: true,
      },
    });
  }, [imagesLoaded]);

  return (
    <div
      ref={indicatorRef}
      className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
    >
      <span className="text-xs uppercase tracking-[0.25em] mb-3 font-medium text-white/60">
        Scroll
      </span>
      <div
        ref={dotRef}
        className="w-px h-16 bg-gradient-to-b from-white/70 to-transparent origin-top"
      />
    </div>
  );
};

export default ScrollytellingHero;
