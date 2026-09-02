import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollReveal } from '../../hooks/useScrollReveal';

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Refreshing Taste',
    body: 'Perfect cola flavour balanced with smooth fizz. Every sip engineered for maximum refreshment.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'FSSC 22000 Quality',
    body: 'Internationally certified food safety management. The same rigorous standards from our factory to your hand.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Nationwide Reach',
    body: 'Available across 36 states in Nigeria. From Lagos to Kano, a cold Pop is never far away.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Cutting-Edge Tech',
    body: 'State-of-the-art production facility with the latest bottling and carbonation technology in West Africa.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Made in Nigeria',
    body: 'Proudly Nigerian — crafted by Nigerian hands, for Nigerian people, using local expertise and global standards.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: 'Full Flavour Range',
    body: 'Seven distinct flavours — cola, apple, green apple, chapman, lemon & lime, orange, and energy — something for everyone.',
  },
];

const Mission = () => {
  const sectionRef = useScrollReveal({ selector: '.reveal', stagger: 0.1, from: 'bottom' });
  return (
    <section
      id="mission"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: '#050505' }}
    >
      <div className="px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="reveal text-xs uppercase tracking-[0.35em] text-pop-red font-semibold mb-4">Why Choose Pop</p>
            <h2 className="reveal text-5xl md:text-7xl lg:text-8xl font-black leading-tight">
              WHAT MAKES US <span className="text-pop-red">DIFFERENT</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map((p, i) => (
              <div
                key={p.title}
                className="reveal group rounded-2xl border border-white/8 bg-white/3 p-8 hover:border-pop-red/40 hover:bg-white/6 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-pop-red/10 flex items-center justify-center text-pop-red mb-6 group-hover:bg-pop-red group-hover:text-white transition-all duration-300">
                  {p.icon}
                </div>
                <h3 className="font-black text-white text-xl uppercase tracking-wide mb-3">{p.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm font-light">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
