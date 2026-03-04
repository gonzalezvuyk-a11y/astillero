type IconName =
  | 'north_east'
  | 'arrow_forward'
  | 'close'
  | 'local_shipping'
  | 'verified'
  | 'construction';

type IconProps = {
  name: IconName;
  className?: string;
  ariaHidden?: boolean;
};

export default function Icon({ name, className, ariaHidden = true }: IconProps) {
  switch (name) {
    case 'north_east':
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          aria-hidden={ariaHidden}
          focusable="false"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17L17 7" />
          <path d="M9 7h8v8" />
        </svg>
      );
    case 'arrow_forward':
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          aria-hidden={ariaHidden}
          focusable="false"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );
    case 'close':
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          aria-hidden={ariaHidden}
          focusable="false"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 6 18 18" />
          <path d="M18 6 6 18" />
        </svg>
      );
    case 'local_shipping':
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          aria-hidden={ariaHidden}
          focusable="false"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 7h11v9H3z" />
          <path d="M14 10h3l4 3v3h-7z" />
          <circle cx="7.5" cy="18" r="1.5" />
          <circle cx="17.5" cy="18" r="1.5" />
        </svg>
      );
    case 'verified':
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          aria-hidden={ariaHidden}
          focusable="false"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="m8.8 12.3 2.1 2.1 4.4-4.7" />
        </svg>
      );
    case 'construction':
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          aria-hidden={ariaHidden}
          focusable="false"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m4 20 6-6" />
          <path d="m8 4 12 12" />
          <path d="m14 4 6 6" />
          <path d="m4 8 6 6" />
        </svg>
      );
    default:
      return null;
  }
}
