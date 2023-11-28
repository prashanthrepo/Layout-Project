import getLayouts from '@/api/get-layouts';
import mapImage from '../../../../public/images/google-maps.png';
import Image from 'next/image';
import Link from 'next/link';
import SearchForm from '@/components/search-form';

export default function AllLayouts() {
  const { layouts, loading, error } = getLayouts();
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-full xl:col-span-6">
          <div className="flex flex-col ">
            <div className="w-full">
              <div className="sm:flex sm:justify-between sm:items-center mb-5">
                {/* Left: Title */}
                <div className="mb-4 sm:mb-0 w-4/12">
                  <h1 className="text-1xl md:text-2xl text-slate-800 dark:text-slate-100 font-bold">
                    All Property's
                  </h1>
                </div>

                <div className="w-full sm:w-8/12  flex justify-end gap-2">
                  <form className="relative w-full sm:w-7/12">
                    <label htmlFor="action-search" className="sr-only">
                      Search
                    </label>
                    <input
                      id="action-search"
                      className="form-input w-full pl-2 pr-8 bg-white dark:bg-slate-800"
                      type="search"
                      placeholder={'search property...'}
                    />
                    <button
                      className="absolute inset-0 left-auto group mx-2"
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
                  <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white  xs:w-6/12 sm:w-4/12">
                    <svg
                      className="w-4 h-4 fill-current opacity-50 shrink-0"
                      viewBox="0 0 16 16">
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="hidden xs:block ml-2">Add Property</span>
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                {layouts?.map((layout, key) => (
                  <Link href={`/dashboard/${layout?._id}`} key={key}>
                    <div
                      className={`shadow-lg rounded-sm border px-5 py-4 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700
          }`}>
                      <div className="md:flex justify-between items-center space-y-4 md:space-y-0 space-x-2">
                        <div className="flex items-start space-x-3 md:space-x-4">
                          <div className="w-20 h-20 shrink-0 mt-1">
                            <Image
                              className="w-20 h-20 rounded-lg"
                              src={mapImage}
                              width={100}
                              height={100}
                              alt={layout?.description}
                            />
                          </div>
                          <div>
                            <span className="inline-flex font-semibold text-slate-800 dark:text-slate-100">
                              {layout?.name}
                            </span>
                            <div className="text-sm">{layout?._id}</div>
                            <div className="text-sm">{layout?.description}</div>
                            <div
                              className={`text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1 my-1 bg-emerald-100 dark:bg-emerald-400/30 text-emerald-600 dark:text-emerald-400'
                  }`}>
                              Available
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>{' '}
      </div>
    </div>
  );
}
