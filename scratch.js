import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal({
  selector = '.reveal',
  stagger = 0.12,
  from = 'bottom',
  distance = 50,
  duration = 0.9,
  ease = 'power3.out',
  start = 'top 85%',
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll(selector);
    if (!targets.length) return;

    // First ensure they are visible in CSS
    gsap.set(targets, { opacity: 1 });

    const anim = gsap.from(targets, {
      opacity: 0,
      y: from === 'bottom' ? distance : from === 'top' ? -distance : 0,
      x: from === 'left' ? -distance : from === 'right' ? distance : 0,
      scale: from === 'scale' ? 0.85 : 1,
      duration,
      ease,
      stagger,
      scrollTrigger: {
        trigger: el,
        start,
        once: true,
      },
    });

    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
      anim.kill();
    };
  }, [selector, stagger, from, distance, duration, ease, start]);

  return ref;
}
