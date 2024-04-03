import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';

interface ModalActionProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  modalSize?: string;
  title?: string;
}

export default function ModalAction({
  children,
  isOpen,
  setIsOpen,
  modalSize = 'max-w-3xl',
  title = 'Modal Title',
}: ModalActionProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
        <div className="fixed inset-0 " />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full ml-20 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full">
                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-14 shadow-xl">
                    {/* <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          Panel title
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => setIsOpen(false)}>
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div> */}
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {children}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    // <Transition appear show={isOpen}>
    //   <Dialog as="div" onClose={() => setIsOpen(false)}>
    //     <Transition.Child
    //       className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
    //       enter="transition ease-out duration-200"
    //       enterFrom="opacity-0"
    //       enterTo="opacity-100"
    //       leave="transition ease-out duration-100"
    //       leaveFrom="opacity-100"
    //       leaveTo="opacity-0"
    //       aria-hidden="true"
    //     />
    //     <Transition.Child
    //       className="fixed inset-0 z-50 overflow-hidden flex top-40 sm:top-0 sm:items-center sm:my-4 justify-center  sm:px-6"
    //       enter="transition ease-in-out duration-200"
    //       enterFrom="opacity-0 translate-y-4"
    //       enterTo="opacity-100 translate-y-0"
    //       leave="transition ease-in-out duration-200"
    //       leaveFrom="opacity-100 translate-y-0"
    //       leaveTo="opacity-0 translate-y-4">
    //       <Dialog.Panel
    //         className={`bg-white dark:bg-slate-800 rounded-t-3xl  sm:rounded-lg sm:rounded-t-lg shadow-lg overflow-auto w-full max-h-full ${modalSize}`}>
    //         <div className="p-6 h-full">
    //           <div className="relative h-full">
    //             {/* <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-700">
    //               <div className="flex justify-between items-center">
    //                 <Dialog.Title className="font-semibold text-slate-800 dark:text-slate-100">
    //                   {title}
    //                 </Dialog.Title>
    //                 <button
    //                   className="text-slate-400 dark:text-slate-500 hover:text-slate-500 dark:hover:text-slate-400"
    //                   onClick={(e) => {
    //                     e.stopPropagation();
    //                     setIsOpen(false);
    //                   }}>
    //                   <div className="sr-only">Close</div>
    //                   <svg className="w-4 h-4 fill-current">
    //                     <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
    //                   </svg>
    //                 </button>
    //               </div>
    //             </div> */}
    //             {children}
    //           </div>
    //         </div>
    //       </Dialog.Panel>
    //     </Transition.Child>
    //   </Dialog>
    // </Transition>
  );
}
