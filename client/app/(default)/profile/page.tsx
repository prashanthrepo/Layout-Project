export const metadata = {
  title: 'Account Settings - Mosaic',
  description: 'Page description',
};

import AccountPanel from './account-panel';

export default function AccountSettings() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 mx-auto">
      <div className="bg-white shadow-lg rounded-sm mb-8 w-full md:w-1/2 xl:w-2/5">
        <div className="flex flex-col  md:flex-row md:-mr-px">
          <AccountPanel />
        </div>
      </div>
    </div>
  );
}
