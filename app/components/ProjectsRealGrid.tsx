'use client';

import type { MouseEvent } from 'react';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

type ProjectsRealGridProps = {
  images: string[];
  profileUrl: string;
};

export default function ProjectsRealGrid({ images, profileUrl }: ProjectsRealGridProps) {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const pointerEnabledRef = useRef(false);
  const activeRef = useRef(false);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const syncPointerCapability = () => {
      pointerEnabledRef.current = media.matches;
      if (!media.matches && cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
    };

    syncPointerCapability();
    media.addEventListener('change', syncPointerCapability);

    const animate = () => {
      const cursor = cursorRef.current;

      if (cursor && pointerEnabledRef.current) {
        currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.14;
        currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.14;

        cursor.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0) translate3d(-50%, -50%, 0)`;
        cursor.style.opacity = activeRef.current ? '1' : '0';
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      media.removeEventListener('change', syncPointerCapability);
    };
  }, []);

  const handleEnter = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!pointerEnabledRef.current) return;

    const { clientX, clientY } = event;
    targetRef.current = { x: clientX, y: clientY };
    currentRef.current = { x: clientX, y: clientY };
    activeRef.current = true;
  };

  const handleMove = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!pointerEnabledRef.current) return;

    targetRef.current = { x: event.clientX, y: event.clientY };
  };

  const handleLeave = () => {
    activeRef.current = false;
  };

  return (
    <>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((src, index) => (
          <a
            key={`${src}-${index}`}
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-grid-link group relative block overflow-hidden border border-bg-300 bg-surface-dark"
            data-reveal="zoom"
            data-reveal-delay={String((index % 3) * 80)}
            onMouseEnter={handleEnter}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
          >
            <Image
              src={src}
              alt={`Proyecto real ${index + 1}`}
              width={1200}
              height={1500}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              style={{ aspectRatio: '4 / 5' }}
            />
          </a>
        ))}
      </div>

      <div ref={cursorRef} className="project-cursor-follower" aria-hidden="true">
        <span className="material-symbols-outlined">north_east</span>
      </div>
    </>
  );
}
