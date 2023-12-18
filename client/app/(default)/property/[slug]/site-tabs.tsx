import { useState } from 'react';
import { Tab } from '@headlessui/react';
import Link from 'next/link';
import LeadsTab from './leads-tab';
import { siteStatus } from '@/common/mockdata.js';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
const tabs = [
  { name: 'Details', href: '#', current: true },
  { name: 'Leads', href: '#', current: false },
  { name: 'History', href: '#', current: false },
];

export default function SiteTabs({ siteDetails, setSiteDetails }) {
  return (
    <div className="w-full sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-600/80 p-1">
          {tabs.map((tab, idx) => (
            <Tab
              key={idx}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  selected
                    ? 'bg-white text-blue-600 shadow'
                    : 'text-white hover:bg-white/[0.12] hover:text-white'
                )
              }>
              {tab?.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel
            className={classNames(
              'rounded-xl bg-white p-3',
              'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
            )}>
            <div className="mb-4">
              <div className="mb-4">
                <div className="font-medium text-slate-800 dark:text-slate-100 mb-3">
                  Change status to
                </div>
                <div className="flex flex-wrap items-center -m-3">
                  {siteStatus?.map((status, key) => (
                    <div className="m-3" key={key}>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="site-status"
                          className="form-radio"
                          checked={siteDetails?.status == status?.type}
                          onChange={() =>
                            setSiteDetails({
                              ...siteDetails,
                              status: status?.type,
                            })
                          }
                        />
                        <span className="text-sm ml-2">{status?.type}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <hr className=" border-b-0 mb-3 border-gray-200" />
              <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 ">
                <div className="sm:w-1/3">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="name">
                    Area
                  </label>
                  <input id="name" className="form-input w-full" type="text" />
                </div>
                <div className="sm:w-1/3">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="business-id">
                    Custom Price (per sqft)
                  </label>
                  <input
                    id="business-id"
                    className="form-input w-full"
                    type="text"
                  />
                </div>
                <div className="sm:w-1/3">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="location">
                    Default Price (per sqft)
                  </label>
                  <input
                    id="location"
                    className="form-input w-full"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel className={classNames('rounded-xl bg-white p-1')}>
            <LeadsTab />
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              'rounded-xl bg-white p-3',
              'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
            )}>
            <div className="mb-4">
              <div className=" pb-1">
                <Link
                  className="text-sm font-bold text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                  href="#0">
                  Add new lead 3
                </Link>
              </div>
              <div className=" pb-1">
                <Link
                  className="text-sm font-bold text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                  href="#0">
                  Set custom price
                </Link>
              </div>
              <div className=" pb-1">
                <Link
                  className="text-sm font-bold text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                  href="#0">
                  Share details
                </Link>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
