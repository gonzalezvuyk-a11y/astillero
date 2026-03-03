'use client';

import { useEffect, useRef, useState } from 'react';

const navLinks = [
  { href: '#modelos', label: 'Modelos' },
  { href: '#detalles', label: 'Detalles' },
  { href: '#galeria-productos', label: 'Galeria' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#contacto', label: 'Contacto' }
];

export default function HeaderBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastYRef = useRef(0);

  useEffect(() => {
    lastYRef.current = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastYRef.current;

        if (currentY < 40) {
          setIsVisible(true);
        } else if (delta > 6) {
          setIsVisible(false);
          setIsMenuOpen(false);
        } else if (delta < -6) {
          setIsVisible(true);
        }

        lastYRef.current = currentY;
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-6 left-0 w-full z-50 px-4 md:px-12 pointer-events-none will-change-transform will-change-opacity transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'
      }`}
    >
      <div className="flex justify-between items-start">
        <a href="#inicio" className="pointer-events-auto inline-flex items-center group">
          <img src="/astillero%20logo.svg" alt="El Astillero" className="header-logo h-12 md:h-[3.3rem] w-auto transition duration-300" />
        </a>

        <div className="hidden md:flex pointer-events-auto relative">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className={`inline-flex items-center gap-4 border border-[#2a2a2a] bg-[#ece9e3] text-[#1f1f1f] px-6 py-3 text-[0.82rem] font-medium uppercase tracking-[0.08em] hover:bg-primary hover:text-[#181818] transition-all duration-300 origin-right ${
                isMenuOpen ? 'opacity-0 -translate-y-1 scale-95 pointer-events-none' : 'opacity-100 translate-y-0 scale-100'
              }`}
              aria-label="Abrir menú"
            >
              <span className="flex flex-col gap-2" aria-hidden="true">
                <span className="block h-[2px] w-8 bg-current" />
                <span className="block h-[2px] w-6 bg-current" />
              </span>
              <span>Menu</span>
            </button>

          <nav
            className={`absolute right-0 top-0 flex border border-[#2a2a2a] bg-[#ece9e3] text-[#1f1f1f] origin-right transition-all duration-300 ${
              isMenuOpen ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 -translate-y-1 scale-95 pointer-events-none'
            }`}
          >
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="px-6 py-3 text-[0.82rem] font-medium uppercase tracking-[0.08em] border-r border-[#2a2a2a] hover:bg-primary hover:text-[#181818] transition-colors duration-300"
            >
              Menu
            </button>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="px-6 py-3 text-[0.82rem] font-medium uppercase tracking-[0.08em] border-r border-[#2a2a2a] hover:bg-primary hover:text-[#181818] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="px-6 py-3 text-[0.82rem] font-medium uppercase tracking-[0.08em] hover:bg-primary hover:text-[#181818] transition-colors duration-300 inline-flex items-center gap-2.5"
              aria-label="Cerrar menú"
            >
              <span className="material-symbols-outlined text-[1rem] leading-none">close</span>
              Menu
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
