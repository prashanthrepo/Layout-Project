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

export default function SiteTabs({ siteDetails, setSiteDetails }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newLead, setNewLead] = useState(false);
  const getLeads = useCallback(() => {
    setLoading(true);
    const leads = getLeadsBySite(siteDetails?._id);
    leads?.then((leads) => {
      setLoading(false);
      setLeads(leads?.leads || []);
    });
  }, [siteDetails?._id]);

  useEffect(() => {
    getLeads();
  }, [siteDetails?._id]);
  return (
    <div className=" relative w-full sm:px-0">
      <Tab.Group>
        <Tab.List className=" flex justify-between">
          <div className=" space-x-1 ">
            {tabs.map((tab, idx) => (
              <Tab
                key={idx}
                className={({ selected }) =>
                  classNames(
                    ' rounded-md px-5 py-2 text-sm font-medium leading-5',
                    selected
                      ? 'bg-indigo-500 text-white dark:text-blue-100 dark:bg-indigo-500'
                      : 'bg-slate-200 text-slate-600 dark:text-blue-100 dark:bg-slate-500 '
                  )
                }>
                {tab?.name}
              </Tab>
            ))}
          </div>
          {!newLead && (
            <button
              className="inline-flex float-right rounded-md px-5 py-2 text-sm font-medium leading-5 bg-indigo-500 text-white dark:text-blue-100 dark:bg-indigo-500"
              onClick={() => setNewLead(true)}>
              <svg
                className="w-4 h-4 fill-current opacity-50 shrink-0"
                viewBox="0 0 16 16">
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
              <span className="ml-2">Add Lead</span>
            </button>
          )}
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
            <LeadsTab
              leads={leads}
              loading={loading}
              newLead={newLead}
              setNewLead={setNewLead}
            />
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
