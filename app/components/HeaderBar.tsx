'use client';

import { useEffect, useRef, useState } from 'react';
import AstilleroLogo from './AstilleroLogo';
import Icon from './Icon';

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
  const [useDarkLogo, setUseDarkLogo] = useState(false);
  const lastYRef = useRef(0);
  const headerRef = useRef<HTMLElement | null>(null);
  const logoLinkRef = useRef<HTMLAnchorElement | null>(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    lastYRef.current = window.scrollY;
    let ticking = false;
    let frameId = 0;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      frameId = requestAnimationFrame(() => {
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
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let rafId = 0;

    const updateLogoTone = () => {
      const header = headerRef.current;
      const logoLink = logoLinkRef.current;
      if (!header || !logoLink) return;

      const headerRect = header.getBoundingClientRect();
      const logoRect = logoLink.getBoundingClientRect();

      const sampleX = Math.min(window.innerWidth - 1, Math.max(0, logoRect.left + logoRect.width * 0.5));
      const sampleY = Math.min(
        window.innerHeight - 1,
        Math.max(0, Math.max(headerRect.top, logoRect.top) + Math.min(logoRect.height * 0.5, 44))
      );

      const stack = document.elementsFromPoint(sampleX, sampleY);
      const backgroundElement = stack.find((element) => !(element as HTMLElement).closest('[data-header-root="true"]')) as HTMLElement | undefined;
      const shouldUseDarkLogo = Boolean(backgroundElement?.closest('[data-header-logo="dark"]'));

      setUseDarkLogo((prev) => (prev === shouldUseDarkLogo ? prev : shouldUseDarkLogo));
    };

    const queueUpdate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        updateLogoTone();
        rafId = 0;
      });
    };

    updateLogoTone();
    window.addEventListener('scroll', queueUpdate, { passive: true });
    window.addEventListener('resize', queueUpdate, { passive: true });
    window.addEventListener('orientationchange', queueUpdate);

    return () => {
      window.removeEventListener('scroll', queueUpdate);
      window.removeEventListener('resize', queueUpdate);
      window.removeEventListener('orientationchange', queueUpdate);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <header
      ref={headerRef}
      data-header-root="true"
      className={`fixed top-6 left-0 w-full z-50 px-4 md:px-12 pointer-events-none will-change-transform will-change-opacity transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'
        }`}
    >
      <div className="flex justify-between items-start">
        <a
          ref={logoLinkRef}
          href="#inicio"
          className={`pointer-events-auto inline-flex items-center group transition-[color,transform,opacity] duration-700 ease-out ${
            useDarkLogo ? 'text-[#181a18]' : 'text-bone'
            } hover:text-primary ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}
        >
          <AstilleroLogo className="h-16 md:h-[4.5rem] w-auto" />
        </a>

        <div
          className={`hidden md:flex pointer-events-auto relative items-center justify-end transition-all duration-700 delay-100 ease-out ${
            isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >

          {/* Sliding Nav Menu (Behind Button) */}
          <div
            className={`absolute right-full top-0 h-full flex items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0 ${
              isMenuOpen ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-12 pointer-events-none'
            }`}
          >
            <nav
              id="main-menu-nav-desktop"
              aria-label="Menú principal"
              className="flex h-full border border-[#2a2a2a] bg-[#ece9e3] text-[#1f1f1f] whitespace-nowrap"
            >
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
            aria-expanded={isMenuOpen}
            aria-controls="main-menu-nav-desktop"
          >
            {/* Animated Icon Wrapper inside button */}
            <span className="relative w-8 h-4 flex items-center justify-center">
              {/* Hamburger Icon */}
              <span className={`absolute flex flex-col gap-2 transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`} aria-hidden="true">
                <span className="block h-[2px] w-8 bg-current" />
                <span className="block h-[2px] w-6 bg-current" />
              </span>
              {/* Close (X) Icon */}
              <Icon
                name="close"
                className={`absolute h-5 w-5 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'
                }`}
              />
            </span>
            <span>Menu</span>
          </button>

        </div>

        <div
          className={`md:hidden pointer-events-auto relative transition-all duration-700 delay-100 ease-out ${
            isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`relative z-10 inline-flex items-center gap-3 border border-[#2a2a2a] px-4 py-2.5 text-[0.78rem] font-medium uppercase tracking-[0.08em] transition-colors duration-300 ${
              isMenuOpen ? 'bg-primary text-[#181818]' : 'bg-[#ece9e3] text-[#1f1f1f] hover:bg-primary hover:text-[#181818]'
            }`}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
            aria-controls="main-menu-nav-mobile"
          >
            <span className="relative w-6 h-4 flex items-center justify-center">
              <span
                className={`absolute flex flex-col gap-[5px] transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0 scale-50' : 'opacity-100 scale-100'
                }`}
                aria-hidden="true"
              >
                <span className="block h-[2px] w-6 bg-current" />
                <span className="block h-[2px] w-4 bg-current" />
              </span>
              <Icon
                name="close"
                className={`absolute h-[1.05rem] w-[1.05rem] transition-all duration-300 ${
                  isMenuOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'
                }`}
              />
            </span>
            <span>Menu</span>
          </button>

          <nav
            id="main-menu-nav-mobile"
            aria-label="Menú principal móvil"
            className={`absolute right-0 mt-2 min-w-[190px] border border-[#2a2a2a] bg-[#ece9e3] text-[#1f1f1f] transition-all duration-300 ease-out ${
              isMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={`mobile-${link.href}`}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-[0.75rem] font-medium uppercase tracking-[0.08em] border-b last:border-b-0 border-[#2a2a2a] hover:bg-primary hover:text-[#181818] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
