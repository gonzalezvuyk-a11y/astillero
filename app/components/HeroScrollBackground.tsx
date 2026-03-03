'use client';

import { useEffect, useMemo, useRef } from 'react';

type HeroScrollBackgroundProps = {
  frames: string[];
  sectionId: string;
  className?: string;
  zoom?: number;
  anchorY?: number;
  fit?: 'cover' | 'contain';
  onProgress?: (progress: number) => void;
};

export default function HeroScrollBackground({
  frames,
  sectionId,
  className,
  zoom = 1.18,
  anchorY = 0.52,
  fit = 'cover',
  onProgress
}: HeroScrollBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const loadedFramesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number>(0);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const mountedRef = useRef(false);

  const safeFrames = useMemo(() => (frames.length > 0 ? frames : []), [frames]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (safeFrames.length === 0) return;

    const loadAllFrames = async () => {
      const loaded = await Promise.all(
        safeFrames.map(
          (src) =>
            new Promise<HTMLImageElement>((resolve) => {
              const img = new Image();
              img.decoding = 'async';
              img.loading = 'eager';
              img.src = src;
              img.onload = () => resolve(img);
              img.onerror = () => resolve(img);
            })
        )
      );

      loadedFramesRef.current = loaded;
    };

    loadAllFrames();
  }, [safeFrames]);

  useEffect(() => {
    if (safeFrames.length === 0) return;

    const updateTargetProgress = () => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollableDistance = Math.max(section.offsetHeight - window.innerHeight, 1);
      const raw = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1);
      targetProgressRef.current = raw;
    };

    const onScroll = () => {
      updateTargetProgress();
    };

    updateTargetProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [safeFrames, sectionId]);

  useEffect(() => {
    if (safeFrames.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    const drawFrame = (index: number) => {
      const frame = loadedFramesRef.current[index];
      if (!frame || !frame.naturalWidth || !frame.naturalHeight) return;

      const viewportWidth = canvas.clientWidth;
      const viewportHeight = canvas.clientHeight;
      const dpr = window.devicePixelRatio || 1;

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

      const drawWidth = frame.naturalWidth * baseScale * zoom;
      const drawHeight = frame.naturalHeight * baseScale * zoom;
      const drawX = (viewportWidth - drawWidth) / 2;
      const drawY = (viewportHeight - drawHeight) * anchorY;

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      context.drawImage(frame, drawX, drawY, drawWidth, drawHeight);
    };

    const loop = () => {
      if (!mountedRef.current) return;

      // Apple-like smooth progress interpolation.
      const target = targetProgressRef.current;
      let current = currentProgressRef.current + (target - currentProgressRef.current) * 0.15;
      // Snap near the end so the last frame is reached before the overlap section rises.
      if (target >= 0.995) {
        current = 1;
      }
      currentProgressRef.current = current;
      onProgress?.(current);

      const maxIndex = Math.max(safeFrames.length - 1, 0);
      const frameIndex = Math.min(maxIndex, Math.max(0, Math.floor(current * maxIndex)));
      drawFrame(frameIndex);

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [safeFrames, zoom, anchorY, onProgress]);

  if (safeFrames.length === 0) return null;

  return <canvas ref={canvasRef} className={className} />;
}
