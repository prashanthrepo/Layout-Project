'use client';

import { useState } from 'react';
import Image from 'next/image';
import AccountImage from '@/public/images/user-avatar-80.png';

export default function AccountPanel() {
  const [sync, setSync] = useState<boolean>(false);

  return (
    <div className="grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <h2 className="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-5">
          Profile
        </h2>
        {/* Picture */}
        <section>
          <div className="flex items-center">
            <div className="mr-4">
              <Image
                className="w-20 h-20 rounded-full"
                src={AccountImage}
                width={80}
                height={80}
                alt="User upload"
              />
            </div>
            <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">
              Change
            </button>
          </div>
        </section>
        {/* Business Profile */}
        <section>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Name
              </label>
              <input id="name" className="form-input w-full" type="text" />
            </div>
            <div className="sm:w-1/3">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="user-phone">
                Phone number
              </label>
              <input
                id="user-phone"
                className="form-input w-full"
                type="number"
                inputMode="numeric"
              />
            </div>
            <div className="sm:w-1/3">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="user-email">
                Email
              </label>
              <input
                id="user-email"
                className="form-input w-full"
                type="text"
              />
            </div>
          </div>
        </section>

        {/* <section>
          <h2 className="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-1">
            Password
          </h2>
          <div className="text-sm">
            You can set a permanent password if you don't want to use temporary
            login codes.
          </div>
          <div className="mt-5">
            <button className="btn border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm text-indigo-500">
              Set New Password
            </button>
          </div>
        </section> */}
        {/* Smart Sync */}
        <section>
          <h2 className="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-1">
            Deactivate your account
          </h2>

          <div className="flex items-center mt-5">
            <div className="form-switch">
              <input
                type="checkbox"
                id="toggle"
                className="sr-only"
                checked={sync}
                onChange={() => setSync(!sync)}
              />
              <label
                className="bg-slate-400 dark:bg-slate-700"
                htmlFor="toggle">
                <span className="bg-white shadow-sm" aria-hidden="true"></span>
                <span className="sr-only">Enable smart sync</span>
              </label>
            </div>
            <div className="text-sm text-slate-400 dark:text-slate-500 italic ml-2">
              {sync ? 'On' : 'Off'}
            </div>
          </div>
        </section>
      </div>
      {/* Panel footer */}
      <footer>
        <div className="flex flex-col px-6 py-5 border-t border-slate-200 dark:border-slate-700">
          <div className="flex self-end">
            <button className="btn dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300">
              Cancel
            </button>
            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3">
              Save Changes
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
