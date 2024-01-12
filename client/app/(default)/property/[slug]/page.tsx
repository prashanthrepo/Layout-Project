import React, { useCallback } from 'react';
import SitePage from './SitePage';
import getAllLayouts from '@/api/get-all-layouts';
import getLayoutByID from '@/api/get-layout-by-id';
export async function generateStaticParams() {
  const layouts = await getAllLayouts().then((res) => res);
  const paths = layouts?.map((layout) => ({
    slug: layout?._id,
  }));
  console.log('paths :>> ', paths);
  return paths;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  console.log('slug :>> ', slug);
  const res = await getLayoutByID(slug);
  console.log('res :>> ', res);
  return <SitePage sites={res} />;
}
