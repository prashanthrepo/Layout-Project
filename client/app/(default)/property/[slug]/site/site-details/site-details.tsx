import StatusChip from '@/app/(default)/components-library/StatusChip';
import { convertDate, daysBetween } from '@/common/utils';
import { Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import React, { Fragment, useCallback } from 'react';
import cancelTokenApi from '@/apicalls/cancel-token';
import TokenDetails from './details/token-details';
import SoldDetails from './details/sold-details';

export default function SiteDetails({ siteDetails, setUiStatus }) {
  const tokenCancelReasonRef = React.useRef(null);
  const [cancelToken, setCancelToken] = React.useState(false);

  return (
    <div>
      {siteDetails?.status == 'Token' && (
        <TokenDetails siteDetails={siteDetails} reFetch={() => {}} />
      )}
      {siteDetails?.status == 'Sold' && (
        <SoldDetails siteDetails={siteDetails} />
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
