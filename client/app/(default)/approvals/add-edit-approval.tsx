import { Fragment, useEffect, useRef, useState, ChangeEvent } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useMutation, useQuery } from 'react-query';
import { addNewApproval, updateApproval } from '@/apicalls/approvals';
import ButtonLoader from '@/components/ButtonLoader';
import toast from 'react-hot-toast';

export default function AddEditApproval({
  openModal,
  setOpenModal,
  allApprovalsMutate,
  selectedApproval,
  modalType,
}) {
  const {
    mutate: newApprovalMutate,
    isLoading,
    data,
    error,
  } = useMutation(addNewApproval, {
    onSuccess: () => {
      toast.success('Approval created successfully');
      allApprovalsMutate();
      setOpenModal(false);
    },
    onError: (error: any) => {
      toast.error(
        `Error: ${error?.response?.data?.message || 'Unknown error'}`
      );
    },
  });
  const { mutate: updateApprovalMutate, isLoading: isUpdateLoading } =
    useMutation(updateApproval, {
      onSuccess: () => {
        toast.success('Approval updated successfully');
        allApprovalsMutate();
        setOpenModal(false);
      },
      onError: (error: any) => {
        toast.error(
          `Error: ${error?.response?.data?.message || 'Unknown error'}`
        );
      },
    });
  const [open, setOpen] = useState(false);
  const [currentApproval, setCurrentApproval] = useState({
    name: '',
    description: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const cancelButtonRef = useRef(null);
  const handleInputChange = (key: string, value: string) => {
    setCurrentApproval((prev) => ({ ...prev, [key]: value }));
  };
  const validate = () => {
    let validationErrors: { [key: string]: string } = {};
    if (!currentApproval.name.trim())
      validationErrors.name = 'Name is required';
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };
  const onSaveFn = () => {
    if (validate()) {
      if (modalType === 'new') {
        newApprovalMutate(currentApproval);
      } else {
        updateApprovalMutate({
          id: selectedApproval?._id,
          payload: currentApproval,
        });
      }
    }
  };

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  useEffect(() => {
    if (Object.keys(selectedApproval).length > 0) {
      const temp = {
        name: selectedApproval.name,
        description: selectedApproval.description,
      };
      setCurrentApproval(temp);
    } else {
      setCurrentApproval({
        name: '',
        description: '',
      });
    }
  }, [selectedApproval]);
  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900 mb-5">
                        Add New Approval
                      </Dialog.Title>
                      <div className="space-y-3">
                        <div className="flex space-x-4">
                          <div className="flex-1">
                            <label htmlFor="approval-name" className="pp-label">
                              Name <span className="text-rose-500">*</span>
                            </label>
                            <input
                              id="approval-name"
                              type="text"
                              className="pp-input"
                              placeholder="Approval name"
                              value={currentApproval.name}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                handleInputChange('name', e.target.value)
                              }
                            />
                            {errors.name && (
                              <p className="text-sm text-rose-500">
                                {errors.name}
                              </p>
                            )}
                          </div>
                          {/* <div className="flex-1">
                            <label
                              htmlFor="approval-phone"
                              className="pp-label">
                              Type <span className="text-rose-500">*</span>
                            </label>
                            <input
                              id="approval-phone"
                              type="text"
                              className="pp-input"
                              placeholder="Type of approval"
                              value={currentApproval.type}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                handleInputChange('type', e.target.value)
                              }
                            />
                            {errors.type && (
                              <p className="text-sm text-rose-500">
                                {errors.type}
                              </p>
                            )}
                          </div> */}
                        </div>
                        <div className="flex space-x-4">
                          <div className="flex-1">
                            <label htmlFor="lead-desc" className="pp-label">
                              Description
                            </label>
                            <textarea
                              id="approval-desc"
                              className="form-textarea w-full h-20"
                              placeholder="Enter description here..."
                              value={currentApproval.description}
                              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                handleInputChange('description', e.target.value)
                              }
                            />
                            {errors.description && (
                              <p className="text-sm text-rose-500">
                                {errors.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full flex-wrap justify-center space-x-2 my-4">
                    <button
                      className="btnsecondary"
                      onClick={() => {
                        setOpenModal(false);
                      }}>
                      Close
                    </button>
                    {/* <button
                      className="btnprimary"
                      onClick={() => onSaveFn()}
                      //   disabled={ isLoading }
                    >
                      Save
                                      </button> */}
                    {modalType === 'new' && (
                      <ButtonLoader
                        onClick={() => {
                          onSaveFn();
                        }}
                        text={isLoading ? 'Saving...' : 'Save'}
                      />
                    )}
                    {modalType === 'edit' && (
                      <ButtonLoader
                        onClick={() => {
                          onSaveFn();
                        }}
                        text={isUpdateLoading ? 'Updating...' : 'Update'}
                      />
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
