import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-100)',
        'primary-accent': 'var(--primary-200)',
        'background-dark': 'var(--bg-100)',
        'surface-dark': 'var(--bg-200)',
        bone: 'var(--text-100)',
        'bone-dark': 'var(--text-200)',
        'primary-100': 'var(--primary-100)',
        'primary-200': 'var(--primary-200)',
        'primary-300': 'var(--primary-300)',
        'accent-100': 'var(--accent-100)',
        'accent-200': 'var(--accent-200)',
        'text-100': 'var(--text-100)',
        'text-200': 'var(--text-200)',
        'bg-100': 'var(--bg-100)',
        'bg-200': 'var(--bg-200)',
        'bg-300': 'var(--bg-300)'
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        condensed: ['var(--font-oswald)', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 30px -10px color-mix(in srgb, var(--primary-100) 38%, transparent)'
      }
    }
  },
  plugins: []
};

export default config;
