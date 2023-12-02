import ModalAction from '@/components/modal-action';
import ModalBasic from '@/components/modal-basic';
import { siteStatus } from '@/common/mockdata.js';
import flag from '@/public/images/flag.svg';
import Image from 'next/image';
import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import StatusChip from '../../components-library/StatusChip';
import { statusColors } from '@/common/utils';

export default function SiteDetails({
  selectedSite,
  openModal,
  setOpenModal,
  onSiteStatusChange,
}) {
  return (
    <div className="m-1.5">
      <ModalAction
        isOpen={openModal}
        setIsOpen={setOpenModal}
        title="Send Feedback">
        <div className="grid content-between h-full">
          <div>
            <div className="mb-5 ">
              <div className="flex justify-between  md:space-y-0 space-x-2">
                <div className="flex items-start space-x-3">
                  <div
                    className={
                      ' w-12 h-12 rounded-xl flex justify-center items-center ' +
                      statusColors(selectedSite?.status)
                    }>
                    <Image
                      className="w-8 h-8 rounded-full"
                      src={flag}
                      //   width={36}
                      //   height={36}
                      //   alt={job.company}
                    />
                  </div>
                  <div>
                    <span className="inline-flex font-semibold text-slate-800 dark:text-slate-100">
                      Site No : {selectedSite?.number}
                    </span>
                    <div className="text-sm">{selectedSite?.status}</div>
                  </div>
                </div>
                <div>
                  <StatusChip status={selectedSite?.status} />
                </div>
              </div>
              {/* <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            Connect Mosaic with your Cruip account
          </div> */}
            </div>
            {/* Modal content */}
            <div className="text-sm mb-3">
              <div className="font-medium text-slate-800 dark:text-slate-100 mb-3">
                Site Details
              </div>
              <ul className="space-y-2 mb-5">
                <li className="flex items-center">
                  <svg
                    className="w-3 h-3 shrink-0 fill-current text-blue-500 mr-2"
                    viewBox="0 0 12 12">
                    <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                  </svg>
                  <div>Dimensions : 30ft x 40ft</div>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-3 h-3 shrink-0 fill-current text-blue-500 mr-2"
                    viewBox="0 0 12 12">
                    <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                  </svg>
                  <div>Area : 1200sqft</div>
                </li>
              </ul>
              <hr className=" border-b-0 mb-3 border-gray-200" />
              <div className="mb-4">
                <div className="font-medium text-slate-800 dark:text-slate-100 mb-3">
                  Change status to
                </div>
                <div className="flex flex-wrap items-center -m-3">
                  {siteStatus?.map((status, key) => (
                    <div className="m-3" key={key}>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="site-status"
                          className="form-radio"
                          defaultChecked={status?.type == selectedSite?.status}
                          onChange={() =>
                            onSiteStatusChange(
                              selectedSite?.number,
                              status?.type
                            )
                          }
                        />
                        <span className="text-sm ml-2">{status?.type}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <hr className=" border-b-0 mb-3 border-gray-200" />
            <div className="mb-4">
              <div className=" pb-1">
                <Link
                  className="text-sm font-bold text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                  href="#0">
                  Add new lead
                </Link>
              </div>
              <div className=" pb-1">
                <Link
                  className="text-sm font-bold text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                  href="#0">
                  Set custom price
                </Link>
              </div>
              <div className=" pb-1">
                <Link
                  className="text-sm font-bold text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                  href="#0">
                  Share details
                </Link>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-wrap justify-around sm:justify-end space-x-4 mt-10">
            <button
              className="py-3 btn bg-blue-500 hover:bg-blue-600 text-white w-40 border-blue-500 rounded-xl"
              onClick={() => setOpenModal(false)}>
              Save
            </button>
            <button
              className="py-3 btn bg-slate-50 hover:bg-slate-100 text-black w-40 border border-gray-300 rounded-xl"
              onClick={() => setOpenModal(false)}>
              Close
            </button>
          </div>
        </div>
      </ModalAction>
    </div>
  );
}
