'use client';

import { useEffect } from 'react';

import { useAppStore } from '@/common/appstore';

export default function Hydrations() {
  useEffect(() => {
    useAppStore.persist.rehydrate();
  }, []);

  return null;
}
