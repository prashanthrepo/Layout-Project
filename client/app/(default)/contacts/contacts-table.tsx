'use client';
import { getAllContacts } from '@/apicalls/contacts';
import ModalAction from '@/components/modal-action';
import { useQuery } from 'react-query';
import AddContact from './add-contact';
import { useState } from 'react';
import ModalBasic from '@/components/modal-basic';
import EditContact from './edit-contact';

export default function ContactsTable() {
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
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Contacts
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            All your contacts in one place. Add, edit, and remove users as
            needed.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={() => setAddNewContactModal(true)}
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Add Contact
          </button>
        </div>
      </div>
      <div className="-mx-4 mt-8 sm:-mx-0">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Name
              </th>

              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                Email
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                Phone Number
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data?.data?.map((contact) => (
              <tr key={contact?._id}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                  {contact.name}
                  <dl className="font-normal lg:hidden">
                    <dt className="sr-only">Title</dt>
                    <dt className="sr-only sm:hidden">Email</dt>
                    <dd className="mt-1 truncate text-gray-500 sm:hidden">
                      {contact.email}
                    </dd>
                    <dt className="sr-only sm:hidden">Phone Number</dt>
                    <dd className="mt-1 truncate text-gray-500 sm:hidden">
                      {contact.phone}
                    </dd>
                  </dl>
                </td>

                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {contact.email}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {contact.phone}
                </td>
                <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <button
                    onClick={() => {
                      setSelectedContact(contact);
                      setEditContactModal(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900">
                    Edit<span className="sr-only">, {contact.name}</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
