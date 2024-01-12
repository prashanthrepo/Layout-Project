import StatusChip from '@/app/(default)/components-library/StatusChip';
import React from 'react';

export default function SiteDetails({ siteDetails }) {
  return (
    <div>
      <ul className="space-y-2 mb-5">
        <li className="flex items-center">
          <span className="text-sm text-slate-800 dark:text-slate-100 font-medium pr-2">
            Status :
          </span>

          <StatusChip status={siteDetails?.status} size="sm" />
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
