import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#EB4024',
        'primary-accent': '#FF5733',
        'background-dark': '#0a0a0a',
        'surface-dark': '#121212',
        bone: '#EAE6DF',
        'bone-dark': '#d4d0c9'
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        condensed: ['Oswald', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 30px -10px rgba(235, 64, 36, 0.4)'
      }
    }
  },
  plugins: []
};

export default config;
