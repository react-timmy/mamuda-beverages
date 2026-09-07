import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

// How many viewport-heights the spacer occupies (controls scroll speed through animation)
const SCROLL_SCREENS = 5;

const BEATS = [
  { start: 0.15, end: 0.32 },
  { start: 0.40, end: 0.57 },
  { start: 0.68, end: 1.00 },
];

function getBeatIndex(p) {
  if (p < BEATS[0].start) return -1;
  for (let i = 0; i < BEATS.length; i++) {
    if (p >= BEATS[i].start && p <= BEATS[i].end) return i;
    const nextStart = BEATS[i + 1]?.start ?? Infinity;
    if (p > BEATS[i].end && p < nextStart) return i;
  }
  return BEATS.length - 1;
}

// ─────────────────────────────────────────────────────────────────────────────
const ScrollytellingHero = () => {
  const heroRef         = useRef(null);
  const canvasRef       = useRef(null);
  const spacerRef       = useRef(null);
  const rafRef          = useRef(null);          // animation frame id
  const displayFrameRef = useRef(0);             // current lerped frame (float)
  const renderedFrameRef = useRef(-1);           // last frame drawn to canvas
  const releasedRef     = useRef(false);         // true once hero has been released
  const reentryWatchRef = useRef(null);

  const [imagesLoaded, setImagesLoaded]  = useState(false);
  const [loadProgress, setLoadProgress]  = useState(0);
  const [beatIndex,    setBeatIndex]     = useState(-1);
  const [animDone,     setAnimDone]      = useState(false);

  const imagesRef  = useRef([]);
  const frameCount = 196;
  const imagePath  = '/ExplodedView/ezgif-frame-';

  // ── canvas render ─────────────────────────────────────────────────────────
  const renderFrame = useCallback((fi) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    const img = imagesRef.current[fi];
    if (!img?.complete || !img.naturalWidth) return;

    const iA = img.naturalWidth / img.naturalHeight;
    const cA = canvas.width / canvas.height;
    let dW, dH, oX, oY;
    if (iA > cA) {
      dH = canvas.height; dW = dH * iA;
      oX = (canvas.width - dW) / 2; oY = 0;
    } else {
      dW = canvas.width; dH = dW / iA;
      oX = 0; oY = (canvas.height - dH) / 2;
    }
    ctx.drawImage(img, oX, oY, dW, dH);
    renderedFrameRef.current = fi;
  }, []);

  // ── RAF scrub loop ────────────────────────────────────────────────────────
  // Reads native scroll, lerps display frame toward target, draws only on change
  const startRaf = useCallback(() => {
    if (rafRef.current) return;

    const LERP = 0.12; // smoothing — lower = more lag/cinema feel, higher = snappier

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);

      const spacer = spacerRef.current;
      if (!spacer || releasedRef.current) return;

      const spacerTop    = spacer.getBoundingClientRect().top + window.scrollY;
      const scrollHeight = spacer.offsetHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const rawProgress = clamp((window.scrollY - spacerTop) / scrollHeight, 0, 1);
      const targetFrame = rawProgress * (frameCount - 1);

      // Lerp display frame toward target
      const prev = displayFrameRef.current;
      const next = prev + (targetFrame - prev) * LERP;
      displayFrameRef.current = next;

      const fi = Math.round(next);
      if (fi !== renderedFrameRef.current) {
        renderFrame(fi);
        setBeatIndex(getBeatIndex(rawProgress));
      }

      // Release when scroll has reached the end of the spacer
      if (rawProgress >= 0.999 && !releasedRef.current) {
        releasedRef.current = true;
        releaseHeroFn.current?.();
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [renderFrame]);

  const stopRaf = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  // ── release hero ──────────────────────────────────────────────────────────
  // Stored in a ref so the RAF closure always calls the latest version
  const releaseHeroFn = useRef(null);

  const releaseHero = useCallback(() => {
    stopRaf();
    setAnimDone(true);

    // Restore normal body scroll
    document.body.style.overflow  = '';
    document.body.style.overflowX = 'hidden';

    const hero = heroRef.current;
    if (!hero) return;

    gsap.to(hero, {
      y: '-100%',
      duration: 0.75,
      ease: 'power3.inOut',
      onComplete: () => {
        hero.style.display = 'none';

        // Collapse the spacer so the 500vh gap doesn't remain in the DOM
        const spacer = spacerRef.current;
        if (spacer) {
          spacer.style.height  = '0';
          spacer.style.display = 'none';
        }

        // Snap scroll to top so page content starts at position 0
        window.scrollTo({ top: 0, behavior: 'instant' });

        watchForReentry();
      },
    });
  }, [stopRaf]);

  // Keep ref current
  useEffect(() => { releaseHeroFn.current = releaseHero; }, [releaseHero]);

  // ── watch for scroll-back-to-top ──────────────────────────────────────────
  const watchForReentry = useCallback(() => {
    if (reentryWatchRef.current) return;

    // Wait until the user has scrolled away from the top before we listen
    // for a return-to-top. This prevents the programmatic scrollTo(0) that
    // fires during release from immediately re-triggering the hero.
    let hasScrolledAway = false;

    const onScroll = () => {
      if (!hasScrolledAway) {
        // Mark once the user is clearly away from the top
        if (window.scrollY > 50) hasScrolledAway = true;
        return;
      }

      if (window.scrollY > 10) return;

      window.removeEventListener('scroll', onScroll);
      reentryWatchRef.current = null;

      window.scrollTo({ top: 0, behavior: 'instant' });

      const spacer = spacerRef.current;
      if (spacer) {
        spacer.style.display = 'block';
        spacer.style.height  = `${SCROLL_SCREENS * 100}vh`;
      }

      const hero = heroRef.current;
      if (!hero) return;
      hero.style.display = 'block';

      releasedRef.current    = false;
      displayFrameRef.current = frameCount - 1;
      renderedFrameRef.current = -1;
      setAnimDone(false);

      // Show last frame immediately
      renderFrame(frameCount - 1);

      gsap.fromTo(
        hero,
        { y: '-100%' },
        {
          y: 0,
          duration: 0.65,
          ease: 'power3.out',
          onComplete: () => {
            // Scroll back to spacer top so progress resets
            window.scrollTo({ top: 0, behavior: 'instant' });
            startRaf();
          },
        }
      );
    };

    // Delay attaching the listener by one frame so the programmatic
    // scrollTo(0) from releaseHero has fully settled and won't trigger onScroll.
    const tid = setTimeout(() => {
      window.addEventListener('scroll', onScroll, { passive: true });
    }, 200);
    reentryWatchRef.current = () => {
      clearTimeout(tid);
      window.removeEventListener('scroll', onScroll);
    };
  }, [renderFrame, startRaf]);

  // ── canvas sizing ─────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const setSize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-draw current frame at new size
      const fi = Math.round(displayFrameRef.current);
      renderedFrameRef.current = -1;
      renderFrame(fi);
    };
    setSize();
    window.addEventListener('resize', setSize);
    return () => window.removeEventListener('resize', setSize);
  }, [renderFrame]);

  // ── preload images ────────────────────────────────────────────────────────
  useEffect(() => {
    let loaded = 0;
    const indices = Array.from({ length: frameCount }, (_, k) => k + 1);

    // Load first frame immediately so there's something on screen fast
    const firstImg = new Image();
    firstImg.src = `${imagePath}001.jpg`;
    imagesRef.current[0] = firstImg;
    firstImg.onload = () => renderFrame(0);

    Promise.all(
      indices.map((i) =>
        new Promise((res) => {
          if (i === 1) { res(); return; } // already loading above
          const img = new Image();
          img.src = `${imagePath}${i.toString().padStart(3, '0')}.jpg`;
          img.onload  = () => { loaded++; setLoadProgress(Math.round((loaded + 1) / frameCount * 100)); res(); };
          img.onerror = () => res();
          imagesRef.current[i - 1] = img;
        })
      )
    ).then(() => {
      setLoadProgress(100);
      setImagesLoaded(true);
      renderFrame(0);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── start RAF once images ready ───────────────────────────────────────────
  useEffect(() => {
    if (!imagesLoaded) return;
    // Lock horizontal overflow only — vertical scroll drives the animation
    document.body.style.overflowX = 'hidden';
    startRaf();
    return () => {
      stopRaf();
      reentryWatchRef.current?.();
    };
  }, [imagesLoaded, startRaf, stopRaf]);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Fixed hero panel — stays in the viewport while user scrolls the spacer */}
      <div
        ref={heroRef}
        className="fixed inset-0 w-full h-screen z-[100] overflow-hidden"
        style={{ background: '#000' }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ background: '#000', display: 'block' }}
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

        {imagesLoaded && (
          <>
            <FirstBeat visible={beatIndex === -1} />

            <BeatPanel
              visible={beatIndex === 0}
              className="items-start justify-center pl-6 md:pl-16 lg:pl-24"
              direction="left"
            >
              <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-4 md:mb-6 leading-tight text-white">
                Feel the<br />fizz.
              </h2>
              <p className="text-base sm:text-xl md:text-2xl text-gray-300 max-w-sm md:max-w-lg leading-relaxed font-light">
                Every bottle holds a little anticipation.
              </p>
              <p className="text-base sm:text-xl md:text-2xl text-gray-300 mt-2 font-light">
                Then comes the <span className="text-pop-red font-bold">Pop.</span>
              </p>
            </BeatPanel>

            <BeatPanel
              visible={beatIndex === 1}
              className="items-end justify-center pr-6 md:pr-16 lg:pr-24 text-right"
              direction="right"
            >
              <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-4 md:mb-6 leading-tight text-white">
                Then everything<br />
                <span className="text-pop-red">changes.</span>
              </h2>
              <p className="text-base sm:text-xl md:text-2xl text-gray-300 max-w-sm md:max-w-lg leading-relaxed font-light">One twist.</p>
              <p className="text-base sm:text-xl md:text-2xl text-gray-300 font-light">One release.</p>
              <p className="text-base sm:text-xl md:text-2xl text-gray-300 font-light">One unforgettable Pop.</p>
            </BeatPanel>

            <BeatPanel
              visible={beatIndex === 2}
              className="items-center justify-center text-center"
              direction="up"
            >
              <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-4 md:mb-6 leading-tight text-white">
                Bold. Refreshing.<br />
                Unmistakably <span className="text-pop-red">Pop.</span>
              </h2>
              <p className="text-base sm:text-xl md:text-2xl text-gray-300 max-w-xs sm:max-w-xl md:max-w-3xl leading-relaxed font-light mb-4 md:mb-8">
                Rich cola flavour, crisp carbonation, and a refreshingly bold finish.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center mt-6 sm:mt-8">
                <a
                  href="#products"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-pop-red hover:bg-pop-red-dark text-white font-bold text-base sm:text-lg rounded-full transition-all duration-300 hover:scale-105 uppercase tracking-wider text-center"
                >
                  Discover Pop Cola
                </a>
                <a
                  href="#about"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 border-2 border-white hover:bg-white hover:text-black text-white font-bold text-base sm:text-lg rounded-full transition-all duration-300 uppercase tracking-wider text-center"
                >
                  Explore the range
                </a>
              </div>
            </BeatPanel>

            {!animDone && <ScrollIndicator />}
          </>
        )}
      </div>

      {/*
        Tall spacer — this is what the user actually scrolls through.
        The fixed hero above reads window.scrollY relative to this spacer
        to derive progress (0 → 1) across the animation.
      */}
      <div
        ref={spacerRef}
        style={{ height: `${SCROLL_SCREENS * 100}vh` }}
        aria-hidden="true"
      />
    </>
  );
};

// ─── FirstBeat ────────────────────────────────────────────────────────────────
const FirstBeat = ({ visible }) => {
  const ref          = useRef(null);
  const entranceDone = useRef(false);

  useEffect(() => {
    if (!visible || entranceDone.current) return;
    entranceDone.current = true;
    const el = ref.current;
    if (!el) return;

    const heading = el.querySelector('.fb-heading');
    const red     = el.querySelector('.fb-red');
    const tagline = el.querySelector('.fb-tagline');
    const cta     = el.querySelector('.fb-cta');

    let split = null;
    try { split = new SplitText(heading, { type: 'chars,words' }); } catch (_) {}

    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    gsap.set(el, { opacity: 1 });
    if (split?.chars?.length) {
      tl.from(split.chars, {
        opacity: 0, y: 80, rotateX: -90,
        transformOrigin: '50% 50% -40px',
        stagger: 0.025, duration: 1,
      });
    } else {
      tl.from(heading, { opacity: 0, y: 60, duration: 1 });
    }
    tl.from(red,     { scale: 0.6, opacity: 0, duration: 0.7, ease: 'back.out(2)' }, '-=0.4');
    tl.from(tagline, { opacity: 0, y: 30, duration: 0.8 }, '-=0.3');
    if (cta) tl.from(cta, { opacity: 0, y: 16, duration: 0.6 }, '-=0.4');

    return () => { split?.revert(); };
  }, [visible]);

  useEffect(() => {
    if (!entranceDone.current) return;
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { opacity: visible ? 1 : 0, duration: 0.3, ease: 'power2.inOut' });
  }, [visible]);

  return (
    <div
      ref={ref}
      className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6 z-10"
      style={{ opacity: 0 }}
    >
      <div className="pointer-events-auto">
        <h1 className="fb-heading text-[clamp(2.6rem,10vw,9rem)] font-black leading-none mb-3 md:mb-4 tracking-tighter text-white">
          Pop into something
        </h1>
        <h1 className="fb-red text-[clamp(2.6rem,10vw,9rem)] font-black leading-none mb-5 md:mb-8 tracking-tighter text-pop-red inline-block">
          refreshing.
        </h1>
        <p className="fb-tagline text-base sm:text-xl md:text-3xl text-gray-300 font-light max-w-xs sm:max-w-xl md:max-w-2xl leading-relaxed mx-auto">
          Bold flavours. Crisp carbonation. Made in Nigeria.
        </p>
        <div className="fb-cta flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center mt-7 sm:mt-10">
          <a
            href="#products"
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-pop-red hover:bg-pop-red-dark text-white font-bold text-sm sm:text-base rounded-full transition-all duration-300 hover:scale-105 uppercase tracking-wider text-center"
          >
            Our Range
          </a>
          <a
            href="#about"
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 border border-white/30 hover:border-white text-white font-bold text-sm sm:text-base rounded-full transition-all duration-300 uppercase tracking-wider text-center"
          >
            Our Story
          </a>
        </div>
      </div>
    </div>
  );
};

// ─── BeatPanel ────────────────────────────────────────────────────────────────
const ENTER = { left: { x: -70, y: 0 }, right: { x: 70, y: 0 }, up: { x: 0, y: 60 } };

const BeatPanel = ({ visible, className, direction = 'up', children }) => {
  const ref     = useRef(null);
  const prevRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const was = prevRef.current;
    prevRef.current = visible;
    const from = ENTER[direction] ?? ENTER.up;

    if (visible && !was) {
      gsap.killTweensOf(el);
      gsap.fromTo(el, { opacity: 0, ...from }, { opacity: 1, x: 0, y: 0, duration: 0.5, ease: 'power3.out' });
    } else if (!visible && was) {
      gsap.killTweensOf(el);
      gsap.to(el, { opacity: 0, duration: 0.3, ease: 'power2.in' });
    }
  }, [visible, direction]);

  return (
    <div
      ref={ref}
      className={`absolute inset-0 flex flex-col pointer-events-none px-6 ${className}`}
      style={{ opacity: 0 }}
    >
      <div className="pointer-events-auto">{children}</div>
    </div>
  );
};

// ─── ScrollIndicator ─────────────────────────────────────────────────────────
const ScrollIndicator = () => {
  const dotRef = useRef(null);
  useEffect(() => {
    gsap.to(dotRef.current, {
      scaleY: 0.3, opacity: 0, duration: 1,
      ease: 'power1.inOut', repeat: -1, yoyo: true,
    });
  }, []);
  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none">
      <span className="text-[10px] uppercase tracking-[0.2em] mb-2 font-medium text-white/40">Scroll</span>
      <div ref={dotRef} className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent origin-top" />
    </div>
  );
};

export default ScrollytellingHero;
