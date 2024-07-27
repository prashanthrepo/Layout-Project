'use client';

import { useEffect } from 'react';

import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // useEffect(() => {
  //   AOS.init({
  //     once: true,
  //     disable: 'phone',
  //     duration: 600,
  //     easing: 'ease-out-sine',
  //   })
  // })

  return <>{children}</>;
}
