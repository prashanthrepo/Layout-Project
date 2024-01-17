import React, { useCallback, useState } from 'react';
import { format } from 'date-fns';
import createLead from '@/apicalls/create-lead';
import { siteStatus } from '@/common/mockdata';
import StatusChip from '@/app/(default)/components-library/StatusChip';
import AutocompleteDropdown from '@/app/(default)/components-library/AutocompleteDropdown';
import DatepickerComponent from '@/app/(default)/components-library/DatepickerComponent';
import updateSiteByID from '@/apicalls/update-site-by-id';
export default function StatusChange({
  siteDetails,
  setUiStatus,
  onClose,
  leads,
  onRefetchDataFn,
}) {
  const [currentStatus, setCurrentStatus] = useState(siteDetails?.status);

  const [toToken, setToToken] = useState({
    lead: null,
    tokenAmount: null,
    validity: null,
    notes: null,
  });
  const [toSold, setToSold] = useState({
    lead: null,
    amount: null,
    registrationDate: new Date(),
    notes: null,
  });

  const [toBlocked, setToBlocked] = useState({
    lead: null,
    notes: null,
  });
  // {
  //   "status" : "Blocked",
  //   "statusMetadata": {
  //     "lead":"659cb22ed1d25b52cdc6312e"
  //   }
  // }
  //   const onNewLeadSave = () => {
  //     const res = createLead(newLead);
  //     res?.then((res) => {
  //       if (res) {
  //         setUiStatus('sitedetails');
  //       }
  //     });
  //   };
  const onUpdateSiteFn = useCallback(() => {
    const payload = {};
    if (currentStatus == 'Available') {
      payload['status'] = currentStatus;
    }
    if (currentStatus == 'Sold') {
      payload['status'] = currentStatus;
      payload['statusMetadata'] = toSold;
    }
    if (currentStatus == 'Token') {
      payload['status'] = currentStatus;
      payload['token'] = toToken;
      payload['statusMetadata'] = { notes: toToken?.notes };
    }
    if (currentStatus == 'Blocked') {
      payload['status'] = currentStatus;
      payload['statusMetadata'] = toBlocked;
    }
    const res = updateSiteByID(siteDetails?._id, payload);
    res?.then((res) => {
      if (res) {
        onRefetchDataFn(res?.data);

        // setSiteDetails(res?.site);
        // onSiteStatusChange(res?.site?.number, res?.site?.status);
        // setOpenModal(false);
      }
    });
  }, [siteDetails?._id, currentStatus, toSold, toToken, toBlocked]);
  return (
    <div>
      <div className="mb-4">
        <div className="font-medium text-slate-800 dark:text-slate-100 mb-3">
          Change site status to -
        </div>
        <div className={'flex flex-wrap items-center '}>
          {siteStatus?.map((status, key) => (
            <div
              className={
                'mr-2 ' +
                (status?.type != currentStatus
                  ? ' border-2 border-transparent'
                  : 'border-2 border-blue-400 rounded-lg')
              }
              key={key}>
              <label className="flex items-center  cursor-pointer">
                <input
                  type="radio"
                  name="site-status"
                  className="form-radio hidden"
                  defaultChecked={status?.type == siteDetails?.status}
                  onChange={() => setCurrentStatus(status?.type)}
                />
                <StatusChip status={status?.type} size="sm" />
              </label>
            </div>
          ))}
        </div>
      </div>
      {currentStatus == 'Token' && (
        <div className="space-y-3 bg-slate-50 p-3 sm:p-5 rounded-lg border border-indigo-100 ">
          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-3">
            Add Token
          </h3>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label
                className="block text-xs sm:text-sm font-medium"
                htmlFor="token-lead">
                Token to <span className="text-rose-500">*</span>
              </label>
              {/* <input
                id="token-lead"
                className="form-input w-full"
                type="text"
                placeholder="prashanth"
                defaultValue={toToken?.name}
                onChange={(e) =>
                  setToToken({ ...toToken, name: e.target.value })
                }
                          /> */}
              <AutocompleteDropdown
                leads={leads}
                onChange={(val) => setToToken({ ...toToken, lead: val?._id })}
              />
            </div>
            <div className="flex-1">
              <label
                className="block text-xs sm:text-sm font-medium"
                htmlFor="token-amount">
                Amount <span className="text-rose-500">*</span>
              </label>
              <input
                id="token-amount"
                className="form-input w-full"
                type="text"
                defaultValue={toToken?.tokenAmount}
                onChange={(e) =>
                  setToToken({ ...toToken, tokenAmount: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label
                className="block text-xs sm:text-sm font-medium"
                htmlFor="token-validity">
                Valid days <span className="text-rose-500">*</span>
              </label>
              <input
                id="token-validity"
                className="form-input w-full text-right"
                type="number"
                defaultValue={toToken?.validity}
                onChange={(e) =>
                  setToToken({ ...toToken, validity: +e.target.value })
                }
              />
            </div>
            <div className="flex-1">
              <label
                className="block text-xs sm:text-sm font-medium"
                htmlFor="lead-notes">
                Notes <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="lead-notes"
                className="form-input w-full"
                placeholder="..."
                defaultValue={toToken?.notes}
                onChange={(e) =>
                  setToToken({ ...toToken, notes: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      )}
      {currentStatus == 'Sold' && (
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
                leads={leads}
                onChange={(val) => setToSold({ ...toSold, lead: val?._id })}
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
                onChange={(e) =>
                  setToSold({ ...toSold, notes: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      )}
      {currentStatus == 'Blocked' && (
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
                leads={leads}
                onChange={(val) =>
                  setToBlocked({ ...toBlocked, lead: val?._id })
                }
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
        </div>
      )}
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
  );
}
