'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

export type DetailItem = {
  id: string;
  title: string;
  desc: string;
  imageSrc: string;
};

interface DetailExplorerProps {
  details: DetailItem[];
  whatsappUrl: string;
}

export default function DetailExplorer({ details, whatsappUrl }: DetailExplorerProps) {
  const [activeId, setActiveId] = useState(details[0]?.id ?? '');
  const [loadedIds, setLoadedIds] = useState<Set<string>>(new Set());
  const [failedIds, setFailedIds] = useState<Set<string>>(new Set());

  const availableDetails = useMemo(
    () => details.filter((detail) => !failedIds.has(detail.id)),
    [details, failedIds]
  );

  const activeDetail = availableDetails.find((detail) => detail.id === activeId) ?? availableDetails[0] ?? null;

  useEffect(() => {
    if (!activeDetail && availableDetails.length > 0) {
      setActiveId(availableDetails[0].id);
    }
  }, [activeDetail, availableDetails]);

  const markLoaded = (id: string) => {
    setLoadedIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const markFailed = (id: string) => {
    setFailedIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const activeIsLoaded = activeDetail ? loadedIds.has(activeDetail.id) : false;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-bg-300 bg-surface-dark overflow-hidden">
      <div className="relative w-full aspect-[4/3] md:aspect-[5/4] lg:aspect-auto lg:min-h-[620px] border-b lg:border-b-0 lg:border-r border-bg-300 bg-[#111111] overflow-hidden">
        {availableDetails.map((detail, index) => (
          <Image
            key={detail.id}
            src={detail.imageSrc}
            alt={detail.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ease-out ${
              detail.id === activeDetail?.id ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
            priority={index === 0}
            onLoad={() => markLoaded(detail.id)}
            onError={() => markFailed(detail.id)}
          />
        ))}

        <div
          aria-hidden="true"
          className={`absolute inset-0 z-20 bg-gradient-to-br from-bg-300/20 via-bg-300/10 to-bg-100/60 transition-opacity duration-200 ${
            activeIsLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {!activeDetail && (
          <div className="absolute inset-0 z-30 flex items-center justify-center text-center px-6">
            <p className="text-text-200 uppercase tracking-[0.18em] text-xs">Render no disponible</p>
          </div>
        )}
      </div>

      <div className="flex flex-col bg-bg-200">
        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <ul className="flex flex-col">
            {availableDetails.map((detail, index) => {
              const isActive = detail.id === activeDetail?.id;
              return (
                <li key={detail.id} className="border-b border-bg-300 last:border-b-0">
                  <button
                    type="button"
                    onClick={() => setActiveId(detail.id)}
                    aria-pressed={isActive}
                    className="w-full text-left px-8 py-6 md:py-8 flex flex-col transition-all duration-200 ease-out group/detail relative hover:-translate-y-[1px]"
                  >
                    <div
                      className={`absolute left-0 top-4 bottom-4 w-[2px] bg-primary transition-all duration-200 ease-out ${
                        isActive
                          ? 'opacity-100 scale-y-100'
                          : 'opacity-0 scale-y-50 group-hover/detail:opacity-60 group-hover/detail:scale-y-90'
                      }`}
                    />
                    <p className="text-[11px] tracking-[0.18em] uppercase text-text-200/60">0{index + 1}</p>
                    <h3
                      className={`mt-1 font-condensed font-bold text-xl md:text-2xl uppercase tracking-wide transition-colors duration-200 ${
                        isActive ? 'text-primary' : 'text-text-100 group-hover/detail:text-text-100/85'
                      }`}
                    >
                      {detail.title}
                    </h3>
                    <p
                      className={`mt-2 text-sm md:text-base tracking-wide transition-colors duration-200 ${
                        isActive ? 'text-text-200' : 'text-text-200/65'
                      }`}
                    >
                      {detail.desc}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="p-8 border-t border-bg-300 bg-surface-dark mt-auto">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-stretch border-[1.5px] border-[#181a18] bg-white hover:bg-primary hover:border-[#181a18] transition-colors duration-300 cursor-pointer text-[#181a18] group w-full max-w-sm"
          >
            <span className="flex-1 font-sans font-semibold text-lg uppercase tracking-[0.08em] px-4 py-3 flex items-center justify-center transition-colors duration-300">
              Personalizá tu parrilla
            </span>
            <div className="border-l-[1.5px] border-[#181a18] px-4 py-3 flex items-center justify-center transition-colors duration-300">
              <span className="material-symbols-outlined text-[1.2rem] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300">
                north_east
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
