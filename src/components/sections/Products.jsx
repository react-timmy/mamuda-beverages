import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollReveal } from '../../hooks/useScrollReveal';

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  {
    id: 'pop-cola',
    name: 'Pop Cola',
    tag: 'Original',
    description: 'The one that started it all. Rich, bold cola taste with crisp carbonation and a smooth finish. Nigeria\'s favourite.',
    color: '#e61c24',
    gradient: 'from-red-900/40 to-black',
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
    color: '#4ade80',
    gradient: 'from-green-900/40 to-black',
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
    color: '#86efac',
    gradient: 'from-lime-900/40 to-black',
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
    color: '#fb923c',
    gradient: 'from-orange-900/40 to-black',
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
    color: '#facc15',
    gradient: 'from-yellow-900/40 to-black',
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
    color: '#f97316',
    gradient: 'from-orange-800/40 to-black',
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
    color: '#a78bfa',
    gradient: 'from-violet-900/40 to-black',
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
  const cardRefs = useRef([]);
  const detailRef = useRef(null);

  const handleSelect = (i) => {
    if (i === active) return;
    gsap.to(detailRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.2,
      onComplete: () => {
        setActive(i);
        gsap.to(detailRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
      },
    });
  };

    const product = PRODUCTS[active];

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-6 md:px-12 overflow-hidden"
      style={{ background: '#080305' }}
    >
      {/* Ambient glow that tracks active product */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none transition-all duration-700"
        style={{ background: product.accent + '18' }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="reveal text-xs uppercase tracking-[0.35em] text-pop-red font-semibold mb-4">Our Range</p>
          <h2 className="reveal text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-6">
            THE POP <span className="text-pop-red">LINEUP</span>
          </h2>
          <p className="reveal text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Discover our wide range of refreshing beverages crafted to perfection for every taste and occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product pill grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {PRODUCTS.map((p, i) => (
              <button
                key={p.id}
                ref={el => cardRefs.current[i] = el}
                onClick={() => handleSelect(i)}
                className={`reveal relative flex flex-col justify-between h-44 lg:h-48 group rounded-2xl p-5 border text-left transition-all duration-300 cursor-pointer ${
                  active === i
                    ? 'border-opacity-100 bg-white/8'
                    : 'border-white/10 bg-white/3 hover:bg-white/6 hover:border-white/20'
                }`}
                style={{
                  borderColor: active === i ? p.accent : undefined,
                  boxShadow: active === i ? `0 0 30px ${p.accent}30` : undefined,
                }}
              >
                {p.featured && (
                  <span className="absolute -top-2.5 left-3 bg-pop-red text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                    Featured
                  </span>
                )}
                {/* Product image (replaces colour dot) */}
                <div className="w-16 h-16 mb-3 flex items-center justify-start">
                  {p.image ? (
                    <img 
                      src={p.image}
                      alt={p.name}
                      className="h-full object-contain drop-shadow-md"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if(e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                      }}
                    />
                  ) : null}
                  <div
                    className={`w-8 h-8 rounded-full ${p.image ? 'hidden' : ''}`}
                    style={{ background: p.accent, boxShadow: `0 0 16px ${p.accent}60` }}
                  />
                </div>
                <div className="font-black text-sm uppercase tracking-wide text-white mb-1">{p.name}</div>
                <div
                  className="text-xs font-medium uppercase tracking-wider"
                  style={{ color: p.accent }}
                >
                  {p.tag}
                </div>
              </button>
            ))}
          </div>

          {/* Product detail panel */}
          <div
            ref={detailRef}
            className="reveal lg:sticky lg:top-28 rounded-3xl border border-white/10 overflow-hidden min-h-[600px] flex items-center"
            style={{
              background: `linear-gradient(135deg, ${product.accent}12 0%, #050505 60%)`,
              borderColor: product.accent + '40',
            }}
          >
            <div className="p-8 md:p-10 flex flex-col-reverse md:flex-row gap-8 items-center w-full">
              <div className="flex-1">
                <div
                  className="inline-block text-xs font-black uppercase tracking-[0.25em] px-3 py-1.5 rounded-full mb-6"
                  style={{ background: product.accent + '20', color: product.accent }}
                >
                  {product.tag}
                </div>

                <h3 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                  {product.name}
                </h3>

                <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light">
                  {product.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">Size</div>
                    <div className="font-black text-white text-lg">{product.size}</div>
                  </div>
                  <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">Type</div>
                    <div className="font-black text-white text-sm">{product.type}</div>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="inline-block font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-105"
                  style={{ background: product.accent, color: '#000' }}
                >
                  Order Now
                </a>
              </div>
              
              {/* Floating 3D representation */}
              {product.image && (
                <div className="flex-1 flex justify-center w-full mb-8 md:mb-0 md:mt-0 animate-float">
                  <img
                    src={product.image}
                    alt={`${product.name} bottle`}
                    className="h-56 sm:h-64 md:h-80 object-contain drop-shadow-2xl"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
