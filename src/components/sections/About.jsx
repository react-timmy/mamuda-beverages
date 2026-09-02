import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollReveal } from '../../hooks/useScrollReveal';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 20, suffix: 'M+', label: 'Happy Customers' },
  { value: 36, suffix: '',   label: 'States Reached' },
  { value: 18, suffix: '+',  label: 'Years in Market' },
  { value: 11, suffix: 'K', label: 'Group Employees' },
];

const AnimatedCounter = ({ value, suffix, label }) => {
  const numRef = useRef(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;

    // gsap.from tweens FROM the end value back to the start value internally,
    // so this.targets()[0].val reads the *start* (0) on every onUpdate tick.
    // Fix: use gsap.to on a plain proxy object and read .val as it climbs.
    const proxy = { val: 0 };

    const runCounter = () => {
      proxy.val = 0;
      gsap.to(proxy, {
        val: value,
        duration: 2,
        ease: 'power2.out',
        onUpdate() {
          el.textContent = Math.round(proxy.val) + suffix;
        },
      });
    };

    // The counter element lives inside a `.reveal` wrapper that starts at
    // opacity:0. We watch a slightly earlier threshold so the number starts
    // counting as the container fades in, not after it's invisible.
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: runCounter,
    });

    return () => trigger.kill();
  }, [value, suffix]);

  return (
    <div className="text-center group">
      <div
        ref={numRef}
        className="text-5xl md:text-6xl font-black text-pop-red mb-2 tabular-nums transition-transform duration-300 group-hover:scale-110"
      >
        0{suffix}
      </div>
      <div className="text-sm uppercase tracking-widest text-gray-400">{label}</div>
    </div>
  );
};

const About = () => {
  const sectionRef = useScrollReveal({ selector: '.reveal', stagger: 0.12, from: 'bottom', start: 'top 80%' });
  const lineRef = useRef(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.from(el, { scaleX: 0, duration: 1.2, ease: 'expo.out', transformOrigin: 'left' });
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden py-28 px-6 md:px-12"
      style={{ background: '#060205' }}
    >
      {/* Background texture lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px)',
      }} />

      {/* Red ambient */}
      <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pop-red/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* Section label */}
        <p className="reveal text-xs uppercase tracking-[0.35em] text-pop-red font-semibold mb-5">Our Story</p>

        {/* Headline */}
        <h2 className="reveal text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-4">
          A POP OF FLAVORS
        </h2>
        <h2 className="reveal text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-12 text-pop-red">
          SINCE DAY ONE
        </h2>

        {/* Divider */}
        <div ref={lineRef} className="w-full h-px bg-gradient-to-r from-pop-red via-white/20 to-transparent mb-16" />

        {/* Two-column story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div>
            <p className="reveal text-xl md:text-2xl text-gray-200 leading-relaxed font-light mb-6">
              Mamuda Beverages Nigeria Limited was founded in response to the need for a world-class soda drinks company based in Nigeria.
            </p>
            <p className="reveal text-lg text-gray-400 leading-relaxed font-light mb-6">
              As a proud member of the Mamuda Group — a prominent multi-industry conglomerate operating across five divisions — we have established ourselves as a leader in Nigeria's beverage industry.
            </p>
            <p className="reveal text-lg text-gray-400 leading-relaxed font-light">
              From our state-of-the-art factory in Kano to hands across 36 states, every bottle of Pop delivers the same exceptional taste and quality that has made us a household name across Nigeria.
            </p>
          </div>
          <div className="space-y-6">
            {/* ISO cert card */}
            <div className="reveal rounded-2xl border border-white/10 p-7 bg-white/3 hover:border-pop-red/40 transition-all duration-500 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-pop-red/15 flex items-center justify-center flex-shrink-0 group-hover:bg-pop-red/25 transition-colors duration-300">
                  <svg className="w-6 h-6 text-pop-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-black text-white text-lg uppercase tracking-wide mb-2">FSSC 22000 Certified</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    We hold the Food Safety System Certification (FSSC) 22000, validated against ISO 22000 — the international standard for food safety management. Every bottle is produced to the highest safety and quality standards.
                  </p>
                </div>
              </div>
            </div>

            {/* Factory card */}
            <div className="reveal rounded-2xl border border-white/10 p-7 bg-white/3 hover:border-pop-red/40 transition-all duration-500 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-pop-red/15 flex items-center justify-center flex-shrink-0 group-hover:bg-pop-red/25 transition-colors duration-300">
                  <svg className="w-6 h-6 text-pop-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-black text-white text-lg uppercase tracking-wide mb-2">State-of-the-Art Factory</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Our Kano facility uses cutting-edge equipment and technology, operated by a devoted, innovative team committed to consistent quality across every production run — 24 hours a day.
                  </p>
                </div>
              </div>
            </div>

            {/* Group card */}
            <div className="reveal rounded-2xl border border-white/10 p-7 bg-white/3 hover:border-pop-red/40 transition-all duration-500 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-pop-red/15 flex items-center justify-center flex-shrink-0 group-hover:bg-pop-red/25 transition-colors duration-300">
                  <svg className="w-6 h-6 text-pop-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-black text-white text-lg uppercase tracking-wide mb-2">Part of Mamuda Group</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Mamuda Group spans 5 business divisions: Beverages, Agro & Allied, Foods, Industries (Leather), and Care (Soaps & Detergents) — making it one of Nigeria's most diversified conglomerates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-8 rounded-3xl border border-white/8 bg-white/3 p-10 md:p-14">
          {STATS.map(s => (
            <AnimatedCounter key={s.label} {...s} />
          ))}
        </div>

        {/* Chairman section */}
        <div className="mt-24 reveal">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 md:p-12">
            <p className="text-xs uppercase tracking-[0.35em] text-pop-red font-semibold mb-6">A Story of Leadership</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-2 text-left">
                <img 
                  src="/assets/mamuda-chairman.jpg" 
                  alt="Chairman Hassan Hammoud" 
                  className="float-right w-2/3 md:w-1/2 ml-6 mr-4 lg:mr-8 mb-4 rounded-xl object-cover shadow-lg border border-white/10" 
                />
                <h3 className="text-3xl md:text-4xl font-black text-white mb-2 uppercase">
                  Hassan Hammoud
                </h3>
                <p className="text-pop-red font-semibold uppercase tracking-wider text-sm mb-6">
                  Chairman & CEO, Mamuda Group
                </p>
                <p className="text-gray-300 text-lg leading-relaxed font-light mb-4">
                  Hassan Hammoud is a second-generation business leader who has built Mamuda Group vertically and horizontally — expanding a diversified conglomerate based in Kano, Nigeria across five major industry divisions.
                </p>
                <p className="text-gray-400 leading-relaxed font-light">
                  His leadership philosophy has always centred on flexibility and adaptability to the Nigerian market — building an organisation that quickly adjusts to changing client demands. Under his vision, Mamuda Group now employs over 11,000 people and serves over 20 million customers across the country.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { label: 'HQ', value: 'Kano, Nigeria' },
                  { label: 'Founded', value: '2021 (Beverages)' },
                  { label: 'Certification', value: 'FSSC 22000' },
                  { label: 'Group Divisions', value: '5 Industries' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center border-b border-white/8 pb-3">
                    <span className="text-gray-500 text-sm uppercase tracking-wider">{item.label}</span>
                    <span className="text-white font-bold text-sm">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
