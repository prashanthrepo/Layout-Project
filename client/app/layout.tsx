import '../assets/css/style.css';

import { Inter } from 'next/font/google';
import Theme from './theme-provider';
import AppProvider from './app-provider';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from '@/hooks/useUserHook';
import { ReactQueryProvider } from '@/common/reactQueryConfig';
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
import type { Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
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
          marginTop: 'env(safe-area-inset-top)',
        }}>
        <Toaster position="top-right" reverseOrder={false} />
        <Theme>
          <UserProvider>
            <ReactQueryProvider>
              <AppProvider>{children}</AppProvider>
            </ReactQueryProvider>
          </UserProvider>
        </Theme>
      </body>
    </html>
  );
}
