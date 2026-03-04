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

const EAGER_FRAME_COUNT = 6;

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
  const scrollRafRef = useRef<number | null>(null);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const mountedRef = useRef(false);
  const introZoomRef = useRef(introZoomStart);
  const scheduleRenderRef = useRef<() => void>(() => undefined);

  useEffect(() => {
    introZoomRef.current = introZoomStart;
    scheduleRenderRef.current();
  }, [introZoomStart]);

  const safeFrames = useMemo(() => (frames.length > 0 ? frames : []), [frames]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
      if (scrollRafRef.current !== null) {
        cancelAnimationFrame(scrollRafRef.current);
        scrollRafRef.current = null;
      }
      scheduleRenderRef.current = () => undefined;
    };
  }, []);

  useEffect(() => {
    if (safeFrames.length === 0) return;

    let cancelled = false;
    let idleId: number | null = null;
    let fallbackTimer: ReturnType<typeof setTimeout> | null = null;

    loadedFramesRef.current = new Array(safeFrames.length);

    const loadFrame = (src: string, index: number, priority: 'high' | 'low') =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = 'async';
        img.loading = priority === 'high' ? 'eager' : 'lazy';
        if ('fetchPriority' in img) {
          (img as HTMLImageElement & { fetchPriority?: 'high' | 'low' }).fetchPriority = priority;
        }
        img.src = src;
        img.onload = () => {
          if (!cancelled) {
            loadedFramesRef.current[index] = img;
            scheduleRenderRef.current();
          }
          resolve();
        };
        img.onerror = () => resolve();
      });

    const eagerCount = Math.min(EAGER_FRAME_COUNT, safeFrames.length);
    for (let index = 0; index < eagerCount; index += 1) {
      void loadFrame(safeFrames[index], index, 'high');
    }

    const loadRemainingFrames = async () => {
      for (let index = eagerCount; index < safeFrames.length && !cancelled; index += 1) {
        await loadFrame(safeFrames[index], index, 'low');
      }
    };

    if (safeFrames.length > eagerCount) {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(
          () => {
            void loadRemainingFrames();
          },
          { timeout: 1200 }
        );
      } else {
        fallbackTimer = setTimeout(() => {
          void loadRemainingFrames();
        }, 350);
      }
    }

    return () => {
      cancelled = true;
      if (idleId !== null && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      if (fallbackTimer !== null) {
        clearTimeout(fallbackTimer);
      }
      loadedFramesRef.current = [];
    };
  }, [safeFrames]);

  useEffect(() => {
    if (safeFrames.length === 0) return;
    const section = document.getElementById(sectionId);
    if (!section) return;

    const updateTargetProgress = () => {
      const rect = section.getBoundingClientRect();
      const scrollableDistance = Math.max(section.offsetHeight - window.innerHeight, 1);
      targetProgressRef.current = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1);
    };

    const onViewportChange = () => {
      if (scrollRafRef.current !== null) return;
      scrollRafRef.current = requestAnimationFrame(() => {
        scrollRafRef.current = null;
        updateTargetProgress();
        scheduleRenderRef.current();
      });
    };

    updateTargetProgress();
    scheduleRenderRef.current();
    window.addEventListener('scroll', onViewportChange, { passive: true });
    window.addEventListener('resize', onViewportChange, { passive: true });

    return () => {
      window.removeEventListener('scroll', onViewportChange);
      window.removeEventListener('resize', onViewportChange);
      if (scrollRafRef.current !== null) {
        cancelAnimationFrame(scrollRafRef.current);
        scrollRafRef.current = null;
      }
    };
  }, [safeFrames.length, sectionId]);

  useEffect(() => {
    if (safeFrames.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

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
      if (!frame) return false;

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
      return true;
    };

    const render = () => {
      if (!mountedRef.current) return;

      rafRef.current = 0;

      const target = targetProgressRef.current;
      let current = currentProgressRef.current + (target - currentProgressRef.current) * 0.15;
      if (target >= 0.995) {
        current = 1;
      }
      currentProgressRef.current = current;
      onProgress?.(current);

      const maxIndex = Math.max(safeFrames.length - 1, 0);
      const sequenceProgress = Math.min(1, current * 1.5);
      const frameIndex = Math.min(maxIndex, Math.max(0, Math.floor(sequenceProgress * maxIndex)));
      const didDraw = drawFrame(frameIndex);

      const progressSettled = Math.abs(target - current) <= 0.001;
      const introSettled = introZoomRef.current <= 1.01;

      if (!didDraw || !progressSettled || !introSettled) {
        scheduleRenderRef.current();
      }
    };

    const scheduleRender = () => {
      if (!mountedRef.current || rafRef.current) return;
      rafRef.current = requestAnimationFrame(render);
    };

    scheduleRenderRef.current = scheduleRender;
    scheduleRender();

    return () => {
      scheduleRenderRef.current = () => undefined;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };
  }, [safeFrames, zoom, anchorY, fit, onProgress]);

  if (safeFrames.length === 0) return null;

  return <canvas ref={canvasRef} className={className} />;
}
