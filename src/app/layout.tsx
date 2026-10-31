import type { Metadata, Viewport } from 'next';
import { Public_Sans } from 'next/font/google';
import { Toaster } from 'sonner';
import { ApiProvider } from './api-provider';
import './globals.css';

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-public-sans',
});

export const metadata: Metadata = {
  title: 'Doctor Tracker',
  description: 'Hospital patient and doctor management portal.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full bg-canvas overflow-x-hidden ${publicSans.variable}`}>
      <body className="min-h-full font-sans text-ink antialiased overflow-x-hidden">
        <ApiProvider>{children}</ApiProvider>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
