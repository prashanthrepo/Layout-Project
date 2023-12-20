const SkeletonLoaderHtml = (type, times) => {
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
  }
};
export default SkeletonLoaderHtml;
