'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
    const lenisRef = useRef<Lenis | null>(null);
    const rafIdRef = useRef<number | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 1.5,
            infinite: false,
        });

        lenisRef.current = lenis;

        const raf = (time: number) => {
            lenis.raf(time);
            rafIdRef.current = requestAnimationFrame(raf);
        };

        rafIdRef.current = requestAnimationFrame(raf);

        // Sync with anchor links (smooth scroll to hash targets)
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
            if (!anchor) return;

            const hash = anchor.getAttribute('href');
            if (!hash || hash === '#') return;

            const el = document.querySelector(hash);
            if (el) {
                e.preventDefault();
                lenis.scrollTo(el as HTMLElement, { offset: 0 });
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
            if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current);
                rafIdRef.current = null;
            }
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return null;
}
