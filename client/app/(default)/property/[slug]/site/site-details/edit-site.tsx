import StatusChip from '@/app/(default)/components-library/StatusChip';
import { siteStatus } from '@/common/mockdata';
import { Menu, Transition } from '@headlessui/react';
import React from 'react';

export default function EditSite({ setSiteDetails, siteDetails, onUpdate }) {
  return (
    <div>
      <ul className="space-y-2 mb-5">
        <li className="flex items-center">
          <span className="text-sm text-slate-800 dark:text-slate-100 font-medium pr-2">
            Status :
          </span>
          <Menu as="div" className="relative inline-flex">
            {({ open }) => (
              <>
                <Menu.Button
                  className="btn py-1 justify-between min-w-[11rem] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200"
                  aria-label="Select date range">
                  <span className="flex items-center">
                    <span>{siteDetails?.status}</span>
                  </span>
                  <svg
                    className="shrink-0 ml-1 fill-current text-slate-400"
                    width="11"
                    height="7"
                    viewBox="0 0 11 7">
                    <path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" />
                  </svg>
                </Menu.Button>
                <Transition
                  className="z-10 absolute top-full right-0 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1"
                  enter="transition ease-out duration-100 transform"
                  enterFrom="opacity-0 -translate-y-2"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-out duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <Menu.Items className="font-medium text-sm text-slate-600 dark:text-slate-300 focus:outline-none">
                    {siteStatus.map((option, optionIndex) => (
                      <Menu.Item key={optionIndex}>
                        {({ active }) => (
                          <button
                            className={`flex items-center w-full py-1 px-3 cursor-pointer ${
                              active ? 'bg-slate-50 dark:bg-slate-700/20' : ''
                            } ${
                              option.type === siteDetails?.status &&
                              'text-indigo-500'
                            }`}
                            onClick={() => {
                              setSiteDetails({
                                ...siteDetails,
                                status: option.type,
                              });
                            }}>
                            <svg
                              className={`shrink-0 mr-2 fill-current text-indigo-500 ${
                                option.type !== siteDetails?.status &&
                                'invisible'
                              }`}
                              width="12"
                              height="9"
                              viewBox="0 0 12 9">
                              <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
                            </svg>
                            <span>{option?.type}</span>
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        </li>
        <li className="flex items-center">
          <div>
            <span className="text-sm text-slate-800 dark:text-slate-100 font-medium">
              Dimensions :
            </span>
            <input
              id="name"
              className="form-input ml-2 py-1"
              type="text"
              defaultValue="30ft x 40ft"
            />
          </div>
        </li>
        <li className="flex items-center">
          <span className="text-sm text-slate-800 dark:text-slate-100 font-medium">
            Area :
          </span>
          <input
            id="name"
            className="form-input ml-2 py-1"
            type="text"
            defaultValue="1200sqft"
          />
        </li>
        <li className="flex items-center">
          <span className="text-sm text-slate-800 dark:text-slate-100 font-medium">
            Custom Price :
          </span>
          <input
            id="name"
            className="form-input ml-2 py-1"
            type="text"
            defaultValue="4000"
          />
        </li>
        <li className="flex items-center">
          <span className="text-sm text-slate-800 dark:text-slate-100 font-medium">
            Default Price :
          </span>
          <input
            id="name"
            className="form-input ml-2 py-1"
            type="text"
            defaultValue="4000"
          />
        </li>
      </ul>
      <div className="flex w-full flex-wrap justify-center space-x-2 my-4">
        <button className="btnprimary" onClick={() => onUpdate()}>
          Save
        </button>
      </div>
    </div>
  );
}
