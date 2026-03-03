'use client';

import { useEffect, useRef, useState } from 'react';
import AstilleroLogo from './AstilleroLogo';

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

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
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
      className={`fixed top-6 left-0 w-full z-50 px-4 md:px-12 pointer-events-none will-change-transform will-change-opacity transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'
        }`}
    >
      <div className="flex justify-between items-start">
        <a
          href="#inicio"
          className={`pointer-events-auto inline-flex items-center group text-bone hover:text-primary transition-all duration-700 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}
        >
          <AstilleroLogo className="h-16 md:h-[4.5rem] w-auto" />
        </a>

        <div
          className={`hidden md:flex pointer-events-auto relative items-center justify-end transition-all duration-700 delay-100 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}
        >

          {/* Sliding Nav Menu (Behind Button) */}
          <div
            className={`absolute right-full top-0 h-full flex items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0 ${isMenuOpen
              ? 'opacity-100 translate-x-0 pointer-events-auto'
              : 'opacity-0 translate-x-12 pointer-events-none'
              }`}
          >
            <nav className="flex h-full border border-[#2a2a2a] bg-[#ece9e3] text-[#1f1f1f] whitespace-nowrap">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-6 py-3 text-[0.82rem] font-medium uppercase tracking-[0.08em] border-r border-[#2a2a2a] hover:bg-primary hover:text-[#181818] transition-colors duration-300 flex items-center h-full"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Main Toggle Button (Always on Top) */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`relative z-10 inline-flex items-center gap-4 border border-[#2a2a2a] px-6 py-3 text-[0.82rem] font-medium uppercase tracking-[0.08em] transition-colors duration-300 overflow-hidden ${isMenuOpen
              ? 'bg-primary text-[#181818]'
              : 'bg-[#ece9e3] text-[#1f1f1f] hover:bg-primary hover:text-[#181818]'
              }`}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {/* Animated Icon Wrapper inside button */}
            <span className="relative w-8 h-4 flex items-center justify-center">
              {/* Hamburger Icon */}
              <span className={`absolute flex flex-col gap-2 transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`} aria-hidden="true">
                <span className="block h-[2px] w-8 bg-current" />
                <span className="block h-[2px] w-6 bg-current" />
              </span>
              {/* Close (X) Icon */}
              <span className={`absolute material-symbols-outlined text-[1.2rem] transition-all duration-300 ${isMenuOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'}`}>
                close
              </span>
            </span>
            <span>Menu</span>
          </button>

        </div>
      </div>
    </header>
  );
}
