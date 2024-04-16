import React, { useCallback, useEffect, useState } from 'react';
import UserAvatar from '@/public/images/user-avatar-32.png';
import Image from 'next/image';
import StatusChip from '../../../../../components/StatusChip';
import moment from 'moment';
import getTranscationsBySite from '@/apicalls/get-transcations-by-site';
import SingleTranscation from '@/components/SingleTranscation';

export default function HistoryTab({ siteDetails }) {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const getTranscations = useCallback(() => {
    setLoading(true);
    const transcations = getTranscationsBySite(siteDetails?._id);
    transcations?.then((res) => {
      setLoading(false);
      setHistory(res?.data || []);
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
                <SingleTranscation transaction={item} key={key} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
