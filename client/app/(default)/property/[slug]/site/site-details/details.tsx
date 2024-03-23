import StatusChip from '@/app/(default)/components-library/StatusChip';
import { convertDate, daysBetween } from '@/common/utils';
import { Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import React, { Fragment, useCallback } from 'react';
import cancelTokenApi from '@/apicalls/cancel-token';

export default function SiteDetails({ siteDetails, setUiStatus }) {
  const tokenCancelReasonRef = React.useRef(null);
  const [cancelToken, setCancelToken] = React.useState(false);

  return (
    <div>
      {siteDetails?.status == 'Sold' && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                  clipRule="evenodd"></path>
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Sold to {siteDetails?.statusMetadata?.lead?.name}
              </h3>
              <div className="">
                <p>
                  Sold for{' '}
                  <span className="font-semibold">
                    {siteDetails?.statusMetadata?.amount}
                  </span>
                </p>
                <p>
                  Sold on{' '}
                  <span className="font-semibold">
                    {convertDate(siteDetails?.statusMetadata?.lead?.createdAt)}
                  </span>
                </p>

                <p>
                  Notes{' '}
                  <span className="font-semibold">
                    {siteDetails?.statusMetadata?.notes}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {siteDetails?.status == 'Token' && (
        <div className="rounded-md bg-blue-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                  clipRule="evenodd"></path>
              </svg>
            </div>
            <div className="ml-3 text-slate-600">
              <h3 className=" font-medium text-blue-700">
                Token expires in{' '}
                {daysBetween(siteDetails?.statusMetadata?.token?.expiryDate)}
                days
              </h3>

              <p>
                Token to{' '}
                <span className="font-semibold">
                  {siteDetails?.statusMetadata?.token?.lead?.name}
                </span>
              </p>
              <p>
                Token amount{' '}
                <span className="font-semibold">
                  {siteDetails?.statusMetadata?.token?.tokenAmount}
                </span>
              </p>
              <p>
                Token given on{' '}
                <span className="font-semibold">
                  {convertDate(siteDetails?.statusMetadata?.token?.createdAt)}
                </span>
              </p>
              <p>
                Token expires on{' '}
                <span className="font-semibold">
                  {convertDate(siteDetails?.statusMetadata?.token?.expiryDate)}
                </span>
              </p>
              <p>
                Notes{' '}
                <span className="font-semibold">
                  {siteDetails?.statusMetadata?.notes}
                </span>
              </p>
              <div className="mt-1">
                <div className="my-1.5 space-x-2 flex">
                  <button
                    onClick={() => setCancelToken(true)}
                    type="button"
                    className="rounded-md bg-red-100 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50">
                    Cancel token
                  </button>
                  <button
                    type="button"
                    className="rounded-md bg-blue-200 px-2 py-1.5 text-sm font-medium text-blue-800 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-blue-50">
                    Mark as sold
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ul className="space-y-2 my-2">
        <li className="flex items-center">
          <span className="text-sm text-slate-800 dark:text-slate-100 font-medium pr-2">
            Status :
          </span>

          <StatusChip status={siteDetails?.status} size="sm" />
          <button
            onClick={() => setUiStatus('statuschange')}
            className="text-indigo-600 font-semibold pl-2">
            change
          </button>
        </li>
        <li className="flex items-center">
          <div>
            <span className="text-sm text-slate-800 dark:text-slate-100 font-medium">
              Dimensions :
            </span>
            <span className="pl-1">30ft x 40ft</span>
          </div>
        </li>
        <li className="flex items-center">
          <span className="text-sm text-slate-800 dark:text-slate-100 font-medium">
            Area :
          </span>

          <span className="pl-1">1200sqft</span>
        </li>
        <li className="flex items-center">
          <span className="text-sm text-slate-800 dark:text-slate-100 font-medium">
            Custom Price :
          </span>

          <span className="pl-1">4000</span>
        </li>
        <li className="flex items-center">
          <span className="text-sm text-slate-800 dark:text-slate-100 font-medium">
            Default Price :
          </span>

          <span className="pl-1">4000</span>
        </li>
      </ul>
    </div>
  );
}
