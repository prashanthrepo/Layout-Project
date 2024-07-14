import React from 'react';
import UserAvatar from '@/public/images/user-avatar-32.png';
import Image from 'next/image';
import StatusChip from '../../../../../components/StatusChip';
import SkeletonLoader from '@/components/SkeletonLoader';
import NewLead from '../site-details/new-lead';
import Link from 'next/link';
import { ContactInitials } from '@/common/utils';

export default function LeadsTab({ leads, loading }) {
  return (
    <div className="mb-4 space-y-1 overflow-scroll h-80 bg-slate-100 p-1 border border-slate-200 rounded-md ">
      <SkeletonLoader
        type="LeadsList"
        length={3}
        isLoading={loading}
        isData={leads?.length > 0}
        noDataText="No leads added.">
        {leads?.map((lead, key) => (
          <div
            className={`shadow-lg rounded-sm border px-5 py-4 bg-white border-slate-200`}>
            <div className="flex justify-between items-center space-y-4 md:space-y-0 space-x-2">
              <div className="flex items-start space-x-3 md:space-x-4">
                {ContactInitials({ name: lead?.contactId?.name || 'Lead' })}
                <div>
                  <Link
                    className="inline-flex text-base font-semibold text-slate-800"
                    href="/">
                    {lead?.contactId?.name}
                  </Link>
                  <div className="">
                    <div className="text-xs font-semibold">
                      <span>{lead?.buyerOffer}</span>
                      <span className="text-slate-500"> sqft</span>
                      <span> / </span>
                      <span>{lead?.sellerOffer}</span>
                      <span className="text-slate-500"> sqft</span>
                    </div>
                  </div>
                  <div className="text-sm text-indigo-800">{lead?.notes}</div>
                </div>
              </div>
              <div className="flex items-center space-x-4 pl-10 md:pl-0">
                <button className={`text-slate-300 hover:text-slate-400`}>
                  <span className="sr-only">Call</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z"
                    />
                  </svg>
                </button>

                <button className={`text-slate-300 hover:text-slate-400`}>
                  <span className="sr-only">Message</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                    />
                  </svg>
                </button>

                <button className={`text-slate-300 hover:text-slate-400`}>
                  <span className="sr-only">Email</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          // <label
          //   className="relative block cursor-pointer text-left w-full bg-white"
          //   key={key}>
          //   <input
          //     type="radio"
          //     name="radio-buttons"
          //     className="peer sr-only"
          //     defaultChecked
          //   />
          //   <div className="px-4 py-2.5 rounded dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm duration-150 ease-in-out">
          //     <div className="grid grid-cols-12 items-center gap-x-2">
          //       <div className="col-span-6 order-1 sm:order-none sm:col-span-3 text-left sm:text-center lg:sidebar-expanded:hidden xl:sidebar-expanded:block">
          //         <div className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate text-left">
          //           {lead?.name}
          //         </div>
          //       </div>
          //       <div className="col-span-8 order-2 sm:order-none sm:col-span-3 flex items-center space-x-2 lg:sidebar-expanded:col-span-6 xl:sidebar-expanded:col-span-3">
          //         <button
          //           className={`w-8 h-8 flex items-center justify-center bg-indigo-500 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-md`}>
          //           <span className="sr-only">Search</span>
          //           <svg
          //             xmlns="http://www.w3.org/2000/svg"
          //             fill="none"
          //             viewBox="0 0 24 24"
          //             strokeWidth="1.5"
          //             stroke="white"
          //             className="w-4 h-4">
          //             <path
          //               strokeLinecap="round"
          //               strokeLinejoin="round"
          //               d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
          //             />
          //           </svg>
          //         </button>
          //         <div>
          //           <div className="text-xs ">+91 {lead?.phone}</div>
          //           <div className="text-xs">{lead?.email}</div>
          //         </div>
          //       </div>
          //       <div className="col-span-6 order-1 sm:order-none sm:col-span-4 text-right sm:text-center lg:sidebar-expanded:col-span-6 xl:sidebar-expanded:col-span-4">
          //         <div className="text-xs font-semibold">
          //           <span>{lead?.buyerOffer}</span>
          //           <span className="text-slate-500"> sqft</span>
          //           <span> / </span>
          //           <span>{lead?.sellerOffer}</span>
          //           <span className="text-slate-500"> sqft</span>
          //         </div>
          //       </div>
          //       <div className="col-span-4 order-2 sm:order-none sm:col-span-2 text-right lg:sidebar-expanded:hidden xl:sidebar-expanded:block">
          //         <StatusChip status={lead?.status} size="sm" />
          //       </div>
          //     </div>
          //     <div className="text-xs mt-1 text-indigo-700">{lead?.notes}</div>
          //   </div>
          //   <div
          //     className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 dark:peer-checked:border-indigo-500 rounded pointer-events-none"
          //     aria-hidden="true"
          //   />
          // </label>
        ))}
      </SkeletonLoader>
    </div>
  );
}
