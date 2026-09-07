import React, { useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const PRODUCTS = [
  {
    id: 'pop-cola',
    name: 'Pop Cola',
    tag: 'Original',
    description: 'The one that started it all. Rich, bold cola taste with crisp carbonation and a smooth finish. Nigeria\'s favourite.',
    accent: '#e61c24',
    size: '50cl',
    type: 'Carbonated Soft Drink',
    image: '/assets/pop-cola.webp',
  },
  {
    id: 'pop-apple',
    name: 'Pop Apple',
    tag: 'Classic',
    description: 'Crisp apple flavour with just the right fizz. Refreshingly light and perfect for any occasion.',
    accent: '#4ade80',
    size: '50cl',
    type: 'Carbonated Soft Drink',
    image: '/assets/pop-apple.webp',
  },
  {
    id: 'pop-green-apple',
    name: 'Pop Green Apple',
    tag: 'Classic',
    description: 'A sharper, tangier take on apple. Tart and electrifying — the bold choice for bold people.',
    accent: '#86efac',
    size: '50cl',
    type: 'Carbonated Soft Drink',
    image: '/assets/pop-green-apple.webp',
  },
  {
    id: 'pop-chapman',
    name: 'Pop Chapman',
    tag: 'Classic',
    description: 'Nigeria\'s party drink, bottled. That unmistakable Chapman blend — sweet, fruity, iconic.',
    accent: '#fb923c',
    size: '50cl',
    type: 'Carbonated Soft Drink',
    image: '/assets/pop-chapman.webp',
  },
  {
    id: 'pop-up',
    name: 'Pop Up',
    tag: 'Lemon & Lime',
    description: 'Zesty lemon meets fresh lime. Clean, light, and endlessly refreshing on a hot Lagos afternoon.',
    accent: '#facc15',
    size: '50cl',
    type: 'Carbonated Soft Drink',
    image: '/assets/pop-up-lemon and lime.webp',
  },
  {
    id: 'pop-orange',
    name: 'Pop Orange',
    tag: 'Classic',
    description: 'Juicy, sun-ripened orange flavour packed with fizz. Bright, bold, and always a crowd-pleaser.',
    accent: '#f97316',
    size: '50cl',
    type: 'Carbonated Soft Drink',
    image: '/assets/pop-orange.webp',
  },
  {
    id: 'pop-power',
    name: 'Pop Power',
    tag: 'Energy Drink',
    description: 'Unleash your inner power. Specially formulated to deliver sustained energy without the crash — gym, study, grind.',
    accent: '#a78bfa',
    size: '50cl',
    type: 'Energy Drink',
    featured: true,
    image: '',
  },
];

const Products = () => {
  const sectionRef = useScrollReveal({ selector: '.reveal', stagger: 0.1, from: 'bottom' });
  const [active, setActive] = useState(0);
  const panelRef = useRef(null);
  // touch swipe
  const touchStartX = useRef(null);

  const navigate = useCallback((dir) => {
    const next = (active + dir + PRODUCTS.length) % PRODUCTS.length;
    const panel = panelRef.current;
    if (!panel) { setActive(next); return; }

    gsap.to(panel, {
      opacity: 0,
      x: dir * -40,
      duration: 0.18,
      ease: 'power2.in',
      onComplete: () => {
        setActive(next);
        gsap.fromTo(
          panel,
          { opacity: 0, x: dir * 40 },
          { opacity: 1, x: 0, duration: 0.32, ease: 'power2.out' }
        );
      },
    });
  }, [active]);

  const prev = () => navigate(-1);
  const next = () => navigate(1);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) navigate(diff > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const product = PRODUCTS[active];

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative min-h-screen py-16 sm:py-24 px-4 sm:px-6 md:px-12"
      style={{ background: '#080305' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none transition-all duration-700"
        style={{ background: product.accent + '18' }}
      />

      <div className="relative max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-16 reveal">
          <p className="text-xs uppercase tracking-[0.35em] text-pop-red font-semibold mb-4">Our Range</p>
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-4 sm:mb-6">
            THE POP <span className="text-pop-red">LINEUP</span>
          </h2>
          <p className="text-base sm:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Discover our wide range of refreshing beverages crafted to perfection for every taste and occasion.
          </p>
        </div>

        {/* Carousel */}
        <div className="reveal relative">

          {/* Card */}
          <div
            ref={panelRef}
            className="rounded-3xl border overflow-hidden relative"
            style={{
              background: `linear-gradient(135deg, ${product.accent}14 0%, #050505 65%)`,
              borderColor: product.accent + '40',
              boxShadow: `0 0 60px ${product.accent}18`,
            }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Floating cart button */}
            <a
              href="#contact"
              aria-label="Order now"
              className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
              style={{
                background: product.accent,
                boxShadow: `0 4px 20px ${product.accent}55`,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke={product.accent === '#facc15' || product.accent === '#86efac' || product.accent === '#4ade80' ? '#000' : '#000'}
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </a>
            {/* ── Layout: image left / right on desktop, stacked on mobile ── */}
            <div className="flex flex-col md:flex-row md:items-center md:min-h-[560px]">

              {/* Bottle image */}
              <div
                className="w-full md:w-2/5 flex justify-center items-center pt-4 pb-2 md:self-stretch md:items-center md:pt-0 md:pb-0 px-8"
                style={{ background: `linear-gradient(180deg, ${product.accent}40 0%, ${product.accent}10 50%, transparent 100%)`, marginTop: '-24px' }}
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={`${product.name} bottle`}
                    className="h-56 sm:h-72 md:h-80 lg:h-96 object-contain drop-shadow-2xl animate-float"
                    style={{ transform: 'translateY(-30px)' }}
                  />
                ) : (
                  <div
                    className="w-32 h-32 rounded-full"
                    style={{ background: product.accent, boxShadow: `0 0 60px ${product.accent}80` }}
                  />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-center px-6 pb-8 pt-6 sm:pt-8 md:px-10 md:py-12">
                {/* Tag + featured badge */}
                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <div
                    className="inline-block text-xs font-black uppercase tracking-[0.25em] px-3 py-1.5 rounded-full"
                    style={{ background: product.accent + '22', color: product.accent }}
                  >
                    {product.tag}
                  </div>
                  {product.featured && (
                    <span className="bg-pop-red text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 sm:mb-4 leading-tight">
                  {product.name}
                </h3>

                <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 font-light max-w-md">
                  {product.description}
                </p>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-xs">
                  <div className="rounded-xl p-3 sm:p-4" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">Size</div>
                    <div className="font-black text-white text-base sm:text-lg">{product.size}</div>
                  </div>
                  <div className="rounded-xl p-3 sm:p-4" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">Type</div>
                    <div className="font-black text-white text-xs sm:text-sm leading-snug">{product.type}</div>
                  </div>
                </div>


              </div>
            </div>
          </div>

          {/* Chevron arrows */}
          <button
            onClick={prev}
            aria-label="Previous drink"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-5 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border border-white/15 bg-black/60 backdrop-blur-sm text-white hover:border-white/40 hover:bg-black/80 transition-all duration-200 z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={next}
            aria-label="Next drink"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-5 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border border-white/15 bg-black/60 backdrop-blur-sm text-white hover:border-white/40 hover:bg-black/80 transition-all duration-200 z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
          {PRODUCTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => navigate(i - active)}
              aria-label={`Go to ${p.name}`}
              className="transition-all duration-300 rounded-full"
              style={{
                width:  i === active ? '24px' : '8px',
                height: '8px',
                background: i === active ? product.accent : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Products;
