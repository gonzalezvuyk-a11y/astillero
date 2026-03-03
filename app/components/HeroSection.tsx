'use client';

import { useCallback, useRef } from 'react';
import HeroScrollBackground from './HeroScrollBackground';

type HeroSectionProps = {
  heroGifFrames: string[];
  whatsappUrl: string;
  sparks: Array<{
    left: string;
    delay: string;
    duration: string;
    size: number;
  }>;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const lerp = (start: number, end: number, progress: number) => start + (end - start) * progress;
const rangeProgress = (progress: number, start: number, end: number) => clamp((progress - start) / (end - start), 0, 1);

export default function HeroSection({ heroGifFrames, whatsappUrl, sparks }: HeroSectionProps) {
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const swappedTitleRef = useRef<HTMLHeadingElement | null>(null);
  const ctaRowRef = useRef<HTMLDivElement | null>(null);
  const scrollHintRef = useRef<HTMLDivElement | null>(null);
  const textLayerRef = useRef<HTMLDivElement | null>(null);

  const handleProgress = useCallback((progress: number) => {
    const badge = badgeRef.current;
    const title = titleRef.current;
    const swappedTitle = swappedTitleRef.current;
    const ctaRow = ctaRowRef.current;
    const scrollHint = scrollHintRef.current;
    const textLayer = textLayerRef.current;
    if (!badge || !title || !swappedTitle || !ctaRow) return;

    const titleSettleT = rangeProgress(progress, 0, 0.12);
    const badgeT = rangeProgress(progress, 0.08, 0.18);
    const ctaT = rangeProgress(progress, 0.52, 0.72);
    const hintFadeT = rangeProgress(progress, 0.08, 0.2);
    const titleSwapOutT = rangeProgress(progress, 0.28, 0.38);
    const swappedTitleInT = rangeProgress(progress, 0.42, 0.56);
    const textExitT = rangeProgress(progress, 0.6, 1.0);

    const titleBaseOpacity = lerp(0.95, 1, titleSettleT);
    title.style.opacity = (titleBaseOpacity * lerp(1, 0, titleSwapOutT)).toFixed(3);
    title.style.transform = `translate3d(0, ${lerp(6, -10, titleSwapOutT).toFixed(2)}px, 0)`;

    swappedTitle.style.opacity = lerp(0, 1, swappedTitleInT).toFixed(3);
    swappedTitle.style.transform = `translate3d(0, ${lerp(12, 0, swappedTitleInT).toFixed(2)}px, 0)`;

    badge.style.opacity = lerp(0, 1, badgeT).toFixed(3);
    badge.style.transform = `translate3d(0, ${lerp(10, 0, badgeT).toFixed(2)}px, 0)`;

    ctaRow.style.opacity = lerp(0, 1, ctaT).toFixed(3);
    ctaRow.style.transform = `translate3d(0, ${lerp(12, 0, ctaT).toFixed(2)}px, 0) scale(${lerp(0.98, 1, ctaT).toFixed(4)})`;

    if (scrollHint) {
      const hintBaseOpacity = lerp(0.8, 0, hintFadeT);
      scrollHint.style.opacity = hintBaseOpacity.toFixed(3);
    }

    if (textLayer) {
      textLayer.style.transform = `translate3d(0, ${lerp(0, -110, textExitT).toFixed(2)}vh, 0)`;
    }
  }, []);

  return (
    <section id="inicio" className="relative">
      <div className="hero-stage">
        <div className="hero-pin">
          <div className="absolute inset-0 z-0">
            {heroGifFrames.length > 0 ? (
              <HeroScrollBackground
                frames={heroGifFrames}
                sectionId="inicio"
                className="w-full h-full opacity-[0.98]"
                fit="cover"
                zoom={1.12}
                anchorY={1}
                onProgress={handleProgress}
              />
            ) : (
              <img
                alt="Parrilla premium en uso"
                className="w-full h-full object-cover object-[50%_72%] opacity-[0.95]"
                src="https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?auto=format&fit=crop&w=1600&q=80"
              />
            )}
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/12 via-transparent to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-black/7" />
            <div className="absolute inset-x-0 bottom-0 h-[34vh] bg-gradient-to-t from-black/34 via-black/14 to-transparent" />
            <div className="footer-sparks z-[2]" aria-hidden="true">
              {sparks.map((spark, index) => (
                <span
                  key={`hero-spark-${index}`}
                  className="footer-spark hero-spark"
                  style={{
                    left: spark.left,
                    width: `${spark.size}px`,
                    height: `${spark.size}px`,
                    animationDelay: spark.delay,
                    animationDuration: spark.duration
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="absolute inset-0 z-[25] pointer-events-none">
          <div ref={textLayerRef} className="sticky top-0 h-screen pointer-events-auto" style={{ willChange: 'transform' }}>
            <div className="flex h-full items-center">
              <div className="w-full px-4 md:px-12 pt-56 md:pt-48 pb-20">
                <div
                  ref={badgeRef}
                  className="inline-flex text-primary text-xs font-bold tracking-[0.3em] uppercase border border-primary px-3 py-2 mb-8"
                  data-reveal="up"
                  style={{ willChange: 'opacity, transform', opacity: 0, transform: 'translate3d(0, 10px, 0)' }}
                >
                  El asado se respeta.
                </div>
                <div className="relative max-w-5xl">
                  <h1
                    ref={titleRef}
                    className="font-condensed font-bold text-bone text-3xl md:text-5xl lg:text-6xl leading-[0.92] tracking-[0.01em] uppercase"
                    data-reveal="up"
                    data-reveal-delay="110"
                    style={{ willChange: 'opacity, transform', opacity: 0.95, transform: 'translate3d(0, 6px, 0)' }}
                  >
                    Parrillas
                    <br />
                    premium
                    <br />
                    en acero
                    <br />
                    inoxidable.
                  </h1>
                  <h2
                    ref={swappedTitleRef}
                    className="pointer-events-none absolute inset-0 max-w-5xl font-condensed font-bold text-bone text-3xl md:text-5xl lg:text-6xl leading-[0.92] tracking-[0.01em] uppercase"
                    style={{ willChange: 'opacity, transform', opacity: 0, transform: 'translate3d(0, 12px, 0)' }}
                  >
                    Fabricación e
                    <br />
                    instalación
                    <br />
                    para quinchos y
                    <br />
                    terrazas.
                  </h2>
                </div>
                <div
                  ref={ctaRowRef}
                  className="mt-8 flex w-full flex-wrap gap-4 md:justify-end"
                  data-reveal="up"
                  data-reveal-delay="240"
                  style={{
                    willChange: 'opacity, transform',
                    transformOrigin: 'left center',
                    opacity: 0,
                    transform: 'translate3d(0, 12px, 0) scale(0.98)'
                  }}
                >
                  <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-solid-system on-dark group hero-cta-compact">
                    <span className="btn-text">Cotizar por WhatsApp</span>
                    <span className="btn-icon">
                      <span className="material-symbols-outlined group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300">
                        north_east
                      </span>
                    </span>
                  </a>
                  <a href="#modelos" className="btn-solid-system on-light group hero-cta-compact">
                    <span className="btn-text">Ver modelos</span>
                    <span className="btn-icon">
                      <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform duration-300">
                        arrow_forward
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-8 md:bottom-10 z-20">
              <div className="w-full px-4 md:px-12">
                <div
                  ref={scrollHintRef}
                  className="hero-scroll-mouse"
                  style={{ willChange: 'opacity', opacity: 0.8 }}
                  aria-hidden="true"
                >
                  <span className="hero-scroll-wheel" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
