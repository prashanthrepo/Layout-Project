import React, { useState, ChangeEvent } from 'react';
import { editContact } from '@/apicalls/contacts';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';

export default function EditContact({ onClose, refetch, contact }) {
  const { mutate, isLoading } = useMutation(editContact, {
    onSuccess: () => {
      toast.success('Contact updated successfully');
      onClose();
      refetch();
    },
    onError: (error: any) => {
      toast.error(
        `Error: ${error?.response?.data?.message || 'Unknown error'}`
      );
    },
  });

  const [newContact, setNewContact] = useState({
    name: contact.name,
    phone: contact.phone,
    email: contact.email,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    let validationErrors: { [key: string]: string } = {};
    if (!newContact.name.trim()) validationErrors.name = 'Name is required';
    if (!newContact.phone.trim())
      validationErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(newContact.phone.trim()))
      validationErrors.phone = 'Invalid phone number, must be 10 digits';
    if (!newContact.email.trim()) validationErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(newContact.email.trim()))
      validationErrors.email = 'Email is invalid';

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      mutate({ id: contact._id, data: newContact });
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setNewContact((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grow m-4">
      <div className="space-y-3">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="contact-name" className="pp-label">
              Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              className="pp-input"
              placeholder="Full name"
              value={newContact.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange('name', e.target.value)
              }
            />
            {errors.name && (
              <p className="text-sm text-rose-500">{errors.name}</p>
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="contact-phone" className="pp-label">
              Phone number <span className="text-rose-500">*</span>
            </label>
            <input
              id="contact-phone"
              type="text"
              className="pp-input"
              placeholder="9876543210"
              value={newContact.phone}
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
            <label htmlFor="contact-email" className="pp-label">
              Email <span className="text-rose-500">*</span>
            </label>
            <input
              id="contact-email"
              type="text"
              className="pp-input"
              placeholder="user@gmail.com"
              value={newContact.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange('email', e.target.value)
              }
            />
            {errors.email && (
              <p className="text-sm text-rose-500">{errors.email}</p>
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
