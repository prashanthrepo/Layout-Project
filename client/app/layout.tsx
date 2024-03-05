import './css/style.css';

import { Inter } from 'next/font/google';
import Theme from './theme-provider';
import AppProvider from './app-provider';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { Viewport } from 'next';
import { UserProvider } from '@/hooks/useUserHook';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Paypersqft',
  description: 'Layouts and properties',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',

  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log('layout');
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-inter antialiased bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400`}
        style={{
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}>
        <Toaster position="top-right" reverseOrder={false} />
        <Theme>
          <UserProvider>
            <AppProvider>{children}</AppProvider>
          </UserProvider>
        </Theme>
      </body>
    </html>
  );
}
