import ModalAction from '@/components/modal-action';
import getSiteByID from '@/api/get-site-by-id';
import updateSiteByID from '@/api/update-site-by-id';
import { Menu, Transition } from '@headlessui/react';
import flag from '@/public/images/flag.svg';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import StatusChip from '../../components-library/StatusChip';
import { findDifferencesBwObjects, statusColors } from '@/common/utils';
import SiteTabs from './tabs/site-tabs';
import { siteStatus } from '@/common/mockdata';

export default function SiteDetails({
  selectedSite,
  openModal,
  setOpenModal,
  onSiteStatusChange,
}) {
  const [siteDetails, setSiteDetails] = useState(null);
  const [tempSiteDetails, setTempSiteDetails] = useState(null);
  const [edit, setEdit] = useState(false);
  const onUpdateSiteFn = useCallback(() => {
    const temp = findDifferencesBwObjects(tempSiteDetails, siteDetails);
    const res = updateSiteByID(siteDetails?._id, temp);
    res?.then((res) => {
      if (res) {
        setSiteDetails(res?.site);
        onSiteStatusChange(res?.site?.number, res?.site?.status);
        setOpenModal(false);
      }
    });
  }, [siteDetails, tempSiteDetails]);

  const getSite = useCallback(() => {
    if (selectedSite?._id) {
      const res = getSiteByID(selectedSite?._id);
      res?.then((res) => {
        if (res) {
          setSiteDetails(res);
          setTempSiteDetails(res);
        }
      });
    }
  }, [selectedSite?._id]);

  useEffect(() => {
    getSite();
  }, [selectedSite?._id]);

  return (
    <div className="m-1.5">
      <ModalAction isOpen={openModal} setIsOpen={setOpenModal}>
        <div className="grid content-between h-full">
          <div>
            <div className="mb-5 ">
              <div className="flex justify-between  md:space-y-0 space-x-2">
                <div className="flex items-start space-x-3">
                  <div
                    className={
                      ' w-12 h-12 rounded-xl flex justify-center items-center ' +
                      statusColors(siteDetails?.status)
                    }>
                    <Image
                      className="w-8 h-8 rounded-full"
                      src={flag}
                      alt="flag"
                    />
                  </div>
                  <div>
                    <span className="inline-flex font-semibold text-slate-800 dark:text-slate-100">
                      Site No : {siteDetails?.number}
                    </span>
                    <div className="text-sm">{siteDetails?.status}</div>
                  </div>
                </div>
                <div>
                  <StatusChip status={siteDetails?.status} />
                </div>
              </div>
            </div>
            <div className="text-sm mb-3">
              <hr className=" border-b-0 mb-3 border-gray-200" />
              <div className="flex justify-between">
                <div className="font-medium text-slate-800 dark:text-slate-100 mb-3">
                  Site Details
                </div>
                {!edit && (
                  <a
                    className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                    href="#0"
                    onClick={() => setEdit(!edit)}>
                    Edit
                  </a>
                )}
              </div>
              <ul className="space-y-2 mb-5">
                <li className="flex items-center">
                  <span className="text-sm text-slate-800 dark:text-slate-100 font-medium pr-2">
                    Status :
                  </span>
                  {edit ? (
                    <Menu as="div" className="relative inline-flex">
                      {({ open }) => (
                        <>
                          <Menu.Button
                            className="btn py-1 justify-between min-w-[11rem] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200"
                            aria-label="Select date range">
                            <span className="flex items-center">
                              <span>{siteDetails?.status}</span>
                            </span>
                            <svg
                              className="shrink-0 ml-1 fill-current text-slate-400"
                              width="11"
                              height="7"
                              viewBox="0 0 11 7">
                              <path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" />
                            </svg>
                          </Menu.Button>
                          <Transition
                            className="z-10 absolute top-full right-0 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1"
                            enter="transition ease-out duration-100 transform"
                            enterFrom="opacity-0 -translate-y-2"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-out duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                            <Menu.Items className="font-medium text-sm text-slate-600 dark:text-slate-300 focus:outline-none">
                              {siteStatus.map((option, optionIndex) => (
                                <Menu.Item key={optionIndex}>
                                  {({ active }) => (
                                    <button
                                      className={`flex items-center w-full py-1 px-3 cursor-pointer ${
                                        active
                                          ? 'bg-slate-50 dark:bg-slate-700/20'
                                          : ''
                                      } ${
                                        option.type === siteDetails?.status &&
                                        'text-indigo-500'
                                      }`}
                                      onClick={() => {
                                        setSiteDetails({
                                          ...siteDetails,
                                          status: option.type,
                                        });
                                      }}>
                                      <svg
                                        className={`shrink-0 mr-2 fill-current text-indigo-500 ${
                                          option.type !== siteDetails?.status &&
                                          'invisible'
                                        }`}
                                        width="12"
                                        height="9"
                                        viewBox="0 0 12 9">
                                        <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
                                      </svg>
                                      <span>{option?.type}</span>
                                    </button>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  ) : (
                    <StatusChip status={siteDetails?.status} size="sm" />
                  )}
                </li>
                <li className="flex items-center">
                  <div>
                    <span className="text-sm text-slate-800 dark:text-slate-100 font-medium">
                      Dimensions :
                    </span>
                    {edit ? (
                      <input
                        id="name"
                        className="form-input ml-2 py-1"
                        type="text"
                        value="30ft x 40ft"
                      />
                    ) : (
                      <span className="pl-1">30ft x 40ft</span>
                    )}
                  </div>
                </li>
                <li className="flex items-center">
                  <span className="text-sm text-slate-800 dark:text-slate-100 font-medium">
                    Area :
                  </span>
                  {edit ? (
                    <input
                      id="name"
                      className="form-input ml-2 py-1"
                      type="text"
                      value="1200sqft"
                    />
                  ) : (
                    <span className="pl-1">1200sqft</span>
                  )}
                </li>
                <li className="flex items-center">
                  <span className="text-sm text-slate-800 dark:text-slate-100 font-medium">
                    Custom Price :
                  </span>
                  {edit ? (
                    <input
                      id="name"
                      className="form-input ml-2 py-1"
                      type="text"
                      value="4000"
                    />
                  ) : (
                    <span className="pl-1">4000</span>
                  )}
                </li>
                <li className="flex items-center">
                  <span className="text-sm text-slate-800 dark:text-slate-100 font-medium">
                    Default Price :
                  </span>
                  {edit ? (
                    <input
                      id="name"
                      className="form-input ml-2 py-1"
                      type="text"
                      value="4000"
                    />
                  ) : (
                    <span className="pl-1">4000</span>
                  )}
                </li>
              </ul>
            </div>
            {edit && (
              <div className="flex w-full flex-wrap justify-center space-x-2 my-4">
                <button
                  className="py-1.5 sm:py-3 btn bg-slate-50 hover:bg-slate-100 text-black w-20  sm:w-40 border border-gray-300 rounded-lg"
                  onClick={() => setEdit(false)}>
                  Cancel
                </button>
                <button
                  className="py-1.5 sm:py-3 btn bg-blue-500 hover:bg-blue-600 text-white w-20 sm:w-40 border-blue-500 rounded-lg"
                  onClick={() => onUpdateSiteFn()}>
                  Save
                </button>
              </div>
            )}

            <hr className=" border-b-0 mb-3 border-gray-200" />
            {openModal && siteDetails?._id === selectedSite?._id && (
              <SiteTabs
                siteDetails={siteDetails}
                setSiteDetails={setSiteDetails}
              />
            )}
          </div>
        </div>
      </ModalAction>
    </div>
  );
}
