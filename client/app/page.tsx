'use client';
import Sidebar from '@/components/ui/sidebar';
import Header from '@/components/ui/header';
import Dashboard from './(default)/dashboard/page';
import MobileNav from './(default)/components-library/MobileNav';
import { useEffect } from 'react';
import { useAppStore } from '@/common/utils';
import getSelf from '@/apicalls/get-self';
export default function DefaultLayout() {
  const { setUser } = useAppStore((state) => state);
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log('token 123:>> ', token);
    if (token) {
      const res = getSelf();
      res?.then((res) => {
        console.log('res :>> ', res);
        if (res) {
          if (res?.status == 200) {
            setUser(res?.data);
          }
        }
      });
    } else if (!token) {
      window.location.href = '/signin';
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
