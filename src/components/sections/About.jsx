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

    const proxy = { val: 0 };
    const anim = gsap.to(proxy, {
      val: value,
      duration: 2,
      ease: 'power2.out',
      onUpdate() {
        el.textContent = Math.round(proxy.val) + suffix;
      },
    });

    return () => anim.kill();
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
    const anim = gsap.from(el, { scaleX: 0, duration: 1.2, ease: 'expo.out', transformOrigin: 'left' });
    return () => anim.kill();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden py-12 sm:py-20 px-4 sm:px-6 md:px-12"
      style={{ background: '#060205' }}
    >
      {/* Red ambient */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] h-[500px] bg-pop-red/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* Section label */}
        <p className="reveal text-xs uppercase tracking-[0.35em] text-pop-red font-semibold mb-5">Our Story</p>

        {/* Headline */}
        <h2 className="reveal text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-4">
          A POP OF FLAVORS
        </h2>
        <h2 className="reveal text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-6 sm:mb-8 text-pop-red">
          SINCE DAY ONE
        </h2>

        {/* Divider */}
        <div ref={lineRef} className="w-full h-px bg-gradient-to-r from-pop-red via-white/20 to-transparent mb-10 sm:mb-14" />

        {/* Two-column story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-10 sm:mb-16">
          <p className="reveal text-lg sm:text-xl md:text-2xl text-gray-200 leading-relaxed font-light">
            Mamuda Beverages Nigeria Limited was built to bring world-class soda to Nigeria — produced right here, for Nigerian people.
          </p>
          <p className="reveal text-base sm:text-lg text-gray-400 leading-relaxed font-light">
            A proud member of the Mamuda Group, our FSSC 22000-certified factory in Kano runs 24 hours a day to put Pop on shelves across all 36 states.
          </p>
        </div>

        {/* Stats row */}
        <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 rounded-3xl border border-white/8 bg-white/3 p-7 sm:p-10">
          {STATS.map(s => (
            <AnimatedCounter key={s.label} {...s} />
          ))}
        </div>

        {/* Chairman section */}
        <div className="mt-10 sm:mt-16 reveal">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 sm:p-8 md:p-12">
            <p className="text-xs uppercase tracking-[0.35em] text-pop-red font-semibold mb-5 sm:mb-6">A Story of Leadership</p>

            {/* Mobile: stacked layout */}
            <div className="flex flex-col md:hidden gap-6">
              <div className="flex items-start gap-4">
                <img
                  src="/assets/mamuda-chairman.jpg"
                  alt="Chairman Hassan Hammoud"
                  className="w-28 sm:w-36 rounded-xl object-cover shadow-lg border border-white/10 flex-shrink-0"
                />
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-1 uppercase leading-tight">
                    Hassan Hammoud
                  </h3>
                  <p className="text-pop-red font-semibold uppercase tracking-wider text-xs sm:text-sm">
                    Chairman & CEO, Mamuda Group
                  </p>
                </div>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                Hassan Hammoud is a second-generation business leader who has built Mamuda Group vertically and horizontally — expanding a diversified conglomerate based in Kano, Nigeria across five major industry divisions.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                His leadership philosophy has always centred on flexibility and adaptability to the Nigerian market. Under his vision, Mamuda Group now employs over 11,000 people and serves over 20 million customers across the country.
              </p>
              <div className="flex flex-col gap-3 pt-2">
                {[
                  { label: 'HQ', value: 'Kano, Nigeria' },
                  { label: 'Founded', value: '2021 (Beverages)' },
                  { label: 'Certification', value: 'FSSC 22000' },
                  { label: 'Group Divisions', value: '5 Industries' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center border-b border-white/8 pb-3">
                    <span className="text-gray-500 text-xs uppercase tracking-wider">{item.label}</span>
                    <span className="text-white font-bold text-sm">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: original 3-col grid */}
            <div className="hidden md:grid grid-cols-3 gap-8 items-start">
              <div className="md:col-span-2 text-left">
                <img 
                  src="/assets/mamuda-chairman.jpg" 
                  alt="Chairman Hassan Hammoud" 
                  className="float-right w-1/2 ml-6 mr-4 lg:mr-8 mb-4 rounded-xl object-cover shadow-lg border border-white/10" 
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
