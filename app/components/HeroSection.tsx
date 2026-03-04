'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import HeroScrollBackground from './HeroScrollBackground';
import Icon from './Icon';

type HeroSectionProps = {
  heroGifFrames: string[];
  whatsappUrl: string;
  sparks: Array<{
    left: string;
    bottom?: string;
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
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobileViewport(media.matches);
    update();
    media.addEventListener('change', update);

    return () => media.removeEventListener('change', update);
  }, []);

  const heroZoom = isMobileViewport ? 1.02 : 1.12;
  const heroIntroZoomStart = isMobileViewport ? 1.08 : 1.35;
  const heroAnchorY = isMobileViewport ? 0.9 : 1;

  const handleProgress = useCallback((progress: number) => {
    const badge = badgeRef.current;
    const title = titleRef.current;
    const swappedTitle = swappedTitleRef.current;
    const ctaRow = ctaRowRef.current;
    const scrollHint = scrollHintRef.current;
    const textLayer = textLayerRef.current;
    if (!badge || !title || !swappedTitle || !ctaRow) return;

    const titleSettleT = rangeProgress(progress, 0, 0.08);
    const badgeT = rangeProgress(progress, 0.05, 0.12);
    const ctaT = rangeProgress(progress, 0.35, 0.48);
    const hintFadeT = rangeProgress(progress, 0.05, 0.15);
    const titleSwapOutT = rangeProgress(progress, 0.18, 0.26);
    const swappedTitleInT = rangeProgress(progress, 0.3, 0.42);
    const textExitT = rangeProgress(progress, 0.66, 1.0);

    const titleBaseOpacity = lerp(0.95, 1, titleSettleT);
    title.style.opacity = (titleBaseOpacity * lerp(1, 0, titleSwapOutT)).toFixed(3);
    title.style.transform = `translate3d(0, ${lerp(6, -10, titleSwapOutT).toFixed(2)}px, 0)`;
    title.style.animation = progress > 0.02 ? 'none' : ''; // override intro animation on scroll

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
                zoom={heroZoom}
                introZoomStart={heroIntroZoomStart}
                anchorY={heroAnchorY}
                onProgress={handleProgress}
              />
            ) : (
              <Image
                alt="Parrilla premium en uso"
                className="w-full h-full object-cover object-[50%_72%] opacity-[0.95]"
                src="/herogif3/herogif3_00000.jpg"
                fill
                priority
                quality={70}
                sizes="100vw"
              />
            )}
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/12 via-transparent to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-black/7" />
            <div className="absolute inset-0 md:hidden bg-gradient-to-r from-black/42 via-black/12 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-[52vh] md:h-[34vh] bg-gradient-to-t from-black/68 md:from-black/34 via-black/24 md:via-black/14 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-[26vh] md:hidden bg-gradient-to-t from-black/48 via-black/14 to-transparent" />
            <div className="absolute inset-0 z-[2] overflow-hidden" aria-hidden="true">
              {sparks.map((spark, index) => (
                <span
                  key={`hero-spark-${index}`}
                  className="footer-spark absolute rounded-full bg-primary"
                  style={{
                    left: spark.left,
                    bottom: spark.bottom || '-5%', // distribute vertically if possible
                    width: `${spark.size}px`,
                    height: `${spark.size}px`,
                    animationDelay: spark.delay,
                    animationDuration: spark.duration,
                    filter: 'blur(1px)',
                    boxShadow: '0 0 10px 2px var(--primary-100)'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="absolute inset-0 z-[25] pointer-events-none">
          <div ref={textLayerRef} className="sticky top-0 h-screen pointer-events-auto" style={{ willChange: 'transform' }}>
            <div className="flex h-full items-end md:items-center">
              <div className="w-full px-4 md:px-12 pt-28 md:pt-48 pb-12 md:pb-20">
                <div
                  ref={badgeRef}
                  className="hero-intro-anim inline-flex bg-primary md:bg-transparent text-[#181a18] md:text-primary text-[10px] md:text-xs font-bold tracking-[0.22em] md:tracking-[0.3em] uppercase border border-primary px-2.5 md:px-3 py-1.5 md:py-2 mb-5 md:mb-8"
                  data-reveal="up"
                  style={{ willChange: 'opacity, transform', opacity: 0, transform: 'translate3d(0, 10px, 0)' }}
                >
                  El asado se respeta.
                </div>
                <div className="relative max-w-[19rem] sm:max-w-[22rem] md:max-w-5xl min-h-[11.5rem] sm:min-h-[13rem] md:min-h-0">
                  <h1
                    ref={titleRef}
                    className="hero-intro-anim font-condensed font-bold text-bone text-[2.75rem] sm:text-[3.2rem] md:text-5xl lg:text-6xl leading-[0.88] md:leading-[0.92] tracking-[0.005em] md:tracking-[0.01em] uppercase drop-shadow-[0_8px_22px_rgba(0,0,0,0.68)] md:drop-shadow-[0_6px_16px_rgba(0,0,0,0.52)]"
                    style={{ '--intro-delay': '150ms', willChange: 'opacity, transform', opacity: 0, transform: 'translate3d(0, 30px, 0)' } as React.CSSProperties}
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
                    className="pointer-events-none absolute inset-0 max-w-[19rem] sm:max-w-[22rem] md:max-w-5xl font-condensed font-bold text-bone text-[2.75rem] sm:text-[3.2rem] md:text-5xl lg:text-6xl leading-[0.88] md:leading-[0.92] tracking-[0.005em] md:tracking-[0.01em] uppercase drop-shadow-[0_8px_22px_rgba(0,0,0,0.68)] md:drop-shadow-[0_6px_16px_rgba(0,0,0,0.52)]"
                    style={{ willChange: 'opacity, transform', opacity: 0, transform: 'translate3d(0, 12px, 0)' }}
                  >
                    Fabricación
                    <br />
                    e instalación
                    <br />
                    para quinchos
                    <br />
                    &amp; terrazas.
                  </h2>
                </div>
                <div
                  ref={ctaRowRef}
                  className="mt-4 md:mt-12 flex w-full flex-wrap gap-3 md:gap-4 justify-start"
                  style={{ willChange: 'opacity, transform', opacity: 0, transform: 'translate3d(0, 12px, 0)' }}
                >
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-solid-system on-dark group">
                    <span className="btn-text">Iniciar proyecto</span>
                    <span className="btn-icon">
                      <Icon
                        name="north_east"
                        className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </span>
                  </a>
                  <a href="#modelos" className="hidden sm:inline-flex btn-solid-system on-light group hero-cta-compact">
                    <span className="btn-text">Ver modelos</span>
                    <span className="btn-icon">
                      <Icon name="arrow_forward" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-8 md:bottom-10 z-20">
              <div className="w-full px-4 md:px-12">
                <div
                  ref={scrollHintRef}
                  className="hero-scroll-mouse hidden md:flex"
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
