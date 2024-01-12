'use client';

import { Popover, Transition } from '@headlessui/react';

export default function OptionsDropdown({ align, onOptionClick }) {
  return (
    <Popover className="relative inline-flex">
      <Popover.Button className="btn bg-white dark:bg-slate-800 border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300">
        <span className="sr-only">Filter</span>
        <wbr />
        <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
          <path d="M9 15H7a1 1 0 010-2h2a1 1 0 010 2zM11 11H5a1 1 0 010-2h6a1 1 0 010 2zM13 7H3a1 1 0 010-2h10a1 1 0 010 2zM15 3H1a1 1 0 010-2h14a1 1 0 010 2z" />
        </svg>
      </Popover.Button>
      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-[10rem] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700  rounded shadow-lg overflow-hidden mt-2 py-1.5  ${
          align === 'right' ? 'left-auto right-0' : 'right-0 left-auto'
        }`}
        enter="transition ease-out duration-200 transform"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0">
        <Popover.Panel>
          {({ close }) => (
            <>
              <ul className="">
                <li
                  className="py-1 px-1 cursor-pointer hover:bg-indigo-50"
                  onClick={() => onOptionClick('statuschange')}>
                  <span className="text-sm font-medium ml-2">
                    Change Status
                  </span>
                </li>
                <li
                  className="py-1 px-1 cursor-pointer hover:bg-indigo-50"
                  onClick={() => onOptionClick('editdetails')}>
                  <span className="text-sm font-medium ml-2">Edit Details</span>
                </li>
                <li
                  className="py-1 px-1 cursor-pointer hover:bg-indigo-50"
                  onClick={() => onOptionClick('addlead')}>
                  <span className="text-sm font-medium ml-2">Add Lead</span>
                </li>
              </ul>
            </>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
