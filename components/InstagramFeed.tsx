import type { CSSProperties } from 'react';

type InstagramFeedProps = {
  title?: string;
  subtitle?: string;
  embedUrl: string;
  profileUrl?: string;
  height?: number;
  className?: string;
};

const DEFAULT_PROFILE_URL = 'https://www.instagram.com/parrillaselastillero/';

function cn(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function InstagramFeed({
  title,
  subtitle,
  embedUrl,
  profileUrl = DEFAULT_PROFILE_URL,
  height = 560,
  className
}: InstagramFeedProps) {
  return (
    <section
      className={cn(
        'mx-auto w-full max-w-5xl rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:p-6 md:p-8',
        className
      )}
      aria-label="Instagram feed"
    >
      {(title || subtitle) && (
        <header className="mb-5 space-y-2">
          {title ? (
            <h2 className="text-balance text-2xl font-semibold leading-tight text-text-100 sm:text-3xl">{title}</h2>
          ) : null}
          {subtitle ? <p className="text-sm text-text-200 sm:text-base">{subtitle}</p> : null}
        </header>
      )}

      <div className="overflow-hidden rounded-xl border border-white/10 bg-black/20">
        <div
          className="h-[420px] w-full md:h-[var(--ig-feed-height)]"
          style={{ '--ig-feed-height': `${height}px` } as CSSProperties}
        >
          <iframe
            src={embedUrl}
            title="Instagram feed Parrillas El Astillero"
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          />
        </div>
      </div>

      <p className="mt-4">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-primary-200 transition-colors hover:text-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-100"
        >
          Ver más en Instagram
        </a>
      </p>
    </section>
  );
}
