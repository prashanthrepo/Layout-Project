'use client';
import getAllLayouts from '@/apicalls/get-all-layouts';
import AddLayout from '@/components/AddLayout';
import SkeletonLoader from '@/components/SkeletonLoader';
import { useUser } from '@/hooks/useUserHook';
import mapImage from '@/public/images/google-maps.png';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect } from 'react';
import { useQuery } from 'react-query';

export default function Layouts() {
  const { data, isLoading, error } = useQuery('allLayouts', getAllLayouts);
  const { user } = useUser();
  useEffect(() => {
    if (error) {
      console.log('Error fetching all layouts:', error);
    }
  }, [error]);
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-full xl:col-span-6">
          <div className="flex flex-col ">
            <div className="w-full">
              <div className="sm:flex sm:justify-between sm:items-center mb-5">
                <div className="mb-4 sm:mb-0 w-4/12">
                  <h1 className="text-1xl md:text-2xl text-slate-800 dark:text-slate-100 font-bold">
                    All Property's
                  </h1>
                </div>

                <div className="w-full sm:w-8/12  flex justify-end gap-2">
                  {/* <form className="relative w-full sm:w-7/12">
                    <label htmlFor="action-search" className="sr-only">
                      Search
                    </label>
                    <input
                      id="action-search"
                      className="form-input w-full pl-2 pr-8 bg-white dark:bg-slate-800"
                      type="search"
                      placeholder={'search property...'}
                    />
                    <button
                      className="absolute inset-0 left-auto group mx-2"
                      type="submit"
                      aria-label="Search">
                      <svg
                        className="w-4 h-4 shrink-0 fill-current text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 ml-3 mr-2"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                        <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                      </svg>
                    </button>
                  </form> */}
                  {user?.role == 'Admin' && <AddLayout />}
                </div>
              </div>
              <SkeletonLoader
                type="PropertyList"
                length={3}
                isLoading={isLoading}
                isData={data?.data?.length > 0}
                noDataText="No properties listed.">
                <div className="space-y-2 ">
                  {data?.data?.map((layout, key) => (
                    <Link href={`/property?id=${layout?._id}`} key={key}>
                      <div className="shadow-lg rounded-sm border px-5 py-4 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border hover:border-indigo-500">
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
                              <div className="text-sm">
                                {layout?.description}
                              </div>
                              <div className="text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1 my-1 bg-emerald-100 dark:bg-emerald-400/30 text-emerald-600 dark:text-emerald-400">
                                Available
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </SkeletonLoader>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
