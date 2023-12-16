import ModalAction from '@/components/modal-action';
import flag from '@/public/images/flag.svg';
import Image from 'next/image';
import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';

export default function AddLayoutModal({ openModal, setOpenModal }) {
  return (
    <ModalAction
      isOpen={openModal}
      setIsOpen={setOpenModal}
      size="max-w-md"
      title="Add Layout">
      <div className="grid content-between h-full">
        <div>
          <div className="mb-5 ">
            <div className="flex justify-between  md:space-y-0 space-x-2">
              <div className="flex items-start space-x-3">
                {/* <div
                    className={
                      ' w-12 h-12 rounded-xl flex justify-center items-center ' +
                      statusColors(selectedSite?.status)
                    }>
                    <Image
                      className="w-8 h-8 rounded-full"
                      src={flag}
                      alt="flag"
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
                  </div> */}
              </div>
              <div></div>
            </div>
          </div>
          <div>
            <div className="space-y-4">
              {/* Card Number */}
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="layoutname">
                  Layout name
                </label>
                <input
                  id="layoutname"
                  className="form-input w-full"
                  type="text"
                  placeholder=""
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="layoutdesc">
                  Description
                </label>
                <input
                  id="layoutdesc"
                  className="form-input w-full"
                  type="text"
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="long">
                    Long
                  </label>
                  <input
                    id="long"
                    className="form-input w-full"
                    type="number"
                  />
                </div>
                <div className="flex-1">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="lat">
                    Lat
                  </label>
                  <input id="lat" className="form-input w-full" type="number" />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="layoutjson">
                  Layout JSON <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="layoutjson"
                  className="form-input w-full"
                  placeholder="{...}"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-around  mt-5">
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
  );
}
