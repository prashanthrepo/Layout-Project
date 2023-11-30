import getLayouts from '@/api/get-layouts';
import mapImage from '@/public/images/google-maps.png';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';

export default function SellerLayouts() {
  const { layouts, loading, error } = getLayouts();

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-full xl:col-span-6">
          <div className="flex flex-col ">
            <div className="w-full">
              <div className="space-y-2">
                {layouts?.map((layout, key) => (
                  <Link href={`/property/${layout?._id}`} key={key}>
                    <div
                      className={`shadow-lg rounded-sm border px-5 py-4 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700
          }`}>
                      <div className="md:flex justify-between items-center space-y-4 md:space-y-0 space-x-2">
                        <div className="flex items-start space-x-3 md:space-x-4">
                          <div className="w-20 h-20 shrink-0 mt-1">
                            <Image
                              className="w-20 h-20 rounded-lg"
                              src={mapImage}
                              width={100}
                              height={100}
                              alt={layout?.description}
                            />
                          </div>
                          <div>
                            <span className="inline-flex font-semibold text-slate-800 dark:text-slate-100">
                              {layout?.name}
                            </span>
                            <div className="text-sm">{layout?._id}</div>
                            <div className="text-sm">{layout?.description}</div>
                            <div
                              className={`text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1 my-1 bg-emerald-100 dark:bg-emerald-400/30 text-emerald-600 dark:text-emerald-400'
                  }`}>
                              Available
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>{' '}
      </div>
    </div>
  );
}
