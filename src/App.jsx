import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './components/layout/Navigation';
import ScrollytellingHero from './components/sections/ScrollytellingHero';
import DrinkMarquee from './components/sections/DrinkMarquee';
import Products from './components/sections/Products';
import About from './components/sections/About';
import Mission from './components/sections/Mission';
import ProductCTA from './components/sections/ProductCTA';

gsap.registerPlugin(ScrollTrigger);

/* ── Reusable magnetic CTA button ── */
export const MagneticBtn = ({ href, children, className = '', style = {} }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 18;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 18;
      gsap.to(el, { x, y, duration: 0.4, ease: 'power2.out' });
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' });
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, []);
  return (
    <a ref={ref} href={href} className={className} style={style}>
      {children}
    </a>
  );
};

function App() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    ScrollTrigger.refresh();

    // Custom cursor
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    let mx = 0, my = 0;
    const move = (e) => {
      mx = e.clientX; my = e.clientY;
      gsap.to(dot, { x: mx, y: my, duration: 0.08, ease: 'none' });
      gsap.to(cursor, { x: mx, y: my, duration: 0.35, ease: 'power2.out' });
    };

    const grow = () => gsap.to(cursor, { scale: 2.5, opacity: 0.5, duration: 0.3 });
    const shrink = () => gsap.to(cursor, { scale: 1, opacity: 0.6, duration: 0.3 });

    window.addEventListener('mousemove', move);
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', grow);
      el.addEventListener('mouseleave', shrink);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      // Do NOT kill all ScrollTriggers here — each section component
      // manages its own triggers in their own useEffect cleanups.
    };
  }, []);

  return (
    <>
      {/* Custom cursor — hidden on touch devices */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-pop-red/60 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 opacity-60 hidden md:block mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-pop-red pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ willChange: 'transform' }}
      />

      <main
        className="relative min-h-screen text-white font-sans selection:bg-pop-red selection:text-white"
        style={{ background: '#050505' }}
      >
        <Navigation />

        {/* Scrollytelling hero (frame-by-frame explosion) */}
        <ScrollytellingHero />

        {/* Marquee Section */}
        <DrinkMarquee />

        {/* Products */}
        <Products />

        {/* About Mamuda */}
        <About />

        {/* Mission / Why Choose Us */}
        <Mission />

        {/* CTA */}
        <ProductCTA />

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}

/* ── Footer ── */
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer
      id="contact"
      className="py-20 px-6 md:px-12 border-t border-white/8"
      style={{ background: '#030203' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/assets/mamuda-logo.png" alt="Mamuda Beverages" className="h-10 w-auto" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
              Mamuda Beverages Nigeria Limited — makers of Pop Cola, Pop Power Energy Drink, and a full range of carbonated beverages. From our Kano factory to every corner of Nigeria.
            </p>
            <p className="text-gray-500 text-xs uppercase tracking-wider">
              Part of the <span className="text-white/60">Mamuda Group</span>
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-black text-white text-sm uppercase tracking-widest mb-5">Products</h4>
            <ul className="space-y-2.5 text-gray-400 text-sm">
              {['Pop Cola', 'Pop Apple', 'Pop Green Apple', 'Pop Chapman', 'Pop Up', 'Pop Orange', 'Pop Power'].map(p => (
                <li key={p}>
                  <a href="#products" className="hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-black text-white text-sm uppercase tracking-widest mb-5">Company</h4>
            <ul className="space-y-2.5 text-gray-400 text-sm">
              <li><a href="#about" className="hover:text-white transition-colors">About Mamuda</a></li>
              <li><a href="#mission" className="hover:text-white transition-colors">Our Mission</a></li>
              <li><a href="https://www.mamudagroup.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Mamuda Group ↗</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>

            <h4 className="font-black text-white text-sm uppercase tracking-widest mt-8 mb-5">Connect</h4>
            <ul className="space-y-2.5 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter / X</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>&copy; {year} Mamuda Beverages Nigeria Limited. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default App;
