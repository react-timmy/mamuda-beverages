import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollReveal } from '../../hooks/useScrollReveal';

gsap.registerPlugin(ScrollTrigger);

const ProductCTA = () => {
  const sectionRef = useScrollReveal({ selector: '.reveal', stagger: 0.1, from: 'bottom' });
  const glowRef = useRef(null);

  // Parallax on the glow blob
  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    const trigger = ScrollTrigger.create({
      trigger: el.closest('section'),
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        gsap.set(el, { y: self.progress * -120 });
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <section
      id="buy"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center p-6 md:p-12 overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* Parallax glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #e61c2418 0%, transparent 70%)' }}
      />

      <div className="relative max-w-5xl w-full">
        <div className="text-center mb-16">
          <p className="reveal text-xs uppercase tracking-[0.35em] text-pop-red font-semibold mb-4">
            Get Your Pop
          </p>
          <h2 className="reveal text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
            WHERE TO FIND <span className="text-pop-red">POP</span>
          </h2>
          <p className="reveal text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Mamuda Beverages products are available nationwide — from major retail chains to your nearest corner store across all 36 states.
          </p>
        </div>

        {/* CTA strip */}
        <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="rounded-2xl border border-white/10 bg-white/4 p-8 hover:border-pop-red/40 transition-all duration-500 group">
            <div className="w-12 h-12 rounded-xl bg-pop-red/10 flex items-center justify-center mb-5 group-hover:bg-pop-red/20 transition-colors">
              <svg className="w-6 h-6 text-pop-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-black text-white text-xl uppercase mb-3">Order Online</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Find Pop products on Jumia, Konga, and other major e-commerce platforms. Fast delivery nationwide.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a href="https://jumia.com.ng" target="_blank" rel="noopener noreferrer"
                className="text-xs font-bold uppercase tracking-wider text-pop-red hover:text-white transition-colors border border-pop-red/40 hover:border-white/40 px-4 py-2 rounded-full">
                Jumia ↗
              </a>
              <a href="https://konga.com" target="_blank" rel="noopener noreferrer"
                className="text-xs font-bold uppercase tracking-wider text-pop-red hover:text-white transition-colors border border-pop-red/40 hover:border-white/40 px-4 py-2 rounded-full">
                Konga ↗
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/4 p-8 hover:border-pop-red/40 transition-all duration-500 group">
            <div className="w-12 h-12 rounded-xl bg-pop-red/10 flex items-center justify-center mb-5 group-hover:bg-pop-red/20 transition-colors">
              <svg className="w-6 h-6 text-pop-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-black text-white text-xl uppercase mb-3">Retail Stores</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Available at Shoprite, Spar, and thousands of supermarkets, kiosks, and retail outlets across all 36 states of Nigeria.
            </p>
            <div className="flex gap-4 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-white/40 border border-white/10 px-4 py-2 rounded-full">Shoprite</span>
              <span className="text-xs font-bold uppercase tracking-wider text-white/40 border border-white/10 px-4 py-2 rounded-full">Spar</span>
              <span className="text-xs font-bold uppercase tracking-wider text-white/40 border border-white/10 px-4 py-2 rounded-full">+ More</span>
            </div>
          </div>
        </div>

        {/* Wholesale / distributor CTA */}
        <div className="reveal relative rounded-3xl border border-pop-red/30 overflow-hidden p-10 md:p-14 text-center"
          style={{ background: 'linear-gradient(135deg, #e61c2412 0%, #050505 60%)' }}>
          <p className="text-xs uppercase tracking-[0.3em] text-pop-red font-semibold mb-4">For Business</p>
          <h3 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase">
            Become a Distributor
          </h3>
          <p className="text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">
            Partner with Mamuda Beverages and bring Pop to your market. We support distributors with competitive margins, marketing materials, and logistics.
          </p>
          <a
            href="#contact"
            className="inline-block bg-pop-red hover:bg-pop-red-dark text-white font-black text-sm uppercase tracking-widest px-10 py-4 rounded-full transition-all duration-300 hover:scale-105"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductCTA;
