import React, { useCallback, useEffect, useState } from 'react';
import updateSiteByID from '@/apicalls/update-site-by-id';
import AutocompleteDropdown from '@/components/AutocompleteDropdown';
import ButtonLoader from '@/components/ButtonLoader';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';

export default function ToBlocked({
  leads,
  siteDetails,
  onRefetchDataFn,
  onClose,
}) {
  const { mutate, isLoading } = useMutation(updateSiteByID, {
    onSuccess: () => {
      toast.success('Site updated successfully');
      onRefetchDataFn();
      onClose();
    },
    onError: (error) => {
      toast.error(`Error: ${error || 'Unknown error'}`);
    },
  });

  interface ToBlockedState {
    lead: string | null;
    notes: string;
  }

  const [toBlocked, setToBlocked] = useState<ToBlockedState>({
    lead: null,
    notes: '',
  });

  interface ValidationErrors {
    lead?: string;
    notes?: string;
  }

  const [errors, setErrors] = useState<ValidationErrors>({});

  const validate = () => {
    let validationErrors: ValidationErrors = {};
    if (!toBlocked.lead) validationErrors.lead = 'Lead is required';
    if (!toBlocked.notes.trim()) validationErrors.notes = 'Notes are required';

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const onUpdateSiteFn = useCallback(() => {
    if (validate()) {
      const payload = {
        status: 'Blocked',
        statusMetadata: { notes: toBlocked.notes },
      };
      mutate({ id: siteDetails?._id, payload });
    }
  }, [toBlocked, siteDetails]);

  const handleInputChange = (field: keyof ToBlockedState, value: string) => {
    setToBlocked((prevState) => ({ ...prevState, [field]: value }));
  };

  return (
    <div className="grow mt-4">
      <h2 className="text-lg text-slate-800 dark:text-slate-100 font-bold ">
        Blocked for
      </h2>
      <div className="space-y-3">
        <div className="flex space-x-4">
          <div className="w-full sm:w-1/2 ">
            <label className="pp-label" htmlFor="blocked-lead">
              Blocked to <span className="text-rose-500">*</span>
            </label>
            <AutocompleteDropdown
              className="pp-input"
              leads={leads}
              onChange={(val) => handleInputChange('lead', val?._id)}
              defaultValue={leads[0]}
            />
            {errors.lead && (
              <p className="text-sm text-rose-500">{errors.lead}</p>
            )}
          </div>
        </div>
        <div>
          <label className="pp-label" htmlFor="blocked-notes">
            Notes <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="blocked-notes"
            className="form-input w-full"
            placeholder="Notes about the site being blocked..."
            value={toBlocked.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
          />
          {errors.notes && (
            <p className="text-sm text-rose-500">{errors.notes}</p>
          )}
        </div>
      </div>
      <div className="flex w-full flex-wrap justify-center space-x-2 my-4">
        <button className="btnsecondary" onClick={onClose}>
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
