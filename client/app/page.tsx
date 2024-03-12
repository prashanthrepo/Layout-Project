'use client';
import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';
import Sidebar from '@/components/ui/sidebar';
import Header from '@/components/ui/header';
import Dashboard from './(default)/dashboard/page';
import MobileNav from './(default)/components-library/MobileNav';
import { useEffect } from 'react';
import { useUser } from '@/hooks/useUserHook';
export default function DefaultLayout() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (!token) {
        window.location.href = '/signin';
      }
    }
  }, []);
  return (
    <div className="flex h-[100dvh] overflow-hidden">
      <Sidebar />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header />
        <Dashboard />
        <div className="sm:hidden">
          <MobileNav />
        </div>
      </div>
    </div>
  );
}
