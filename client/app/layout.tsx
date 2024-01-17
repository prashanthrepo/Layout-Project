import './css/style.css'

import { Inter } from 'next/font/google'
import Theme from './theme-provider'
import AppProvider from './app-provider'
import { Toaster } from 'react-hot-toast';
// import { Viewport } from 'next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Layout App',
  description: 'Layouts and properties',
};

// export const viewport: Viewport = {
//   width: 'device-width',
//   initialScale: 1,
//   maximumScale: 1,
//   userScalable: false,
//   viewportFit: 'cover',

//   // Also supported by less commonly used
//   // interactiveWidget: 'resizes-visual',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-inter antialiased bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400`}
        style={{
          paddingTop: 'env(safe-area-inset-top)',
        }}>
        <Toaster position="top-right" reverseOrder={false} />
        <Theme>
          <AppProvider>{children}</AppProvider>
        </Theme>
      </body>
    </html>
  );
}
