import React, { useCallback } from 'react';
import SitePage from './SitePage';
import getAllLayouts from '@/apicalls/get-all-layouts';
import getLayoutByID from '@/apicalls/get-layout-by-id';
// export async function generateStaticParams() {
//   const layouts = await getAllLayouts().then((res) => res);
//   const paths = layouts?.map((layout) => ({
//     slug: layout?._id,
//   }));
//   console.log('paths :>> ', paths);
//   return paths;
// }

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  // const res = await getLayoutByID(slug);
  // res?.then((res) => {
  //   console.log('res :>> ', res);
  // });
  return <SitePage slug={slug} />;
}
