const SkeletonLoaderHtml = (type, times = 0) => {
  console.log('type :>> ', type);
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
  }
};
export default SkeletonLoaderHtml;
