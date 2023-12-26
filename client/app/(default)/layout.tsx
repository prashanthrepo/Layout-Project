'use client';
import Sidebar from '@/components/ui/sidebar';
import Header from '@/components/ui/header';
import MobileNav from './components-library/MobileNav';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Content area */}
      <div className="relative flex flex-col flex-1">
        {/*  Site header */}
        <Header />

        <main className="grow [&>*:first-child]:scroll-mt-16">{children}</main>
        <div className="sm:hidden">
          <MobileNav />
        </div>
      </div>
    </div>
  );
}
