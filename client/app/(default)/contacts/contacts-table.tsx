'use client';
import { getAllContacts } from '@/apicalls/contacts';
import ModalAction from '@/components/modal-action';
import { useQuery } from 'react-query';
import AddContact from './add-contact';
import { useState } from 'react';
import ModalBasic from '@/components/modal-basic';
import EditContact from './edit-contact';
import { openCallNumber, openEmail, openWhatsapp } from '@/common/utils';
import { Capacitor } from '@capacitor/core';

export default function ContactsTable() {
  const platformType = Capacitor.getPlatform();
  const { data, isLoading, error, refetch } = useQuery(
    'allContacts',
    getAllContacts
  );
  const [selectedContact, setSelectedContact] = useState(null);
  const [addNewContactModal, setAddNewContactModal] = useState(false);
  const [editContactModal, setEditContactModal] = useState(false);
  return (
    <div className="p-4">
      <ModalBasic
        isOpen={addNewContactModal}
        setIsOpen={setAddNewContactModal}
        title="Add New Contact">
        <AddContact
          onClose={() => {
            setAddNewContactModal(false);
          }}
          refetch={refetch}
        />
      </ModalBasic>
      <ModalBasic
        isOpen={editContactModal}
        setIsOpen={setEditContactModal}
        title="Edit contact">
        <EditContact
          onClose={() => {
            setEditContactModal(false);
          }}
          refetch={refetch}
          contact={selectedContact}
        />
      </ModalBasic>
      <div className="flex space-between">
        <h1 className="grow text-base font-semibold leading-6 text-gray-900">
          Contacts
        </h1>
        <button
          onClick={() => setAddNewContactModal(true)}
          type="button"
          className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Add Contact
        </button>
      </div>
      <div className="-mx-4 mt-2 sm:-mx-0">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Name
              </th>

              {/* <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                Email
              </th> */}
              {/* <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                Phone Number
              </th> */}
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                <span className="">Action</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data?.data?.map((contact) => (
              <tr key={contact?._id}>
                <td
                  className="w-full max-w-0 py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"
                  onClick={() => {
                    setSelectedContact(contact);
                    setEditContactModal(true);
                  }}>
                  {contact.name}
                  {/* <dl className="font-normal lg:hidden">
                    <dt className="sr-only">Title</dt>
                    <dt className="sr-only sm:hidden">Email</dt>
                    <dd className="mt-1 truncate text-gray-500 sm:hidden">
                      {contact.email}
                    </dd>
                    <dt className="sr-only sm:hidden">Phone Number</dt>
                    <dd className="mt-1 truncate text-gray-500 sm:hidden">
                      {contact.phone}
                    </dd>
                  </dl> */}
                </td>

                {/* <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {contact.email}
                </td> */}
                {/* <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {contact.phone}
                </td> */}
                <td className="py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  {/* <button
                    onClick={() => {
                      setSelectedContact(contact);
                      setEditContactModal(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900">
                    Edit<span className="sr-only">, {contact.name}</span>
                  </button> */}
                  <div className="flex items-center space-x-4 ">
                    <button
                      className={`text-slate-300 hover:text-slate-400`}
                      onClick={() =>
                        openCallNumber(platformType, contact?.phone)
                      }>
                      <span className="sr-only">Call</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z"
                        />
                      </svg>
                    </button>

                    <button
                      className={`text-slate-300 hover:text-slate-400`}
                      onClick={() =>
                        openWhatsapp(platformType, contact?.phone)
                      }>
                      <span className="sr-only">Message</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                        />
                      </svg>
                    </button>

                    <button
                      className={`text-slate-300 hover:text-slate-400`}
                      onClick={() => openEmail(platformType, contact?.email)}>
                      <span className="sr-only">Email</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
