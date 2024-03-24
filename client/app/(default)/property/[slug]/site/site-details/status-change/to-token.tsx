import React, { useCallback, useEffect, useState } from 'react';
import updateSiteByID from '@/apicalls/update-site-by-id';
import AutocompleteDropdown from '@/app/(default)/components-library/AutocompleteDropdown';
import ButtonLoader from '@/components/ButtonLoader';
import Link from 'next/link';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import DatepickerComponent from '@/app/(default)/components-library/DatepickerComponent';
import { format } from 'date-fns';

export default function ToToken({
  leads,
  siteDetails,
  onRefetchDataFn,
  onClose,
}) {
  const { mutate, isLoading, data, error } = useMutation(updateSiteByID, {
    onSuccess: () => {
      toast.success('Site updated successfully');
      onRefetchDataFn();
      onClose();
    },
    onError: (error) => {
      toast.error(`Error: ${error || 'Unknown error'}`);
    },
  });

  interface ToTokenState {
    lead: string | null;
    tokenAmount: string;
    validity: string;
    registrationDate: string;
    notes: string;
  }

  const [toToken, setToToken] = useState<ToTokenState>({
    lead: leads[0],
    tokenAmount: '',
    validity: '',
    registrationDate: '',
    notes: '',
  });

  interface ValidationErrors {
    lead?: string;
    tokenAmount?: string;
    validity?: string;
    registrationDate?: string;
    notes?: string;
  }

  const [errors, setErrors] = useState<ValidationErrors>({});

  const validate = () => {
    let validationErrors: ValidationErrors = {};
    if (!toToken.lead) validationErrors.lead = 'Lead is required';
    if (!toToken.tokenAmount.trim())
      validationErrors.tokenAmount = 'Amount is required';
    if (!toToken.validity.trim())
      validationErrors.validity = 'Validity is required';
    if (!toToken.notes.trim()) validationErrors.notes = 'Notes are required';
    if (!toToken.registrationDate.trim())
      validationErrors.registrationDate = 'Registration Date is required';

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const onUpdateSiteFn = useCallback(() => {
    if (validate()) {
      const payload = {
        status: 'Token',
        token: toToken,
        statusMetadata: { notes: toToken?.notes },
      };
      mutate({ id: siteDetails?._id, payload });
    }
  }, [toToken, siteDetails]);

  const handleInputChange = (field: keyof ToTokenState, value: string) => {
    setToToken((prevState) => ({ ...prevState, [field]: value }));
  };

  return (
    <div className="grow mt-4">
      <h2 className="text-lg text-slate-800 dark:text-slate-100 font-bold ">
        Add Token
      </h2>
      <div className="space-y-3">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="pp-label" htmlFor="token-lead">
              Token to <span className="text-rose-500">*</span>
            </label>
            <AutocompleteDropdown
              leads={leads}
              className="pp-input"
              onChange={(val) => handleInputChange('lead', val?._id)}
              defaultValue={leads[0]}
            />
            {errors.lead && (
              <p className="text-sm text-rose-500">{errors.lead}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="pp-label" htmlFor="token-amount">
              Amount <span className="text-rose-500">*</span>
            </label>
            <input
              id="token-amount"
              className="pp-input"
              type="text"
              value={toToken.tokenAmount}
              placeholder="0000"
              onChange={(e) => handleInputChange('tokenAmount', e.target.value)}
            />
            {errors.tokenAmount && (
              <p className="text-sm text-rose-500">{errors.tokenAmount}</p>
            )}
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="pp-label" htmlFor="token-validity">
              Valid days <span className="text-rose-500">*</span>
            </label>
            <input
              id="token-validity"
              className="pp-input text-right"
              type="number"
              value={toToken.validity}
              placeholder="90 Days"
              onChange={(e) => handleInputChange('validity', e.target.value)}
            />
            {errors.validity && (
              <p className="text-sm text-rose-500">{errors.validity}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="pp-label" htmlFor="">
              Registration Date <span className="text-rose-500">*</span>
            </label>

            <DatepickerComponent
              onChange={(val) => {
                val = format(val, 'dd/MM/yyyy');
                handleInputChange('registrationDate', val);
              }}
              className="pp-input"
            />
            {errors.validity && (
              <p className="text-sm text-rose-500">{errors.validity}</p>
            )}
          </div>
        </div>
        <div className="">
          <label className="pp-label" htmlFor="lead-notes">
            Notes <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="lead-notes"
            className="pp-input"
            placeholder="Add notes about the token..."
            value={toToken.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
          />
          {errors.notes && (
            <p className="text-sm text-rose-500">{errors.notes}</p>
          )}
        </div>
      </div>
      <div className="flex w-full flex-wrap justify-center space-x-2 my-4">
        <button onClick={onClose} className="btnsecondary">
          Close
        </button>
        <ButtonLoader
          onClick={onUpdateSiteFn}
          text={isLoading ? 'Saving...' : 'Save'}
          classes="btnprimary"
        />
      </div>
    </div>
  );
}
