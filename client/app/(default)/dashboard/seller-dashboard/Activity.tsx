import React from 'react';
import StatusChip from '../../../../components/StatusChip';
import moment from 'moment';
import SingleTranscation from '@/components/SingleTranscation';

export default function Activity({ data }) {
  return (
    <div className="w-full xl:w-1/2 bg-white shadow-lg rounded-lg mt-5 mb-20">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Recent Activity</h2>
      </header>
      <div className="p-3">
        <div>
          <ul className="px-5 py-4 ">
            {data?.map((item, key) => (
              <SingleTranscation transaction={item} key={key} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
