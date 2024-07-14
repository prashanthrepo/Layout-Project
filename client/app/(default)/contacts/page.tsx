import ContactsTable from './contacts-table';
export const metadata = {
  title: 'Contacts',
  description: 'Page description',
};

export default function Contacts() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 mx-auto">
      <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm mb-8 w-full p-4">
        <div className="flex flex-col">
          <ContactsTable />
        </div>
      </div>
    </div>
  );
}
