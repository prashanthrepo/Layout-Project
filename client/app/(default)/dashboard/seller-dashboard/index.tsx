export default function SellerDashboard() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-5">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
            Seller Dashboard
          </h1>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          <form className="relative">
            <label htmlFor="action-search" className="sr-only">
              Search
            </label>
            <input
              id="action-search"
              className="form-input pl-9 bg-white dark:bg-slate-800"
              type="search"
              placeholder="Search..."
            />
            <button
              className="absolute inset-0 right-auto group"
              type="submit"
              aria-label="Search">
              <svg
                className="w-4 h-4 shrink-0 fill-current text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 ml-3 mr-2"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
              </svg>
            </button>
          </form>
          <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
            <svg
              className="w-4 h-4 fill-current opacity-50 shrink-0"
              viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="hidden xs:block ml-2"> Add Property</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full">
        <div>
          <dl className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 shadow sm:px-6 sm:pt-6">
              <dt>
                <div className="absolute rounded-md bg-indigo-500 p-3">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"></path>
                  </svg>
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                  Layouts
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">1</p>
              </dd>
            </div>
            <div className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 shadow sm:px-6 sm:pt-6">
              <dt>
                <div className="absolute rounded-md bg-indigo-500 p-3">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"></path>
                  </svg>
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                  Total Sites
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">100</p>
              </dd>
            </div>
            <div className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 shadow sm:px-6 sm:pt-6">
              <dt>
                <div className="absolute rounded-md bg-indigo-500 p-3">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"></path>
                  </svg>
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                  Total Sold
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">33</p>
              </dd>
            </div>
            <div className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 shadow sm:px-6 sm:pt-6">
              <dt>
                <div className="absolute rounded-md bg-indigo-500 p-3">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"></path>
                  </svg>
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                  Tokens Given
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">27</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-lg mt-5 mb-20">
        <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            Recent Activity
          </h2>
        </header>
        <div className="p-3">
          {/* Card content */}
          {/* "Today" group */}
          <div>
            <header className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">
              Today
            </header>
            <ul className="my-1">
              {/* Item */}
              <li className="flex px-2">
                <div className="w-9 h-9 rounded-full shrink-0 bg-indigo-500 my-2 mr-3">
                  <svg
                    className="w-9 h-9 fill-current text-indigo-50"
                    viewBox="0 0 36 36">
                    <path d="M18 10c-4.4 0-8 3.1-8 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L18.9 22H18c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z" />
                  </svg>
                </div>
                <div className="grow flex items-center border-b border-slate-100 dark:border-slate-700 text-sm py-2">
                  <div className="grow flex justify-between">
                    <div className="self-center">
                      <a
                        className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white"
                        href="#0">
                        Nick Mark
                      </a>{' '}
                      mentioned{' '}
                      <a
                        className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white"
                        href="#0">
                        Sara Smith
                      </a>{' '}
                      in a new post
                    </div>
                    <div className="shrink-0 self-end ml-2">
                      <a
                        className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                        href="#0">
                        View<span className="hidden sm:inline"> -&gt;</span>
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              {/* Item */}
              <li className="flex px-2">
                <div className="w-9 h-9 rounded-full shrink-0 bg-rose-500 my-2 mr-3">
                  <svg
                    className="w-9 h-9 fill-current text-rose-50"
                    viewBox="0 0 36 36">
                    <path d="M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z" />
                  </svg>
                </div>
                <div className="grow flex items-center border-b border-slate-100 dark:border-slate-700 text-sm py-2">
                  <div className="grow flex justify-between">
                    <div className="self-center">
                      The post{' '}
                      <a
                        className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white"
                        href="#0">
                        Post Name
                      </a>{' '}
                      was removed by{' '}
                      <a
                        className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white"
                        href="#0">
                        Nick Mark
                      </a>
                    </div>
                    <div className="shrink-0 self-end ml-2">
                      <a
                        className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                        href="#0">
                        View<span className="hidden sm:inline"> -&gt;</span>
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              {/* Item */}
              <li className="flex px-2">
                <div className="w-9 h-9 rounded-full shrink-0 bg-emerald-500 my-2 mr-3">
                  <svg
                    className="w-9 h-9 fill-current text-emerald-50"
                    viewBox="0 0 36 36">
                    <path d="M15 13v-3l-5 4 5 4v-3h8a1 1 0 000-2h-8zM21 21h-8a1 1 0 000 2h8v3l5-4-5-4v3z" />
                  </svg>
                </div>
                <div className="grow flex items-center text-sm py-2">
                  <div className="grow flex justify-between">
                    <div className="self-center">
                      <a
                        className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white"
                        href="#0">
                        Patrick Sullivan
                      </a>{' '}
                      published a new{' '}
                      <a
                        className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white"
                        href="#0">
                        post
                      </a>
                    </div>
                    <div className="shrink-0 self-end ml-2">
                      <a
                        className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                        href="#0">
                        View<span className="hidden sm:inline"> -&gt;</span>
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          {/* "Yesterday" group */}
          <div>
            <header className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">
              Yesterday
            </header>
            <ul className="my-1">
              {/* Item */}
              <li className="flex px-2">
                <div className="w-9 h-9 rounded-full shrink-0 bg-sky-500 my-2 mr-3">
                  <svg
                    className="w-9 h-9 fill-current text-sky-50"
                    viewBox="0 0 36 36">
                    <path d="M23 11v2.085c-2.841.401-4.41 2.462-5.8 4.315-1.449 1.932-2.7 3.6-5.2 3.6h-1v2h1c3.5 0 5.253-2.338 6.8-4.4 1.449-1.932 2.7-3.6 5.2-3.6h3l-4-4zM15.406 16.455c.066-.087.125-.162.194-.254.314-.419.656-.872 1.033-1.33C15.475 13.802 14.038 13 12 13h-1v2h1c1.471 0 2.505.586 3.406 1.455zM24 21c-1.471 0-2.505-.586-3.406-1.455-.066.087-.125.162-.194.254-.316.422-.656.873-1.028 1.328.959.878 2.108 1.573 3.628 1.788V25l4-4h-3z" />
                  </svg>
                </div>
                <div className="grow flex items-center border-b border-slate-100 dark:border-slate-700 text-sm py-2">
                  <div className="grow flex justify-between">
                    <div className="self-center">
                      <a
                        className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white"
                        href="#0">
                        240+
                      </a>{' '}
                      users have subscribed to{' '}
                      <a
                        className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white"
                        href="#0">
                        Newsletter #1
                      </a>
                    </div>
                    <div className="shrink-0 self-end ml-2">
                      <a
                        className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                        href="#0">
                        View<span className="hidden sm:inline"> -&gt;</span>
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              {/* Item */}
              <li className="flex px-2">
                <div className="w-9 h-9 rounded-full shrink-0 bg-indigo-500 my-2 mr-3">
                  <svg
                    className="w-9 h-9 fill-current text-indigo-50"
                    viewBox="0 0 36 36">
                    <path d="M18 10c-4.4 0-8 3.1-8 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L18.9 22H18c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z" />
                  </svg>
                </div>
                <div className="grow flex items-center text-sm py-2">
                  <div className="grow flex justify-between">
                    <div className="self-center">
                      The post{' '}
                      <a
                        className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white"
                        href="#0">
                        Post Name
                      </a>{' '}
                      was suspended by{' '}
                      <a
                        className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white"
                        href="#0">
                        Nick Mark
                      </a>
                    </div>
                    <div className="shrink-0 self-end ml-2">
                      <a
                        className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                        href="#0">
                        View<span className="hidden sm:inline"> -&gt;</span>
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
