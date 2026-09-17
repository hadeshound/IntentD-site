import type { Metadata, Viewport } from 'next';
import { Golos_Text, JetBrains_Mono, Manrope } from 'next/font/google';
import type { ReactNode } from 'react';

import { Footer } from '@/components/marketing/Footer';
import { Navbar } from '@/components/marketing/Navbar';
import { AuthProvider } from '@/lib/hooks/useAuth';

import './globals.css';

/**
 * Type pairing.
 *
 * The brief proposed Syne / Space Grotesk / Clash Display with Plus Jakarta
 * Sans. None of those faces ships Cyrillic glyphs, and every line of copy on
 * this site is Russian, so they would silently fall back to a system font --
 * exactly the generic look the design rules forbid. Golos Text and Manrope
 * cover Latin and Cyrillic in one family each, and neither is on the banned
 * list (Inter, Roboto, Open Sans, Arial, Helvetica).
 */

// Display face: flat terminals and tight tracking, built for Cyrillic.
const golos = Golos_Text({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-golos',
  display: 'swap',
});

// Body face: open geometric grotesque, distinct enough from the display face.
const manrope = Manrope({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-manrope',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'IntentD — монетизация браузерных расширений без рекламы',
    template: '%s · IntentD',
  },
  description:
    'IntentD превращает анонимный пользовательский кликстрим в стабильный доход. Безопасный SDK для разработчиков расширений и PII-free поток intent-данных для аналитических команд.',
  keywords: [
    'intent data',
    'монетизация расширений',
    'browser extension SDK',
    'clickstream',
    'PII-free',
    'Parquet',
  ],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: siteUrl,
    siteName: 'IntentD',
    title: 'IntentD — монетизация браузерных расширений без рекламы',
    description:
      'Безопасный SDK, полная приватность и готовый рынок сбыта данных в одной интеграции.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#0B0F17',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="ru"
      className={`${golos.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen">
        <AuthProvider>
          {/* First stop for a keyboard user: jump past the header navigation. */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-control focus:bg-mint-500 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-void-deep"
          >
            Перейти к содержимому
          </a>

          <Navbar />

          <main id="main" className="pt-18">
            {children}
          </main>

          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
