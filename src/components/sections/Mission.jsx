import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const PILLARS = [
  { label: 'Unbeatable Value',  sub: 'Premium taste, accessible price' },
  { label: 'Refreshing Taste',  sub: '7 variants, one promise'          },
  { label: 'Made in Nigeria',   sub: 'Local craft, global standards'    },
  { label: 'Nationwide Reach',  sub: 'All 36 states covered'            },
];

const Mission = () => {
  const sectionRef = useScrollReveal({ selector: '.reveal', stagger: 0.08, from: 'bottom' });

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="relative py-12 sm:py-20 px-4 sm:px-6 md:px-12 overflow-hidden"
      style={{ background: '#050505' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Eyebrow */}
        <p className="reveal text-xs uppercase tracking-[0.35em] text-pop-red font-semibold mb-6 sm:mb-8 text-center">
          Why Choose Pop
        </p>

        {/* Main block */}
        <div className="reveal rounded-3xl overflow-hidden border border-white/8 flex flex-col lg:flex-row" style={{ minHeight: '480px' }}>

          {/* Image — fills left side */}
          <div className="relative w-full lg:w-3/5 min-h-[280px] lg:min-h-0">
            <img
              src="/assets/what-makes-it-pop-section.jpeg"
              alt="What makes it Pop"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            {/* subtle right-edge fade into the dark panel */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/80 hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent lg:hidden" />
          </div>

          {/* Right panel */}
          <div
            className="w-full lg:w-2/5 flex flex-col justify-between px-8 py-10 sm:px-10 sm:py-12"
            style={{ background: '#0a0a0a' }}
          >
            {/* Heading */}
            <div className="mb-8 sm:mb-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight uppercase">
                What Makes It <span className="text-pop-red">Pop</span>
              </h2>
            </div>

            {/* Pillar list */}
            <ul className="flex flex-col gap-0 flex-1 justify-end">
              {PILLARS.map((p, i) => (
                <li
                  key={p.label}
                  className="flex items-center justify-between py-4 border-t border-white/8 group"
                >
                  <div>
                    <p className="text-white font-black text-sm sm:text-base uppercase tracking-wide leading-none mb-1">
                      {p.label}
                    </p>
                    <p className="text-gray-500 text-xs font-light">{p.sub}</p>
                  </div>
                  <span
                    className="text-xs font-black tabular-nums text-pop-red opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  >
                    0{i + 1}
                  </span>
                </li>
              ))}
              {/* closing rule */}
              <li className="border-t border-white/8" />
            </ul>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Mission;
