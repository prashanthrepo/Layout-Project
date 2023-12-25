import React, { useCallback } from 'react';

import SitePage from './SitePage';
import getAllLayouts from '@/api/get-all-layouts';
import getLayoutByID from '@/api/get-layout-by-id';
import { Transition } from '@headlessui/react';
export async function generateStaticParams() {
  const layouts = await getAllLayouts().then((res) => res);
  return (
    layouts.map((layout) => ({
      slug: layout?._id,
    })) || []
  );
}
export default async function Page({ params }) {
  const { slug } = params;
  const site = await getLayoutByID(slug);
  return <SitePage site={site} />;
}
