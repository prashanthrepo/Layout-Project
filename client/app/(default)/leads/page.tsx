import LeadsTable from './leads-table';

export const metadata = {
  title: 'Leads',
  description: 'Page description',
};

export default function Leads() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 mx-auto">
      <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm mb-8 w-full p-4">
        <div className="flex flex-col">
          <LeadsTable />
        </div>
      </div>
    </div>
  );
}
