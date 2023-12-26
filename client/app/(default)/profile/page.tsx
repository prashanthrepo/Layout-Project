export const metadata = {
  title: 'Account Settings - Mosaic',
  description: 'Page description',
};

import AccountPanel from './account-panel';

export default function AccountSettings() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm mb-8">
        <div className="flex flex-col md:flex-row md:-mr-px">
          <AccountPanel />
        </div>
      </div>
    </div>
  );
}
