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

  const renderImagePanel = (className: string, sizes: string) => (
    <div className={className}>
      {availableDetails.map((detail, index) => (
        <Image
          key={detail.id}
          src={detail.imageSrc}
          alt={detail.title}
          fill
          sizes={sizes}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ease-out ${
            detail.id === activeDetail?.id ? 'z-10 opacity-100' : 'pointer-events-none z-0 opacity-0'
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
        <div className="absolute inset-0 z-30 flex items-center justify-center px-6 text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-text-200">Render no disponible</p>
        </div>
      )}
    </div>
  );

  const renderCta = () => (
    <div className="mt-auto border-t border-bg-300 bg-surface-dark p-8">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex w-full max-w-sm cursor-pointer items-stretch border-[1.5px] border-[#181a18] bg-white text-[#181a18] transition-colors duration-300 hover:border-[#181a18] hover:bg-primary"
      >
        <span className="flex flex-1 items-center justify-center px-4 py-3 font-sans text-lg font-semibold uppercase tracking-[0.08em] transition-colors duration-300">
          Personalizá tu parrilla
        </span>
        <div className="flex items-center justify-center border-l-[1.5px] border-[#181a18] px-4 py-3 transition-colors duration-300">
          <span className="material-symbols-outlined text-[1.2rem] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            north_east
          </span>
        </div>
      </a>
    </div>
  );

  const renderDesktopListPanel = () => (
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
                  className="group/detail relative flex w-full flex-col px-8 py-6 text-left transition-all duration-200 ease-out hover:-translate-y-[1px] md:py-8"
                >
                  <div
                    className={`absolute bottom-4 left-0 top-4 w-[2px] bg-primary transition-all duration-200 ease-out ${
                      isActive ? 'scale-y-100 opacity-100' : 'scale-y-50 opacity-0 group-hover/detail:scale-y-90 group-hover/detail:opacity-60'
                    }`}
                  />
                  <p className="text-[11px] uppercase tracking-[0.18em] text-text-200/60">0{index + 1}</p>
                  <h3
                    className={`mt-1 font-condensed text-xl font-bold uppercase tracking-wide transition-colors duration-200 md:text-2xl ${
                      isActive ? 'text-primary' : 'text-text-100 group-hover/detail:text-text-100/85'
                    }`}
                  >
                    {detail.title}
                  </h3>
                  <p
                    className={`mt-2 text-sm tracking-wide transition-colors duration-200 md:text-base ${
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
      {renderCta()}
    </div>
  );

  const renderMobileAccordionPanel = () => (
    <div className="flex flex-col bg-bg-200">
      <ul className="flex flex-col">
        {availableDetails.map((detail, index) => {
          const isActive = detail.id === activeDetail?.id;
          const isLoaded = loadedIds.has(detail.id);

          return (
            <li key={`mobile-${detail.id}`} className="border-b border-bg-300 last:border-b-0">
              <button
                type="button"
                onClick={() => setActiveId(detail.id)}
                aria-pressed={isActive}
                className="group/detail relative flex w-full flex-col px-8 py-6 text-left transition-all duration-200 ease-out md:py-8"
              >
                <div
                  className={`absolute bottom-4 left-0 top-4 w-[2px] bg-primary transition-all duration-200 ease-out ${
                    isActive ? 'scale-y-100 opacity-100' : 'scale-y-50 opacity-0'
                  }`}
                />
                <p className="text-[11px] uppercase tracking-[0.18em] text-text-200/60">0{index + 1}</p>
                <h3
                  className={`mt-1 font-condensed text-xl font-bold uppercase tracking-wide transition-colors duration-200 md:text-2xl ${
                    isActive ? 'text-primary' : 'text-text-100'
                  }`}
                >
                  {detail.title}
                </h3>
                <p
                  className={`mt-2 text-sm tracking-wide transition-colors duration-200 md:text-base ${
                    isActive ? 'text-text-200' : 'text-text-200/65'
                  }`}
                >
                  {detail.desc}
                </p>
              </button>

              <div
                className={`overflow-hidden transition-[max-height,opacity,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isActive ? 'max-h-[460px] opacity-100 border-t border-bg-300' : 'max-h-0 opacity-0 border-t border-transparent'
                }`}
              >
                <div
                  className={`relative aspect-[4/3] bg-[#111111] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive ? 'translate-y-0' : '-translate-y-2'
                  }`}
                >
                  <Image
                    src={detail.imageSrc}
                    alt={detail.title}
                    fill
                    sizes="100vw"
                    className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive ? 'scale-100' : 'scale-[1.04]'
                    }`}
                    priority={index === 0}
                    onLoad={() => markLoaded(detail.id)}
                    onError={() => markFailed(detail.id)}
                  />
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 z-20 bg-gradient-to-br from-bg-300/20 via-bg-300/10 to-bg-100/60 transition-opacity duration-300 ${
                      isActive && isLoaded ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {renderCta()}
    </div>
  );

  return (
    <>
      <div className="border border-bg-300 bg-surface-dark overflow-visible md:hidden">
        {renderMobileAccordionPanel()}
      </div>

      <div className="hidden overflow-hidden border border-bg-300 bg-surface-dark md:grid md:grid-cols-2">
        {renderImagePanel('relative aspect-[5/4] w-full overflow-hidden border-r border-bg-300 bg-[#111111] lg:min-h-[620px] lg:aspect-auto', '50vw')}
        {renderDesktopListPanel()}
      </div>
    </>
  );
}
