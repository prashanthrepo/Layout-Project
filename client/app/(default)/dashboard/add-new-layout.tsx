import ModalBasic from '@/components/modal-basic';
import React, { useEffect, useState } from 'react';

type AddNewLayoutProps = {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddNewLayout = ({ modal, setModal }: AddNewLayoutProps) => {
  return (
    <div>
      <ModalBasic isOpen={modal} setIsOpen={setModal} title="Add new layout">
        <div className="py-8 px-4 lg:px-8 2xl:px-12">
          <div className="max-w-sm mx-auto lg:max-w-none">
            <div className="space-y-6">
              <div>
                <div className="text-slate-800 dark:text-slate-100 font-semibold mb-4">
                  Payment Details
                </div>
                <div className="space-y-4">
                  {/* Card Number */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="card-nr">
                      Card Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="card-nr"
                      className="form-input w-full"
                      type="text"
                      placeholder="1234 1234 1234 1234"
                    />
                  </div>
                  {/* Expiry and CVC */}
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="card-expiry">
                        Expiry Date <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="card-expiry"
                        className="form-input w-full"
                        type="text"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="card-cvc">
                        CVC <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="card-cvc"
                        className="form-input w-full"
                        type="text"
                        placeholder="CVC"
                      />
                    </div>
                  </div>
                  {/* Name on Card */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="card-name">
                      Name on Card <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="card-name"
                      className="form-input w-full"
                      type="text"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div>
                <div className="text-slate-800 dark:text-slate-100 font-semibold mb-4">
                  Additional Details
                </div>
                <div className="space-y-4">
                  {/* Email */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="card-email">
                      Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="card-email"
                      className="form-input w-full"
                      type="email"
                      placeholder="john@company.com"
                    />
                  </div>
                  {/* Country */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="card-country">
                      Country <span className="text-rose-500">*</span>
                    </label>
                    <select id="card-country" className="form-select w-full">
                      <option>Italy</option>
                      <option>USA</option>
                      <option>United Kingdom</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-4">
                  <button className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white">
                    Pay $253.00
                  </button>
                </div>
                <div className="text-xs text-slate-500 italic text-center">
                  You'll be charged $253, including $48 for VAT in Italy
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalBasic>
    </div>
  );
};

export default AddNewLayout;
