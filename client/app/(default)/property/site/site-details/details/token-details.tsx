import StatusChip from '@/components/StatusChip';
import { convertDate, daysBetween } from '@/common/utils';
import WarningDialog from '@/components/WarningDialog';
import { Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import React, { Fragment, useCallback } from 'react';
import cancelTokenApi from '@/apicalls/cancel-token';
import toast from 'react-hot-toast';

export default function TokenDetails({ siteDetails, reFetch }) {
  const tokenCancelReasonRef = React.useRef(null);
  const [cancelToken, setCancelToken] = React.useState(false);
  const [cancelLoading, setCancelLoading] = React.useState(false);
  const onCancelTokenFn = useCallback(() => {
    setCancelLoading(true);
    const payload = {
      cancellationReason: tokenCancelReasonRef.current.value,
    };
    const res = cancelTokenApi(
      siteDetails?.statusMetadata?.token?._id,
      payload
    );
    res?.then((res) => {
      if (res?.status == 200) {
        setCancelLoading(false);
        toast.success('Token cancelled');
        reFetch();
        setTimeout(() => {
          setCancelToken(false);
        }, 2000);
      } else {
        setCancelLoading(false);
      }
    });
  }, [siteDetails]);
  return (
    <div>
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

      <WarningDialog open={cancelToken} setOpen={setCancelToken}>
        {cancelLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <ExclamationTriangleIcon
                  className="h-6 w-6 text-red-600"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                <div className="h3 text-base font-semibold leading-6 text-gray-900">
                  Token cancellation
                </div>
                <div className="mt-2 w-full">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to cancel the token?
                  </p>
                  <div className="mt-2">
                    <textarea
                      rows={2}
                      name="comment"
                      ref={tokenCancelReasonRef}
                      id="comment"
                      placeholder="Provide a reason..."
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:ml-10 sm:mt-4 sm:flex sm:pl-4">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto"
                onClick={() => onCancelTokenFn()}>
                Cancel
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:mt-0 sm:w-auto"
                onClick={() => setCancelToken(false)}>
                Close
              </button>
            </div>
          </div>
        )}
      </WarningDialog>
    </div>
  );
}
