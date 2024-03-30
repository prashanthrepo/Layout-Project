import React, { Suspense, useCallback } from 'react';
import SitePage from './property';
import getAllLayouts from '@/apicalls/get-all-layouts';
import getLayoutByID from '@/apicalls/get-layout-by-id';
// export const dynamicParams = false; // true | false,
// export async function generateStaticParams() {
//   // const layouts = await getAllLayouts().then((res) => res);
//   // const paths = layouts?.map((layout) => ({
//   //   slug: layout?._id,
//   // }));
//   return [{ slug: 'hello' }, { slug: 'world' }];
// }

export default function Page({ params }) {
  // console.log('slug :>> ', slug);
  // const res = await getLayoutByID(slug);
  // res?.then((res) => {
  //   console.log('res :>> ', res);
  // });
  return (
    <Suspense fallback={<></>}>
      <SitePage />
    </Suspense>
  );
}
