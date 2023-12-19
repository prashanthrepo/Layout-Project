import React from 'react';
import UserAvatar from '@/public/images/user-avatar-32.png';
import Image from 'next/image';
import StatusChip from '../../components-library/StatusChip';
import { leadsBgColor, statusColors } from '@/common/utils';
import moment from 'moment';
const history = [
  {
    name: 'Babu Reddy',
    status: 'Sold',
    phone: '9876543210',
    price: '4000',
    datetime: '12/12/2021 10:00 AM',
  },
  {
    name: 'Sachin',
    status: 'Token',
    phone: '9876543210',
    price: '4000',
    datetime: '12/12/2021 10:00 AM',
  },
  {
    name: 'Srikanth Gumireddy',
    status: 'Available',
    phone: '9876543210',
    price: '4000',
    selleroffer: '4800',
    datetime: '12/12/2021 10:00 AM',
  },
];
export default function HistoryTab() {
  return (
    <div className="mb-4 space-y-1 overflow-scroll h-80 bg-slate-100 p-1 border border-slate-200 rounded-md shadow-inner">
      <ul className="bg-white p-4 h-full">
        {history?.map((item, key) => (
          <li className="relative py-2" key={key}>
            <div className="flex items-center mb-1">
              {key !== history.length - 1 && (
                <div
                  className="absolute left-0 h-full w-0.5 bg-slate-200 dark:bg-slate-700 self-start ml-2.5 -translate-x-1/2 translate-y-3"
                  aria-hidden="true"></div>
              )}
              <div
                className={
                  'absolute left-0 rounded-full ' + statusColors(item?.status)
                }
                aria-hidden="true">
                <svg className="w-5 h-5 fill-curren" viewBox="0 0 20 20">
                  <path d="M14.4 8.4L13 7l-4 4-2-2-1.4 1.4L9 13.8z" />
                </svg>
              </div>
              <div className="flex w-full justify-between  pl-9">
                <span className="text-base font-medium text-slate-800 dark:text-slate-100">
                  {item?.status}
                </span>
                <span className="text-xs font-medium">
                  {moment(item?.datetime).format('dddd, Do MMMM YYYY hh:mm A')}
                </span>
              </div>
            </div>
            <div className="pl-9 text-sm">
              <span>
                To - <span className=" font-semibold ">{item?.name}</span>{' '}
              </span>
              <span>
                {' '}
                at price -{' '}
                <span className=" font-semibold ">{item?.price}</span>
                sqft
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
