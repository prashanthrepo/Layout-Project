import React, { useCallback, useEffect, useState } from 'react';
import updateSiteByID from '@/apicalls/update-site-by-id';
import ButtonLoader from '@/components/ButtonLoader';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import AutocompleteDropdown from '@/components/AutocompleteDropdown';

export default function ToSold({
  leads,
  siteDetails,
  onRefetchDataFn,
  onClose,
}) {
  const { mutate, isLoading } = useMutation(updateSiteByID, {
    onSuccess: (data) => {
      toast.success('Site updated successfully');
      onRefetchDataFn(data?.data);
      onClose();
    },
    onError: (error) => {
      toast.error(`Error: ${error || 'Unknown error'}`);
    },
  });

  interface ToSoldState {
    lead: string | null;
    amount: string;
    notes: string;
  }

  const [toSold, setToSold] = useState<ToSoldState>({
    lead: leads[0],
    amount: '',
    notes: '',
  });

  interface ValidationErrors {
    lead?: string;
    amount?: string;
    notes?: string;
  }

  const [errors, setErrors] = useState<ValidationErrors>({});

  const validate = () => {
    let validationErrors: ValidationErrors = {};
    if (!toSold.lead) validationErrors.lead = 'Lead is required';
    if (!toSold.amount.trim()) validationErrors.amount = 'Amount is required';
    if (!toSold.notes.trim()) validationErrors.notes = 'Notes are required';

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const onUpdateSiteFn = useCallback(() => {
    if (validate()) {
      const payload = {
        status: 'Sold',
        statusMetadata: toSold,
      };
      mutate({ id: siteDetails?._id, payload });
    }
  }, [toSold, siteDetails]);

  const handleInputChange = (field: keyof ToSoldState, value: string) => {
    setToSold((prevState) => ({ ...prevState, [field]: value }));
  };

  return (
    <div className="grow mt-4">
      <h2 className="text-lg text-slate-800 font-bold ">Sold To</h2>
      <div className="space-y-3">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="pp-label" htmlFor="sold-lead">
              Sold to <span className="text-rose-500">*</span>
            </label>
            <AutocompleteDropdown
              className="pp-input"
              options={leads}
              onChange={(val) => handleInputChange('lead', val?._id)}
              defaultValue={leads[0]}
            />
            {errors.lead && (
              <p className="text-sm text-rose-500">{errors.lead}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="pp-label" htmlFor="sold-amount">
              Amount <span className="text-rose-500">*</span>
            </label>
            <input
              id="sold-amount"
              className="pp-input"
              type="text"
              defaultValue={toSold?.amount}
              placeholder="0000"
              onChange={(e) => handleInputChange('amount', e.target.value)}
            />
            {errors.amount && (
              <p className="text-sm text-rose-500">{errors.amount}</p>
            )}
          </div>
        </div>
        <div className="">
          <label className="pp-label" htmlFor="sold-notes">
            Notes <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="sold-notes"
            className="pp-input"
            placeholder="Additional notes..."
            defaultValue={toSold?.notes}
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
