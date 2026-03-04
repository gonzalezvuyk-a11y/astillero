'use client';

import { useEffect, useRef, useState } from 'react';

export default function AstilleroFooterLogo({ className = '' }: { className?: string }) {
  const letters = Array.from('EL ASTILLERO');
  const shellRef = useRef<HTMLDivElement | null>(null);
  const wordmarkRef = useRef<HTMLDivElement | null>(null);
  const [fontSizePx, setFontSizePx] = useState<number | null>(null);

  useEffect(() => {
    const shell = shellRef.current;
    const wordmark = wordmarkRef.current;
    if (!shell || !wordmark || typeof window === 'undefined') return;

    const updateSize = () => {
      const availableWidth = shell.getBoundingClientRect().width;
      if (!availableWidth) return;

      const naturalWidth = wordmark.scrollWidth;
      const baseFontSize = Number.parseFloat(window.getComputedStyle(wordmark).fontSize);
      if (!naturalWidth || !baseFontSize) return;

      const nextFontSize = Math.max(14, (baseFontSize * availableWidth) / naturalWidth);
      setFontSizePx((previous) => (previous !== null && Math.abs(previous - nextFontSize) < 0.5 ? previous : nextFontSize));
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(shell);
    window.addEventListener('resize', updateSize, { passive: true });

    const fontSet = document.fonts;
    const handleFontLoadingDone = () => updateSize();
    fontSet?.ready.then(updateSize).catch(() => undefined);
    fontSet?.addEventListener?.('loadingdone', handleFontLoadingDone);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateSize);
      fontSet?.removeEventListener?.('loadingdone', handleFontLoadingDone);
    };
  }, []);

  return (
    <div ref={shellRef} className={`footer-wordmark-scale-shell ${className}`.trim()}>
      <div
        ref={wordmarkRef}
        className="footer-wordmark"
        role="img"
        aria-label="El Astillero"
        style={fontSizePx ? { fontSize: `${fontSizePx}px` } : undefined}
      >
        {letters.map((letter, index) =>
          letter === ' ' ? (
            <span key={`space-${index}`} className="footer-letter-space" aria-hidden="true">
              &nbsp;
            </span>
          ) : (
            <span key={`${letter}-${index}`} className="footer-letter">
              {letter}
            </span>
          )
        )}
      </div>
    </div>
  );
}
