import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Original loaded Inter 400/500/600/700 from Google Fonts.
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const title = 'Alex Coker';
const description =
  'Physics student and robotics-focused engineer working at the intersection of automation, embedded systems, and applied research.';

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: 'Alex Coker' }],
  openGraph: {
    title,
    description,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title,
    description,
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
