import updateSiteByID from '@/apicalls/update-site-by-id';
import AutocompleteDropdown from '@/app/(default)/components-library/AutocompleteDropdown';
import DatepickerComponent from '@/app/(default)/components-library/DatepickerComponent';
import { format } from 'date-fns';
import React, { useCallback, useState } from 'react';

export default function ToSold({
  leads,
  currentStatus,
  siteDetails,
  onRefetchDataFn,
  onClose,
}) {
  const [toSold, setToSold] = useState({
    lead: null,
    amount: null,
    registrationDate: new Date(),
    notes: null,
  });

  const onUpdateSiteFn = useCallback(() => {
    const payload = {};
    payload['status'] = currentStatus;
    payload['statusMetadata'] = toSold;
    const res = updateSiteByID({ id: siteDetails?._id, payload });
    res?.then((res) => {
      if (res) {
        onRefetchDataFn(res?.data);
      }
    });
  }, [siteDetails?._id, currentStatus, toSold]);
  return (
    <div className="mb-4">
      <div className="space-y-3 bg-slate-50 p-3 sm:p-5 rounded-lg border border-indigo-100 ">
        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-3">
          Sold to
        </h3>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label
              className="block text-xs sm:text-sm font-medium"
              htmlFor="sold-lead">
              Sold to <span className="text-rose-500">*</span>
            </label>
            <AutocompleteDropdown
              className="pp-input"
              leads={leads}
              onChange={(val) => setToSold({ ...toSold, lead: val?._id })}
              defaultValue={leads[0]}
            />
          </div>
          <div className="flex-1">
            <label
              className="block text-xs sm:text-sm font-medium"
              htmlFor="sold-amount">
              Amount <span className="text-rose-500">*</span>
            </label>
            <input
              id="sold-amount"
              className="form-input w-full"
              type="text"
              defaultValue={toSold?.amount}
              onChange={(e) =>
                setToSold({ ...toSold, amount: +e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label
              className="block text-xs sm:text-sm font-medium"
              htmlFor="token-validity">
              Registration Date <span className="text-rose-500">*</span>
            </label>
            {/* <input
                id="token-validity"
                className="form-input w-full text-right"
                type="number"
                defaultValue={toSold?.registrationDate}
                onChange={(e) =>
                  setToSold({ ...toSold, registrationDate: e.target.value })
                }
              /> */}
            <DatepickerComponent
              className="pp-input"
              onChange={(val) => {
                //format val to dd/mm/yyyy
                val = format(val, 'dd/MM/yyyy');
                setToSold({ ...toSold, registrationDate: val });
              }}
            />
          </div>
          <div className="flex-1">
            <label
              className="block text-xs sm:text-sm font-medium"
              htmlFor="sold-notes">
              Notes <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="sold-notes"
              className="form-input w-full"
              placeholder="..."
              defaultValue={toSold?.notes}
              onChange={(e) => setToSold({ ...toSold, notes: e.target.value })}
            />
          </div>
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
