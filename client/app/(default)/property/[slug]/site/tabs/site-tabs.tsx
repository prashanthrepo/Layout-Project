import { useCallback, useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import Link from 'next/link';
import LeadsTab from './leads/leads-tab';
import { siteStatus } from '@/common/mockdata.js';
import HistoryTab from './history/history-tab';
import getLeadsBySite from '@/api/get-leads-by-site';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
const tabs = [
  { name: 'Leads', href: '#', current: false },
  { name: 'History', href: '#', current: false },
];

export default function SiteTabs({
  siteDetails,
  setSiteDetails,
  leads,
  loading,
}) {
  return (
    <div className=" relative w-full sm:px-0">
      <Tab.Group>
        <Tab.List className=" flex space-x-1">
          {tabs.map((tab, idx) => (
            <Tab
              key={idx}
              className={({ selected }) =>
                classNames(selected ? 'btnprimary' : 'btnsecondary')
              }>
              {tab?.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {/* <Tab.Panel
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
          </Tab.Panel> */}
          <Tab.Panel className={classNames('rounded-xl ')}>
            <LeadsTab leads={leads} loading={loading} />
          </Tab.Panel>
          <Tab.Panel className={classNames('rounded-xl ')}>
            <div className="mb-4">
              <HistoryTab />
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
