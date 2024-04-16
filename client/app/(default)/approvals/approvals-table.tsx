'use client';
import { useMutation, useQuery } from 'react-query';
import { redirect } from 'next/navigation';
import { getAllApprovals } from '@/apicalls/approvals';
import { useEffect, useState } from 'react';
import AddEditApproval from './add-edit-approval';
import { useUser } from '@/hooks/useUserHook';
export default function ApprovalsTable() {
  const {
    mutate: allApprovalsMutate,
    data,
    error,
    isLoading,
  } = useMutation(getAllApprovals);

  const { user } = useUser();
  const [openModal, setOpenModal] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState({} as any);
  const [modalType, setModalType] = useState('new');
  const addNewApprovalFn = (type) => {
    setSelectedApproval({});
    setOpenModal(true);
    setModalType(type);
  };
  const onEditClick = (item) => {
    setSelectedApproval(item);
    setOpenModal(true);
    setModalType('edit');
  };

  useEffect(() => {
    allApprovalsMutate();
  }, []);

  useEffect(() => {
    if (user?.role && user?.role !== 'Admin') {
      redirect('/');
    }
  }, [user?.role]);
  return (
    <div className="p-4">
      <div className="sm:flex sm:items-center">
        <div className="flex w-full justify-between">
          <div>
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Approvals
            </h1>
            <p className="text-sm text-gray-500">List of all approvals</p>
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                addNewApprovalFn('new');
              }}
              className="btnprimary">
              Add Approval
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className=" w-auto sm:w-[15%] py-3.5 pl-0 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Name
              </th>
              {/* <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                Type
              </th> */}
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                Description
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"></th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data?.data?.map((item, idx) => (
              <tr key={idx}>
                <td className="w-full max-w-0 py-4 pl-0 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                  {item?.name}
                  <dl className="font-normal lg:hidden">
                    <dt className="sr-only">Title</dt>
                    <dt className="sr-only sm:hidden">Email</dt>
                    <dd className="mt-1 truncate text-gray-500 sm:hidden">
                      {item?.description}
                    </dd>
                  </dl>
                </td>

                {/* <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {item?.type}
                </td> */}
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {item?.description}
                </td>
                <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <button
                    onClick={() => onEditClick(item)}
                    className="text-indigo-600 hover:text-indigo-900">
                    Edit<span className="sr-only">, {item?.name}</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddEditApproval
        openModal={openModal}
        setOpenModal={setOpenModal}
        allApprovalsMutate={allApprovalsMutate}
        selectedApproval={selectedApproval}
        modalType={modalType}
      />
    </div>
  );
}
