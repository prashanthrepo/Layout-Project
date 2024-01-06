import React, { useState } from 'react';
import createLead from '@/api/create-lead';
export default function NewLead({
  siteDetails,
  setUiStatus,
  fetchLeads,
  onClose,
}) {
  const [newLead, setNewLead] = useState({
    siteId: siteDetails?._id,
    name: 'prashanth',
    phone: '909123123',
    email: 'prashanth@gmail.com',
    buyerOffer: 4000,
    sellerOffer: 3800,
    finalPrice: 3500,
    notes: 'Will pay token on 25th',
    status: 'hot',
  });

  const onNewLeadSave = () => {
    const res = createLead(newLead);
    res?.then((res) => {
      if (res) {
        setUiStatus('sitedetails');
        fetchLeads();
      }
    });
  };
  return (
    <div className="space-y-1.5 bg-indigo-50 p-3 sm:p-5 rounded-lg border border-indigo-100 ">
      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-3">
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
            defaultValue={newLead?.name}
            onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
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
            defaultValue={newLead?.phone}
            onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
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
            defaultValue={newLead?.buyerOffer}
            onChange={(e) =>
              setNewLead({ ...newLead, buyerOffer: +e.target.value })
            }
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
            defaultValue={newLead?.sellerOffer}
            onChange={(e) =>
              setNewLead({ ...newLead, sellerOffer: +e.target.value })
            }
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
          defaultValue={newLead?.notes}
          onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
        />
      </div>

      <div className="flex w-full flex-wrap justify-center space-x-2 my-4">
        <button className="btnsecondary" onClick={() => onClose()}>
          Close
        </button>
        <button className="btnprimary" onClick={() => onNewLeadSave()}>
          Save
        </button>
      </div>
    </div>
  );
}
