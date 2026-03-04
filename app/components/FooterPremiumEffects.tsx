'use client';

import { useEffect, useRef } from 'react';

export default function FooterPremiumEffects() {
  const anchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor || typeof window === 'undefined') return;

    const footer = anchor.closest<HTMLElement>('.footer-premium');
    if (!footer) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const setSpotlight = (x: number, y: number, alpha: string) => {
      footer.style.setProperty('--footer-spotlight-x', `${x}px`);
      footer.style.setProperty('--footer-spotlight-y', `${y}px`);
      footer.style.setProperty('--footer-spotlight-opacity', alpha);
    };

    const handlePointerMove = (event: MouseEvent) => {
      const rect = footer.getBoundingClientRect();
      setSpotlight(event.clientX - rect.left, event.clientY - rect.top, prefersReducedMotion ? '0' : '0.65');
    };

    const handlePointerEnter = () => {
      if (prefersReducedMotion) return;
      footer.style.setProperty('--footer-spotlight-opacity', '0.38');
    };

    const handlePointerLeave = () => {
      footer.style.setProperty('--footer-spotlight-opacity', '0');
    };

    footer.addEventListener('mousemove', handlePointerMove, { passive: true });
    footer.addEventListener('mouseenter', handlePointerEnter, { passive: true });
    footer.addEventListener('mouseleave', handlePointerLeave, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          footer.classList.toggle('is-inview', entry.isIntersecting);
          if (entry.isIntersecting) {
            footer.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.24, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(footer);

    return () => {
      observer.disconnect();
      footer.removeEventListener('mousemove', handlePointerMove);
      footer.removeEventListener('mouseenter', handlePointerEnter);
      footer.removeEventListener('mouseleave', handlePointerLeave);
      footer.style.removeProperty('--footer-spotlight-x');
      footer.style.removeProperty('--footer-spotlight-y');
      footer.style.removeProperty('--footer-spotlight-opacity');
      footer.classList.remove('is-inview');
    };
  }, []);

  return (
    <div ref={anchorRef} className="footer-spotlight-layer" aria-hidden="true">
      <div className="footer-spotlight" />
    </div>
  );
}
