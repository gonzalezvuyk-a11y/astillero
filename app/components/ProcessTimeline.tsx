'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
  highlight?: boolean;
};

type ProcessTimelineProps = {
  steps: ProcessStep[];
  className?: string;
};

export default function ProcessTimeline({ steps, className }: ProcessTimelineProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setIsVisible(true);
          observer.disconnect();
        });
      },
      { threshold: 0.28, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={`process-timeline relative mt-12 ${isVisible ? 'is-visible' : ''} ${className ?? ''}`.trim()}
    >
      <span className="process-rail process-rail-horizontal hidden md:block" aria-hidden="true" />
      <span className="process-rail process-rail-vertical md:hidden" aria-hidden="true" />

      <ol className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5">
        {steps.map((step, index) => (
          <li
            key={`${step.number}-${step.title}`}
            className={`process-step-item ${step.highlight ? 'process-step-item--highlight' : ''}`.trim()}
            style={{ '--process-delay': `${index * 80}ms` } as CSSProperties}
          >
            <article className={`process-step-card ${step.highlight ? 'process-step-card--highlight' : ''}`.trim()}>
              <span className="process-step-node" aria-hidden="true" />
              <p
                className={`mt-2 md:mt-0 text-[11px] leading-none font-semibold tracking-[0.2em] uppercase ${
                  step.highlight
                    ? 'text-primary'
                    : 'text-primary'
                }`}
              >
                {step.number}
              </p>
              <h3
                className={`mt-3 font-condensed text-2xl md:text-[1.75rem] leading-[0.95] uppercase tracking-[0.01em] ${
                  step.highlight ? 'text-primary' : 'text-text-100'
                }`}
              >
                {step.title}
              </h3>
              <p className={`mt-3 text-sm md:text-[0.95rem] leading-relaxed ${step.highlight ? 'text-text-100/90' : 'text-text-200'}`}>
                {step.description}
              </p>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
