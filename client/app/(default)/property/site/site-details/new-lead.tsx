import React, { useState, ChangeEvent } from 'react';
import createLead from '@/apicalls/create-lead';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import AutocompleteDropdown from '@/components/AutocompleteDropdown';

interface NewLeadProps {
  contacts: any;
  siteDetails: any;
  setUiStatus: (status: string) => void;
  fetchLeads: () => void;
  onClose: () => void;
}
export default function NewLead({
  contacts,
  siteDetails,
  setUiStatus,
  fetchLeads,
  onClose,
}: NewLeadProps) {
  const { mutate, isLoading } = useMutation(createLead, {
    onSuccess: () => {
      toast.success('Lead created successfully');
      setUiStatus('sitedetails');
      fetchLeads();
      onClose();
    },
    onError: (error: any) => {
      toast.error(
        `Error: ${error?.response?.data?.message || 'Unknown error'}`
      );
    },
  });

  const [newLead, setNewLead] = useState({
    siteId: siteDetails?._id,
    contactId: '',
    buyerOffer: '',
    sellerOffer: '',
    notes: '',
    status: 'hot',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const { contactId, buyerOffer, sellerOffer, notes } = newLead;
    let validationErrors: { [key: string]: string } = {};
    if (!contactId) validationErrors.contactId = 'Contact is required';
    if (!buyerOffer) validationErrors.buyerOffer = 'Buyer offer is required';
    else if (isNaN(Number(buyerOffer)) || Number(buyerOffer) <= 0)
      validationErrors.buyerOffer =
        'Invalid buyer offer, must be a positive number';
    if (!sellerOffer) validationErrors.sellerOffer = 'Seller offer is required';
    else if (isNaN(Number(sellerOffer)) || Number(sellerOffer) <= 0)
      validationErrors.sellerOffer =
        'Invalid seller offer, must be a positive number';
    if (!notes.trim()) validationErrors.notes = 'Notes are required';

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSave = () => {
    console.log('newLead :>> ', newLead);
    if (validate()) {
      mutate(newLead);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setNewLead((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grow mt-4">
      <h2 className="text-lg text-slate-800 dark:text-slate-100 font-bold ">
        Add Lead
      </h2>
      <div className="space-y-3">
        <div className="flex space-x-4">
          {/* <div className="flex-1">
            <label htmlFor="lead-name" className="pp-label">
              Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="lead-name"
              type="text"
              className="pp-input"
              placeholder="Full name"
              value={newLead.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange('name', e.target.value)
              }
            />
            {errors.name && (
              <p className="text-sm text-rose-500">{errors.name}</p>
            )}
          </div> */}
          <div className="flex-1">
            <label className="pp-label" htmlFor="token-lead">
              Contact Name <span className="text-rose-500">*</span>
            </label>
            <AutocompleteDropdown
              options={contacts}
              className="pp-input"
              onChange={(val) => {
                console.log('val :>> ', val);
                setNewLead((prev) => ({
                  ...prev,
                  contactId: val._id,
                }));
              }}
              defaultValue={[{}]}
            />
            {errors.lead && (
              <p className="text-sm text-rose-500">{errors.lead}</p>
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="lead-phone" className="pp-label">
              Phone number / Email
            </label>
            <input
              id="lead-phone"
              type="text"
              className="pp-input pointer-events-none disabled:text-gray-500"
              placeholder="9876543210"
              value={contacts?.find((c) => c._id === newLead.contactId)?.phone}
              disabled
              onChange={(e: ChangeEvent<HTMLInputElement>) => {}}
            />
            {errors.phone && (
              <p className="text-sm text-rose-500">{errors.phone}</p>
            )}
          </div>
        </div>
        <div className="flex space-x-4">
          {/* <div className="flex-1">
            <label htmlFor="lead-email" className="pp-label">
              Email
            </label>
            <input
              id="lead-email"
              type="text"
              className="pp-input"
              placeholder="user@gmail.com"
              value={newLead.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange('email', e.target.value)
              }
            />
            {errors.email && (
              <p className="text-sm text-rose-500">{errors.email}</p>
            )}
          </div> */}
          <div className="flex-1">
            <label htmlFor="lead-buyer-offer" className="pp-label">
              Buyer Offer
            </label>
            <input
              id="lead-buyer-offer"
              type="number"
              className="pp-input"
              placeholder="0000"
              value={newLead.buyerOffer}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange('buyerOffer', Number(e.target.value))
              }
            />
            {errors.buyerOffer && (
              <p className="text-sm text-rose-500">{errors.buyerOffer}</p>
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="lead-seller-offer" className="pp-label">
              Seller Offer
            </label>
            <input
              id="lead-seller-offer"
              type="number"
              className="pp-input"
              placeholder="0000"
              value={newLead.sellerOffer}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange('sellerOffer', Number(e.target.value))
              }
            />
            {errors.sellerOffer && (
              <p className="text-sm text-rose-500">{errors.sellerOffer}</p>
            )}
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="lead-notes" className="pp-label">
              Notes
            </label>
            <textarea
              id="lead-notes"
              className="form-textarea w-full"
              placeholder="Notes about the lead..."
              value={newLead.notes}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                handleInputChange('notes', e.target.value)
              }
            />
            {errors.notes && (
              <p className="text-sm text-rose-500">{errors.notes}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full flex-wrap justify-center space-x-2 my-4">
        <button className="btnsecondary" onClick={onClose}>
          Close
        </button>
        <button
          className="btnprimary"
          onClick={handleSave}
          disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
}
