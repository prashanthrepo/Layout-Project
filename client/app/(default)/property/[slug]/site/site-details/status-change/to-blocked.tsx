import updateSiteByID from '@/apicalls/update-site-by-id';
import AutocompleteDropdown from '@/app/(default)/components-library/AutocompleteDropdown';
import DatepickerComponent from '@/app/(default)/components-library/DatepickerComponent';
import { format } from 'date-fns';
import React, { useCallback, useState } from 'react';

export default function ToBlocked({
  leads,
  currentStatus,
  siteDetails,
  onRefetchDataFn,
  onClose,
}) {
  const [toBlocked, setToBlocked] = useState({
    lead: null,
    notes: null,
  });
  const onUpdateSiteFn = useCallback(() => {
    const payload = {};
    payload['status'] = currentStatus;
    payload['statusMetadata'] = toBlocked;
    const res = updateSiteByID({ id: siteDetails?._id, payload });
    res?.then((res) => {
      if (res) {
        onRefetchDataFn(res?.data);
      }
    });
  }, [siteDetails?._id, currentStatus, toBlocked]);
  return (
    <div className="mb-4">
      <div className="space-y-3 bg-slate-50 p-3 sm:p-5 rounded-lg border border-indigo-100 ">
        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-3">
          Blocked for
        </h3>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label
              className="block text-xs sm:text-sm font-medium"
              htmlFor="blocked-lead">
              Blocked to <span className="text-rose-500">*</span>
            </label>
            <AutocompleteDropdown
              className="pp-input"
              leads={leads}
              onChange={(val) => setToBlocked({ ...toBlocked, lead: val?._id })}
              defaultValue={leads[0]}
            />
          </div>
        </div>
        <div>
          <label
            className="block text-xs sm:text-sm font-medium"
            htmlFor="blocked-notes">
            Notes <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="blocked-notes"
            className="form-input w-full"
            placeholder="..."
            defaultValue={toBlocked?.notes}
            onChange={(e) =>
              setToBlocked({ ...toBlocked, notes: e.target.value })
            }
          />
        </div>
        {currentStatus != 'Available' && (
          <div className="flex w-full flex-wrap justify-center space-x-2 my-4">
            <button className="btnsecondary" onClick={() => onClose()}>
              Close
            </button>
            <button
              className="btnprimary"
              onClick={() => {
                onUpdateSiteFn();
              }}>
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
