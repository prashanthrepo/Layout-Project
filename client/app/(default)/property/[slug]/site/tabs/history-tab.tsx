import React, { useCallback, useEffect, useState } from 'react';
import UserAvatar from '@/public/images/user-avatar-32.png';
import Image from 'next/image';
import StatusChip from '../../../../components-library/StatusChip';
import { leadsBgColor, statusColors } from '@/common/utils';
import moment from 'moment';
import getTranscationsBySite from '@/api/get-transcations-by-site';

export default function HistoryTab({ siteDetails }) {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const getTranscations = useCallback(() => {
    setLoading(true);
    const transcations = getTranscationsBySite(siteDetails?._id);
    transcations?.then((transcation) => {
      setLoading(false);
      setHistory(transcation || []);
    });
  }, [siteDetails?._id]);
  useEffect(() => {
    getTranscations();
  }, [siteDetails?._id]);
  return (
    <div className="mb-4 space-y-1 overflow-scroll h-80 bg-slate-100 p-1 border border-slate-200  rounded-md ">
      <div className="bg-white py-4">
        <div className=" max-w-lg px-4">
          <div className="flow-root">
            <ul role="list" className="">
              {history?.map((item, key) => (
                <li key={key}>
                  <div className="relative pb-5">
                    {key !== history.length - 1 && (
                      <span
                        className="absolute left-6 top-6 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"></span>
                    )}
                    <div className="relative flex space-x-2">
                      <div className="w-20 pl-2">
                        <span className="h-5 w-8 mt-1 rounded-full flex items-center justify-center ring-8 ring-white">
                          <div className={' '} aria-hidden="true">
                            <StatusChip
                              status={item?.metadata?.currentStatus}
                              size="sm"
                            />
                          </div>
                        </span>
                      </div>
                      <div className="w-full">
                        <div>
                          <p className="text-xm text-gray-500">
                            {item?.status} to{' '}
                            <a href="#" className="font-medium text-gray-900">
                              {item?.name}
                            </a>
                          </p>
                        </div>
                        <div className="whitespace-nowrap text-left text-xs text-gray-500">
                          {moment(item?.date).format('Do MMM YYYY, hh:mm A')}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
