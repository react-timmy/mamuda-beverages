import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const NAV_LINKS = [
  { label: 'Home',     href: '#' },
  { label: 'Products', href: '#products' },
  { label: 'About',    href: '#about' },
  { label: 'Mission',  href: '#mission' },
  { label: 'Contact',  href: '#contact' },
];

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const logoRef    = useRef(null);
  const linksWrap  = useRef(null);   // wraps the <div> that holds all links
  const ctaRef     = useRef(null);

  useEffect(() => {
    // Ensure elements start visible in case gsap fails
    const logo  = logoRef.current;
    const links = linksWrap.current;
    const cta   = ctaRef.current;
    if (!logo || !links || !cta) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(logo,
      { opacity: 0, x: -24 },
      { opacity: 1, x: 0, duration: 0.7 },
      0.15
    );

    tl.fromTo(
      links.querySelectorAll('a'),
      { opacity: 0, y: -14 },
      { opacity: 1, y: 0,  duration: 0.55, stagger: 0.07 },
      0.3
    );

    tl.fromTo(cta,
      { opacity: 0, x: 24 },
      { opacity: 1, x: 0, duration: 0.65 },
      0.3
    );
  }, []);

  return (
    <>
      {/* ── Main nav bar ── */}
      <nav className="fixed top-0 left-0 w-full z-[110] bg-transparent py-5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">

          {/* Logo */}
          <a
            ref={logoRef}
            href="#"
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          >
            <img src="/assets/mamuda-logo.png" alt="Mamuda Beverages" className="h-8 w-auto" />
          </a>

          {/* Desktop links */}
          <div
            ref={linksWrap}
            className="hidden lg:flex items-center gap-10 text-sm font-medium tracking-wide"
          >
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-white/70 hover:text-white transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-pop-red transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div ref={ctaRef} className="flex items-center gap-4">
            <a
              href="#products"
              className="hidden md:inline-block bg-pop-red hover:bg-pop-red-dark text-white font-bold px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105 text-sm tracking-wide uppercase"
            >
              Our Range
            </a>

            <button
              className="lg:hidden text-white hover:text-pop-red transition-colors p-2"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile full-screen menu ── */}
      <div
        className={`fixed inset-0 z-[109] bg-black/95 flex flex-col items-center justify-center gap-8 transition-all duration-500 ${
          menuOpen
            ? 'opacity-100 pointer-events-auto visible backdrop-blur-xl'
            : 'opacity-0 pointer-events-none invisible'
        }`}
      >
        {NAV_LINKS.map(link => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="text-4xl font-black uppercase text-white hover:text-pop-red transition-colors tracking-tight"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#products"
          onClick={() => setMenuOpen(false)}
          className="mt-4 bg-pop-red text-white font-bold px-10 py-4 rounded-full uppercase tracking-wider text-lg"
        >
          Our Range
        </a>
      </div>
    </>
  );
};

export default Navigation;
