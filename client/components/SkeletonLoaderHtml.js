const SkeletonLoaderHtml = (type, times = 0) => {
  switch (type) {
    case 'PropertyList':
      return new Array(times).fill(0).map((i, key) => (
        <div
          className="shadow-lg rounded-sm border px-5 py-4 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
          key={key}>
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-lg bg-slate-200 h-20 w-20"></div>
            <div className="flex-1 space-y-5 py-1">
              <div className="h-3 bg-slate-200 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ));
    case 'LeadsList':
      return new Array(times).fill(0).map((i, key) => (
        <div
          className="shadow-lg rounded-sm border px-5 py-4 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
          key={key}>
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-3 py-1">
              <div className="h-3 bg-slate-200 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ));
    case 'SiteDetails':
      return (
        <div className="bg-white dark:bg-slate-800 ">
          <div className="animate-pulse flex space-x-2">
            <div className="rounded-lg bg-slate-200 h-12 w-12"></div>
            <div className="flex-1 space-y-3 py-1">
              <div className="h-4 w-12 bg-slate-200 rounded"></div>
              <div className="h-3 w-8 bg-slate-200 rounded"></div>
            </div>
            <div className=" rounded-2xl bg-slate-200 h-7 w-20"></div>
          </div>
          <div className="animate-pulse flex space-x-4 mt-6">
            <div className="flex-1 space-y-3 py-1">
              <div className="space-y-5">
                <div className="grid grid-cols-12 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-4"></div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-3"></div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-4"></div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-3"></div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-4"></div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-5"></div>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className=" rounded-xl bg-slate-200 h-7 w-20"></div>
              <div className="ml-2 rounded-xl bg-slate-200 h-7 w-20"></div>
            </div>
          </div>
          <div className="animate-pulse flex space-x-4 mt-6 mb-2">
            <div className="flex">
              <div className=" rounded-lg bg-slate-200 h-10 w-20"></div>
              <div className="ml-2 rounded-lg bg-slate-200 h-10 w-20"></div>
            </div>
          </div>
          <div className="mb-4 space-y-1  p-1 border border-slate-200 rounded-md ">
            {new Array(3).fill(0).map((i, key) => (
              <div
                className="rounded-sm border px-5 py-4 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                key={key}>
                <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-3 py-1">
                    <div className="h-3 bg-slate-200 rounded"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'LayoutData':
      return (
        <div className="bg-white dark:bg-slate-800 ">
          <div className="animate-pulse flex space-x-2">
            <div className="rounded-lg bg-slate-200 h-12 w-12"></div>
            <div className="flex-1 space-y-3 py-1">
              <div className="h-4 w-12 bg-slate-200 rounded"></div>
              <div className="h-3 w-8 bg-slate-200 rounded"></div>
            </div>
            <div className=" rounded-2xl bg-slate-200 h-7 w-20"></div>
          </div>
          <div className="animate-pulse flex space-x-4 mt-6">
            <div className="flex-1 space-y-3 py-1">
              <div className="space-y-5">
                <div className="grid grid-cols-12 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-4"></div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-3"></div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-4"></div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-3"></div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-4"></div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-5"></div>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className=" rounded-xl bg-slate-200 h-7 w-20"></div>
              <div className="ml-2 rounded-xl bg-slate-200 h-7 w-20"></div>
            </div>
          </div>
          <div className="animate-pulse flex space-x-4 mt-6 mb-2">
            <div className="flex">
              <div className=" rounded-lg bg-slate-200 h-10 w-20"></div>
              <div className="ml-2 rounded-lg bg-slate-200 h-10 w-20"></div>
            </div>
          </div>
          <div className="mb-4 space-y-1  p-1 border border-slate-200 rounded-md ">
            {new Array(3).fill(0).map((i, key) => (
              <div
                className="rounded-sm border px-5 py-4 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                key={key}>
                <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-3 py-1">
                    <div className="h-3 bg-slate-200 rounded"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return (
        <div className="flex justify-center h-80 max-h-40 bg-white">
          <div
            aria-label="Loading..."
            role="status"
            className="flex items-center space-x-2">
            <svg
              className="h-7 w-7 animate-spin stroke-gray-700"
              viewBox="0 0 256 256">
              <line
                x1="128"
                y1="32"
                x2="128"
                y2="64"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"></line>
              <line
                x1="195.9"
                y1="60.1"
                x2="173.3"
                y2="82.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"></line>
              <line
                x1="224"
                y1="128"
                x2="192"
                y2="128"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"></line>
              <line
                x1="195.9"
                y1="195.9"
                x2="173.3"
                y2="173.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"></line>
              <line
                x1="128"
                y1="224"
                x2="128"
                y2="192"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"></line>
              <line
                x1="60.1"
                y1="195.9"
                x2="82.7"
                y2="173.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"></line>
              <line
                x1="32"
                y1="128"
                x2="64"
                y2="128"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"></line>
              <line
                x1="60.1"
                y1="60.1"
                x2="82.7"
                y2="82.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"></line>
            </svg>
            <span className="text-sm font-medium text-gray-700">
              Loading...
            </span>
          </div>
        </div>
      );
  }
};
export default SkeletonLoaderHtml;
