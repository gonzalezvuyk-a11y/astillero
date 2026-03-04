import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import SmoothScroll from './components/SmoothScroll';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-inter'
});

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-oswald'
});

const beni = localFont({
  src: [
    {
      path: '../public/BeniRegular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../public/BeniBold.ttf',
      weight: '700',
      style: 'normal'
    }
  ],
  display: 'swap',
  variable: '--font-beni'
});

export const metadata: Metadata = {
  title: 'El Astillero | Parrillas premium a medida en Paraguay',
  description:
    'Diseño, fabricación e instalación de parrillas premium en acero inoxidable para quinchos y terrazas.',
  icons: {
    icon: [
      { url: '/1x/favicon.png', type: 'image/png' },
      { url: '/1x/favicon.png', rel: 'shortcut icon', type: 'image/png' }
    ],
    apple: [{ url: '/1x/favicon.png', type: 'image/png' }]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${oswald.variable} ${beni.variable}`} suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
