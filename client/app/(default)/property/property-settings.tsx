import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState, ChangeEvent } from 'react';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/20/solid';
import ModalAction from '@/components/modal-action';
import SkeletonLoader from '@/components/SkeletonLoader';
import MultiSelectDropdown from '@/components/MultiSelectDropdown';
import { useMutation } from 'react-query';
import { getAllApprovals } from '@/apicalls/approvals';

export default function PropertySettings({ open, setOpen, property }) {
  const {
    mutate: allApprovalsMutate,
    data,
    error,
    isLoading,
  } = useMutation(getAllApprovals);
  const [propertyDetails, setPropertyDetails] = useState({
    name: '',
    location: { lat: '', long: '' },
  });
  const [selectedApprovals, setSelectedApprovals] = useState([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const validate = () => {
    let validationErrors: { [key: string]: string } = {};
    if (!propertyDetails.name.trim())
      validationErrors.name = 'Name is required';
    if (!propertyDetails.location.lat.trim())
      validationErrors.location = 'Location is required';
    else if (!propertyDetails.location.long.trim())
      validationErrors.location = 'Location is required';

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };
  const handleInputChange = (
    field: string,
    value: string | number | object
  ) => {
    setPropertyDetails((prev) => ({ ...prev, [field]: value }));
  };
  useEffect(() => {
    setPropertyDetails({
      name: property?.name || '',
      location: property?.location || { lat: '', long: '' },
    });
    allApprovalsMutate();
  }, [property]);
  return (
    <div className="m-1.5">
      <ModalAction isOpen={open} setIsOpen={setOpen}>
        <SkeletonLoader
          type="SiteDetails"
          length={3}
          isLoading={false}
          isData={property ? true : false}
          noDataText="Something went wrong. Please try after sometime.">
          <div className="mb-5 ">
            <div className="flex justify-between mb-4 md:space-y-0 space-x-2">
              <div className="flex items-start space-x-3 ">
                <div className={'bg-indigo-500 rounded-md w-10 h-10'}></div>
                <div className="">
                  <span className="flex font-semibold text-slate-800 dark:text-slate-100 leading-5">
                    <h3 className="text-md font-semibold">Property Details</h3>
                  </span>
                  <span className={'text-xm'}>{property?.name}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  className="btn bg-white dark:bg-slate-800 border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                  onClick={() => setOpen(false)}>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                {/* {renderButtons(uiStatus)} */}
                {/* {Capacitor.isNativePlatform() && (
                    <ShareButton onClick={() => onShare()} />
                  )} */}
              </div>
            </div>
            <hr className=" border-b-0 mb-3 border-gray-200" />
            <div className="space-y-5">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label htmlFor="property-name" className="pp-label">
                    Proeprty name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="property-name"
                    type="text"
                    className="pp-input"
                    placeholder="Property name"
                    value={propertyDetails.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleInputChange('name', e.target.value)
                    }
                  />
                  {errors.name && (
                    <p className="text-sm text-rose-500">{errors.name}</p>
                  )}
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label htmlFor="property-location" className="pp-label">
                    Location (Lat, Long)
                  </label>
                  <input
                    id="property-location"
                    type="text"
                    className="pp-input"
                    placeholder="12.435, 77.345"
                    value={`${propertyDetails.location.lat}, ${propertyDetails.location.long}`}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleInputChange('location', {
                        lat: e.target.value.split(',')[0],
                        long: e.target.value.split(',')[1],
                      })
                    }
                  />
                  {errors.email && (
                    <p className="text-sm text-rose-500">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label htmlFor="property-location" className="pp-label">
                    Approvals
                  </label>
                  <MultiSelectDropdown
                    className="pp-input"
                    options={data?.data}
                    onSelect={(selected) => {
                      setSelectedApprovals(selected);
                    }}
                  />
                </div>
              </div>
              <div className="flex space-x-4 bg-indigo-50 p-4 rounded-md border border-indigo-100">
                <div className="space-y-5">
                  {selectedApprovals?.map((approval, index) => (
                    <div className="relative flex items-start" key={index}>
                      <div className="flex h-6 items-center">
                        <input
                          id="comments"
                          aria-describedby="comments-description"
                          name="comments"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="ml-3 text-sm leading-6">
                        <label
                          htmlFor="comments"
                          className="font-medium text-gray-900">
                          {approval.name}
                        </label>
                        <p id="comments-description" className="text-gray-500">
                          {approval.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SkeletonLoader>
      </ModalAction>
    </div>
  );
}
