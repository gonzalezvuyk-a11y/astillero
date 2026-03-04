import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';
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
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} ${oswald.variable}`}>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
