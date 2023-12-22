import React from 'react';

export default function NewLead({ setNewLead }) {
  return (
    <div className="px-4 py-3 space-y-1.5">
      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-3 border-b border-slate-200 pb-1">
        New Lead
      </h3>
      <div className="flex space-x-4">
        <div className="flex-1">
          <label
            className="block text-xs sm:text-sm font-medium"
            htmlFor="lead-name">
            Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="lead-name"
            className="form-input w-full"
            type="text"
            placeholder="prashanth"
          />
        </div>
        <div className="flex-1">
          <label
            className="block text-xs sm:text-sm font-medium"
            htmlFor="lead-phone">
            Phone <span className="text-rose-500">*</span>
          </label>
          <input
            id="lead-phone"
            className="form-input w-full"
            type="text"
            placeholder="+91 9876543210"
          />
        </div>
      </div>
      {/* Expiry and CVC */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <label
            className="block text-xs sm:text-sm font-medium"
            htmlFor="lead-buyer-price">
            Buyer price <span className="text-rose-500">*</span>
          </label>
          <input
            id="lead-buyer-price"
            className="form-input w-full text-right"
            type="number"
            placeholder="0"
          />
        </div>
        <div className="flex-1">
          <label
            className="block text-xs sm:text-sm font-medium"
            htmlFor="lead-seller-price">
            Seller Price <span className="text-rose-500">*</span>
          </label>
          <input
            id="lead-seller-price"
            className="form-input w-full text-right"
            type="number"
            placeholder="0"
          />
        </div>
      </div>
      {/* Name on Card */}
      <div>
        <label
          className="block text-xs sm:text-sm font-medium"
          htmlFor="lead-notes">
          Notes <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="lead-notes"
          className="form-input w-full"
          placeholder="..."
        />
      </div>

      <div className="flex w-full flex-wrap justify-center space-x-2 my-4">
        <button
          className="py-1.5 sm:py-3 btn bg-slate-50 hover:bg-slate-100 text-black w-20  sm:w-40 border border-gray-300 rounded-lg"
          onClick={() => setNewLead(false)}>
          Cancel
        </button>
        <button
          className="py-1.5 sm:py-3 btn bg-indigo-500 hover:bg-indigo-600 text-white w-20 sm:w-40 border-indigo-500 rounded-lg"
          //   onClick={ () => onUpdateSiteFn() }
        >
          Save
        </button>
      </div>
    </div>
  );
}
