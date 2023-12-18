import React from 'react';
import UserAvatar from '@/public/images/user-avatar-32.png';
import Image from 'next/image';
import StatusChip from '../../components-library/StatusChip';
import { leadsBgColor } from '@/common/utils';
const leads = [
  {
    name: 'Srikanth Gumireddy',
    status: 'Hot',
    phone: '9876543210',
    buyeroffer: '4000',
    selleroffer: '4800',
    datetime: '12/12/2021 10:00 AM',
    notes:
      'Full cash offered, but needs 6 months time. Everything will in bank transfer.',
  },
  {
    name: 'Sachin',
    status: 'Hot',
    phone: '9876543210',
    buyeroffer: '4000',
    selleroffer: '4800',
    datetime: '12/12/2021 10:00 AM',
    notes: 'Loan can be easily arranged',
  },
  {
    name: 'Babu Reddy',
    status: 'Cold',
    phone: '9876543210',
    buyeroffer: '4000',
    selleroffer: '4800',
    datetime: '12/12/2021 10:00 AM',
    notes: 'Legal issues',
  },
  {
    name: 'Ramesh Babu',
    status: 'Dead',
    phone: '9876543210',
    buyeroffer: '4000',
    selleroffer: '4800',
    datetime: '12/12/2021 10:00 AM',
    notes: '',
  },
];
export default function LeadsTab() {
  return (
    <div className="mb-4 space-y-1 overflow-scroll h-80 bg-slate-100 p-1 border border-slate-200 rounded-md shadow-inner">
      {leads?.map((lead, key) => (
        <label
          className="relative block cursor-pointer text-left w-full bg-white"
          key={key}>
          <input
            type="radio"
            name="radio-buttons"
            className="peer sr-only"
            defaultChecked
          />
          <div className="px-4 py-2.5 rounded dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm duration-150 ease-in-out">
            <div className="grid grid-cols-12 items-center gap-x-2">
              {/* Card */}
              <div className="col-span-6 order-1 sm:order-none sm:col-span-3 text-left sm:text-center lg:sidebar-expanded:hidden xl:sidebar-expanded:block">
                <div className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate text-left">
                  {lead?.name}
                </div>
              </div>
              <div className="col-span-8 order-2 sm:order-none sm:col-span-3 flex items-center space-x-2 lg:sidebar-expanded:col-span-6 xl:sidebar-expanded:col-span-3">
                <button
                  className={`w-8 h-8 flex items-center justify-center bg-blue-500 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-md`}>
                  <span className="sr-only">Search</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="white"
                    className="w-4 h-4">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </button>
                <div>
                  <div className="text-xs ">+91 {lead?.phone}</div>
                  <div className="text-xs">johndoe@gmail.com</div>
                </div>
              </div>
              <div className="col-span-6 order-1 sm:order-none sm:col-span-4 text-right sm:text-center lg:sidebar-expanded:col-span-6 xl:sidebar-expanded:col-span-4">
                <div className="text-xs font-semibold">
                  <span>{lead?.buyeroffer}</span>
                  <span className="text-slate-500"> sqft</span>
                  <span> / </span>
                  <span>{lead?.selleroffer}</span>
                  <span className="text-slate-500"> sqft</span>
                </div>
              </div>
              <div className="col-span-4 order-2 sm:order-none sm:col-span-2 text-right lg:sidebar-expanded:hidden xl:sidebar-expanded:block">
                <StatusChip status={lead?.status} size="sm" />
              </div>
            </div>
            <div className="text-xs mt-1 text-indigo-700">{lead?.notes}</div>
          </div>
          <div
            className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 dark:peer-checked:border-indigo-500 rounded pointer-events-none"
            aria-hidden="true"
          />
        </label>
      ))}
    </div>
  );
}
