import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollReveal } from '../../hooks/useScrollReveal';

gsap.registerPlugin(ScrollTrigger);

const ProductCTA = () => {
  const sectionRef = useScrollReveal({ selector: '.reveal', stagger: 0.1, from: 'bottom' });
  const glowRef = useRef(null);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: 'general', message: '' });
  const [status, setStatus] = useState(null); // null | 'sending' | 'sent' | 'error'

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

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate async send — swap with real API call when ready
    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', phone: '', subject: 'general', message: '' });
    }, 1400);
  };

  return (
    <section
      id="buy"
      ref={sectionRef}
      className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-12 overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* Parallax glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #e61c2418 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto">

        {/* Section heading */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="reveal text-xs uppercase tracking-[0.35em] text-pop-red font-semibold mb-4">
            Get Your Pop
          </p>
          <h2 className="reveal text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-5 sm:mb-8 leading-tight">
            WHERE TO FIND <span className="text-pop-red">POP</span>
          </h2>
          <p className="reveal text-base sm:text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Mamuda Beverages products are available nationwide — from major retail chains to your nearest corner store across all 36 states.
          </p>
        </div>

        {/* ── Desktop: two-column  |  Mobile: contact form only ── */}
        <div className="reveal flex flex-col lg:flex-row gap-6">

          {/* LEFT: purchase cards — hidden on mobile */}
          <div className="hidden lg:flex flex-col gap-6 lg:w-[42%] shrink-0">

            {/* Order Online */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 hover:border-pop-red/40 transition-all duration-500 group flex-1">
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

            {/* Retail Stores */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 hover:border-pop-red/40 transition-all duration-500 group flex-1">
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

          {/* RIGHT: contact form */}
          <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:p-10">
            <p className="text-xs uppercase tracking-[0.3em] text-pop-red font-semibold mb-2">Contact Us</p>
            <h3 className="font-black text-white text-2xl sm:text-3xl uppercase mb-1">Get In Touch</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Wholesale enquiries, distribution partnerships, or just want to say hi — we're here.
            </p>

            {/* Mobile-only: brief purchase method hints */}
            <div className="lg:hidden flex gap-3 mb-6 flex-wrap">
              <span className="flex items-center gap-1.5 text-xs text-gray-400 border border-white/10 bg-white/[0.03] px-3 py-2 rounded-full">
                <svg className="w-3.5 h-3.5 text-pop-red shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Order via Jumia &amp; Konga
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400 border border-white/10 bg-white/[0.03] px-3 py-2 rounded-full">
                <svg className="w-3.5 h-3.5 text-pop-red shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                In-store at Shoprite, Spar &amp; more
              </span>
            </div>

            {status === 'sent' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <div className="w-14 h-14 rounded-full bg-pop-red/10 flex items-center justify-center">
                  <svg className="w-7 h-7 text-pop-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-black text-white text-xl uppercase">Message Sent!</p>
                <p className="text-gray-400 text-sm">We'll get back to you shortly.</p>
                <button
                  onClick={() => setStatus(null)}
                  className="mt-2 text-xs font-bold uppercase tracking-wider text-pop-red hover:text-white transition-colors border border-pop-red/40 hover:border-white/40 px-5 py-2.5 rounded-full"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-pop-red/60 focus:bg-white/[0.08] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-pop-red/60 focus:bg-white/[0.08] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+234 800 000 0000"
                      className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-pop-red/60 focus:bg-white/[0.08] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-pop-red/60 focus:bg-white/[0.08] transition-all appearance-none"
                      style={{ background: 'rgba(255,255,255,0.05)' }}
                    >
                      <option value="general" style={{ background: '#111' }}>General Enquiry</option>
                      <option value="wholesale" style={{ background: '#111' }}>Wholesale / Distribution</option>
                      <option value="partnership" style={{ background: '#111' }}>Partnership</option>
                      <option value="media" style={{ background: '#111' }}>Media &amp; Press</option>
                      <option value="other" style={{ background: '#111' }}>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help…"
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-pop-red/60 focus:bg-white/[0.08] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-pop-red hover:bg-pop-red-dark disabled:opacity-60 text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {status === 'sending' ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCTA;
