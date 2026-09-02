import React, { useEffect } from 'react';

const Hero = () => {
  useEffect(() => {
    const video = document.getElementById('heroVideo') || document.querySelector('#hero video');
    const hero = document.getElementById('hero');
    if (!video || !hero) return;

    let metadataLoaded = false;
    let rafId = null;
    let triggered = false;

    const onLoaded = () => { metadataLoaded = true; video.pause(); };
    video.addEventListener('loadedmetadata', onLoaded);

    // Respect user preference for reduced motion: hide video and use poster
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq && mq.matches) {
      try { video.pause(); video.style.display = 'none'; } catch (e) { /* ignore */ }
    }

    // Scroll-driven scrub
    const update = () => {
      const rect = hero.getBoundingClientRect();
      const height = rect.height || window.innerHeight;
      const progress = Math.min(Math.max((-rect.top) / height, 0), 1);

      if (metadataLoaded && video.duration > 0) {
        video.currentTime = progress * Math.max(video.duration, 0.001);
      }

      // when nearly complete, trigger next section and 3D sequence once
      if (progress >= 0.98 && !triggered) {
        triggered = true;
        // dispatch event for other parts of the app
        window.dispatchEvent(new Event('heroVideoComplete'));

        // call any helper to play the bottle sequence
        if (typeof window.playBottleSequence === 'function') {
          try { window.playBottleSequence(); } catch(e){}
        }

        // smooth scroll to next section
        const next = document.getElementById('what-makes-it-pop');
        if (next) next.scrollIntoView({ behavior: 'smooth' });
      }

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);

    // Pause when tab is hidden to save CPU/bandwidth
    const onVisibility = () => {
      if (document.hidden) { if (!video.paused) video.pause(); }
      else { /* do nothing; scrubbing will drive frames */ }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener('loadedmetadata', onLoaded);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden" id="hero">
      <video
        id="heroVideo"
        className="absolute inset-0 w-auto min-w-full h-full object-cover z-0"
        muted
        loop
        playsInline
        preload="auto"
        poster="/assets/pop-cola-3d-ref.png"
        aria-hidden="true"
      >
        <source src="/assets/Pop_Cola_bottle_product_animation.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-0 bg-gradient-to-b from-charcoal via-charcoal to-cola-brown/50 pointer-events-none" />
      
      <div className="container relative z-10 mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center mt-20 pointer-events-none">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-4 leading-none text-white drop-shadow-lg">
          TASTE THE <br />
          <span className="text-pop-red">POP</span>
        </h1>
        <p className="text-lg md:text-2xl font-medium max-w-2xl text-gray-300 mb-8 drop-shadow-md">
          The ultimate refreshing experience. Proudly made in Nigeria.
        </p>
        
        {/* Placeholder for CTA, ensuring it's clickable while container is pointer-events-none */}
        <div className="pointer-events-auto">
          <a href="#explore" className="inline-block border-2 border-white hover:bg-white hover:text-pop-red text-white font-bold py-3 px-8 rounded-full uppercase tracking-widest transition-colors">
            Explore
          </a>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center animate-bounce">
        <span className="text-xs uppercase tracking-widest mb-2 font-medium">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
