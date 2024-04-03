import React, { useState, ChangeEvent } from 'react';
import createLead from '@/apicalls/create-lead';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';

interface NewLeadProps {
  siteDetails: any;
  setUiStatus: (status: string) => void;
  fetchLeads: () => void;
  onClose: () => void;
}
export default function NewLead({
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
    name: '',
    phone: '',
    email: '',
    buyerOffer: '',
    sellerOffer: '',
    finalPrice: '',
    notes: '',
    status: 'hot',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    let validationErrors: { [key: string]: string } = {};
    if (!newLead.name.trim()) validationErrors.name = 'Name is required';
    if (!newLead.phone.trim())
      validationErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(newLead.phone.trim()))
      validationErrors.phone = 'Invalid phone number, must be 10 digits';
    if (!newLead.email.trim()) validationErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(newLead.email.trim()))
      validationErrors.email = 'Email is invalid';
    if (!newLead.buyerOffer)
      validationErrors.buyerOffer = 'Buyer offer is required';
    else if (
      isNaN(Number(newLead.buyerOffer)) ||
      Number(newLead.buyerOffer) <= 0
    )
      validationErrors.buyerOffer =
        'Invalid buyer offer, must be a positive number';
    if (!newLead.sellerOffer)
      validationErrors.sellerOffer = 'Seller offer is required';
    else if (
      isNaN(Number(newLead.sellerOffer)) ||
      Number(newLead.sellerOffer) <= 0
    )
      validationErrors.sellerOffer =
        'Invalid seller offer, must be a positive number';
    if (!newLead.notes.trim()) validationErrors.notes = 'Notes are required';

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSave = () => {
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
          <div className="flex-1">
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
          </div>
          <div className="flex-1">
            <label htmlFor="lead-phone" className="pp-label">
              Phone number <span className="text-rose-500">*</span>
            </label>
            <input
              id="lead-phone"
              type="text"
              className="pp-input"
              placeholder="9876543210"
              value={newLead.phone}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange('phone', e.target.value)
              }
            />
            {errors.phone && (
              <p className="text-sm text-rose-500">{errors.phone}</p>
            )}
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
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
          </div>
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
        </div>
        <div className="flex space-x-4">
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
          <div className="flex-1">
            <label htmlFor="lead-final-price" className="pp-label">
              Final Price
            </label>
            <input
              id="lead-final-price"
              type="number"
              className="pp-input"
              placeholder="0000"
              value={newLead.finalPrice}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange('finalPrice', Number(e.target.value))
              }
            />
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
