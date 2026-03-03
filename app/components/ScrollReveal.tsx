'use client';

import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (nodes.length === 0) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }

    root.classList.add('reveal-ready');

    const revealNode = (node: HTMLElement) => {
      const delay = Number.parseInt(node.dataset.revealDelay ?? '0', 10);
      if (!Number.isNaN(delay) && delay > 0) {
        node.style.setProperty('--reveal-delay', `${delay}ms`);
      }
      node.classList.add('is-visible');
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealNode(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );

    nodes.forEach((node) => {
      if (node.getBoundingClientRect().top <= window.innerHeight * 0.92) {
        revealNode(node);
        return;
      }
      observer.observe(node);
    });

    return () => {
      observer.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, []);

  return null;
}
