'use client';

import { useEffect, useMemo, useRef } from 'react';

type HeroScrollBackgroundProps = {
  frames: string[];
  sectionId: string;
  className?: string;
  zoom?: number;
  introZoomStart?: number;
  anchorY?: number;
  fit?: 'cover' | 'contain';
  onProgress?: (progress: number) => void;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function HeroScrollBackground({
  frames,
  sectionId,
  className,
  zoom = 1.18,
  introZoomStart = 1.4,
  anchorY = 0.52,
  fit = 'cover',
  onProgress
}: HeroScrollBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const loadedFramesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number>(0);
  const currentProgressRef = useRef(0);
  const introZoomRef = useRef(introZoomStart);

  useEffect(() => {
    introZoomRef.current = introZoomStart;
  }, [introZoomStart]);

  const safeFrames = useMemo(() => (frames.length > 0 ? frames : []), [frames]);

  useEffect(() => {
    if (safeFrames.length === 0) return;
    let cancelled = false;

    loadedFramesRef.current = new Array(safeFrames.length);

    const loadFrame = (src: string, index: number, priority: 'high' | 'low') =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = 'async';
        img.loading = 'eager';
        if ('fetchPriority' in img) {
          (img as HTMLImageElement & { fetchPriority?: 'high' | 'low' }).fetchPriority = priority;
        }
        img.src = src;
        img.onload = () => {
          if (!cancelled) loadedFramesRef.current[index] = img;
          resolve();
        };
        img.onerror = () => resolve();
      });

    safeFrames.forEach((src, index) => {
      void loadFrame(src, index, index < 4 ? 'high' : 'low');
    });

    return () => {
      cancelled = true;
      loadedFramesRef.current = [];
    };
  }, [safeFrames]);

  useEffect(() => {
    if (safeFrames.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const section = document.getElementById(sectionId);
    if (!section) return;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    const drawFrame = (index: number) => {
      const getClosestLoadedFrame = () => {
        const direct = loadedFramesRef.current[index];
        if (direct?.naturalWidth && direct?.naturalHeight) return direct;

        for (let offset = 1; offset < safeFrames.length; offset += 1) {
          const before = loadedFramesRef.current[index - offset];
          if (before?.naturalWidth && before?.naturalHeight) return before;
          const after = loadedFramesRef.current[index + offset];
          if (after?.naturalWidth && after?.naturalHeight) return after;
        }

        return null;
      };

      const frame = getClosestLoadedFrame();
      if (!frame) return;

      const viewportWidth = canvas.clientWidth;
      const viewportHeight = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const targetWidth = Math.floor(viewportWidth * dpr);
      const targetHeight = Math.floor(viewportHeight * dpr);

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, viewportWidth, viewportHeight);

      const baseScale =
        fit === 'contain'
          ? Math.min(viewportWidth / frame.naturalWidth, viewportHeight / frame.naturalHeight)
          : Math.max(viewportWidth / frame.naturalWidth, viewportHeight / frame.naturalHeight);

      introZoomRef.current = introZoomRef.current + (1 - introZoomRef.current) * 0.05;
      const currentZoom = zoom * introZoomRef.current;

      const drawWidth = frame.naturalWidth * baseScale * currentZoom;
      const drawHeight = frame.naturalHeight * baseScale * currentZoom;
      const drawX = (viewportWidth - drawWidth) / 2;
      const drawY = (viewportHeight - drawHeight) * anchorY;

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      context.drawImage(frame, drawX, drawY, drawWidth, drawHeight);
    };

    const loop = () => {
      const rect = section.getBoundingClientRect();
      const scrollableDistance = Math.max(section.offsetHeight - window.innerHeight, 1);
      const target = clamp(-rect.top / scrollableDistance, 0, 1);

      let current = currentProgressRef.current + (target - currentProgressRef.current) * 0.15;
      if (target >= 0.995) {
        current = 1;
      }
      currentProgressRef.current = current;
      onProgress?.(current);

      const maxIndex = Math.max(safeFrames.length - 1, 0);
      const sequenceProgress = Math.min(1, current * 1.5);
      const frameIndex = Math.min(maxIndex, Math.max(0, Math.floor(sequenceProgress * maxIndex)));
      drawFrame(frameIndex);

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [safeFrames, sectionId, zoom, anchorY, fit, onProgress]);

  if (safeFrames.length === 0) return null;

  return <canvas ref={canvasRef} className={className} />;
}
