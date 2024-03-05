'use client';
import Sidebar from '@/components/ui/sidebar';
import Header from '@/components/ui/header';
import MobileNav from './components-library/MobileNav';
import Hydrations from '../hydration';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* <Hydrations /> */}
      <Sidebar />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header />
        <main className="grow [&>*:first-child]:scroll-mt-16">{children}</main>
        <div className="sm:hidden">
          <MobileNav />
        </div>
      </div>
    </div>
  );
}
