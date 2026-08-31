import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { asset } from '@/lib/asset';
import { hero } from '@/data/content';

// Original loaded Inter 400/500/600/700 from Google Fonts.
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const title = hero.name;
// Same string as the visible hero tagline (src/data/content.ts) — kept as a
// single source so the meta description and the on-page copy can't describe
// two different people again (this replaced an old "Physics student" framing
// that contradicted the CV).
const description = hero.tagline;

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: 'Alex Coker' }],
  // Known production URL — lets the relative OG/icon paths below resolve to
  // correct absolute URLs for link-preview crawlers regardless of basePath.
  metadataBase: new URL('https://pseudower1.github.io/alexcoker/'),
  icons: {
    icon: asset('assets/favicon.ico'),
  },
  openGraph: {
    title,
    description,
    type: 'website',
    images: [
      {
        url: asset('assets/images/og-image.jpg'),
        width: 1200,
        height: 630,
        alt: 'The Unitree Go2 quadruped running the CBF safety filter in the lab.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [asset('assets/images/og-image.jpg')],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
