import React, { useState, useCallback, ChangeEvent } from 'react';
import { useMutation } from 'react-query';
import updateSiteByID from '@/apicalls/update-site-by-id';
import toast from 'react-hot-toast';
import ButtonLoader from '@/components/ButtonLoader';

interface SiteDetails {
  dimensions: string;
  area: string;
  customPrice: string;
  defaultPrice: string;
}

export default function EditSite({ siteDetails, setSiteDetails, onClose }) {
  const [editDetails, setEditDetails] = useState<SiteDetails>({
    dimensions: '30ft x 40ft',
    area: '1200sqft',
    customPrice: '4000',
    defaultPrice: '4000',
  });

  const [errors, setErrors] = useState<Partial<SiteDetails>>({});
  const { mutate, isLoading } = useMutation(updateSiteByID, {
    onSuccess: (res) => {
      setSiteDetails(res?.data);
      toast.success('Site details updated successfully');
      onClose();
    },
    onError: (error) => {
      toast.error(`Error: ${error || 'Unknown error'}`);
    },
  });

  const validate = () => {
    let validationErrors: Partial<SiteDetails> = {};
    if (!editDetails.dimensions.trim())
      validationErrors.dimensions = 'Dimensions are required';
    if (!editDetails.area.trim()) validationErrors.area = 'Area is required';
    if (!editDetails.customPrice.trim())
      validationErrors.customPrice = 'Custom price is required';
    if (!editDetails.defaultPrice.trim()) setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const onUpdateSiteFn = useCallback(() => {
    if (validate()) {
      const payload = {
        ...editDetails,
      };
      mutate({ id: siteDetails?._id, payload });
    }
  }, [editDetails, siteDetails?._id]);

  const handleInputChange = (field: keyof SiteDetails, value: string) => {
    setEditDetails((prevState) => ({ ...prevState, [field]: value }));
  };

  return (
    <div className="grow mt-4">
      <h2 className="text-lg text-slate-800 dark:text-slate-100 font-bold ">
        Edit Site Details
      </h2>
      <div className="space-y-3">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="pp-label" htmlFor="site-dimensions">
              Dimensions <span className="text-rose-500">*</span>
            </label>
            <input
              id="site-dimensions"
              className="pp-input"
              type="text"
              defaultValue={editDetails?.dimensions}
              placeholder="30ft x 40ft"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange('dimensions', e.target.value)
              }
            />
            {errors.dimensions && (
              <p className="text-sm text-rose-500">{errors.dimensions}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="pp-label" htmlFor="site-area">
              Area <span className="text-rose-500">*</span>
            </label>
            <input
              id="site-area"
              className="pp-input"
              type="text"
              defaultValue={editDetails?.area}
              placeholder="1200sqft"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange('area', e.target.value)
              }
            />
            {errors.area && (
              <p className="text-sm text-rose-500">{errors.area}</p>
            )}
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="pp-label" htmlFor="site-custom-price">
              Custom Price <span className="text-rose-500">*</span>
            </label>
            <input
              id="site-custom-price"
              className="pp-input"
              type="text"
              defaultValue={editDetails?.customPrice}
              placeholder="0000"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange('customPrice', e.target.value)
              }
            />
            {errors.customPrice && (
              <p className="text-sm text-rose-500">{errors.customPrice}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="pp-label" htmlFor="site-default-price">
              Default Price <span className="text-rose-500">*</span>
            </label>
            <input
              id="site-default-price"
              className="pp-input"
              type="text"
              defaultValue={editDetails?.defaultPrice}
              placeholder="0000"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange('defaultPrice', e.target.value)
              }
            />
            {errors.defaultPrice && (
              <p className="text-sm text-rose-500">{errors.defaultPrice}</p>
            )}
          </div>
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
