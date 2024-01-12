import { Tab } from '@headlessui/react';
import LeadsTab from './leads-tab';
import HistoryTab from './history-tab';
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
      <hr className=" border-b-0 mb-3 border-gray-200" />
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
          <Tab.Panel className={classNames('rounded-xl ')}>
            <LeadsTab leads={leads} loading={loading} />
          </Tab.Panel>
          <Tab.Panel className={classNames('rounded-xl ')}>
            <div className="mb-4">
              <HistoryTab siteDetails={siteDetails} />
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
