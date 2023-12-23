import React from 'react';
import UserAvatar from '@/public/images/user-avatar-32.png';
import Image from 'next/image';
import StatusChip from '../../../../components-library/StatusChip';
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
    <div className="mb-4 space-y-1 overflow-scroll h-80 bg-slate-100 p-1 border border-slate-200  rounded-md shadow-inner">
      {/* <ul className="bg-white p-4 h-full">
        {history?.map((item, key) => (
          <li className="relative py-2" key={key}>
            <div className="flex items-center mb-1">
              {key !== history.length - 1 && (
                <div
                  className="absolute left-0 h-full w-0.5 bg-slate-200 dark:bg-slate-700 self-start ml-2.5 -translate-x-1/2 translate-y-3"
                  aria-hidden="true"></div>
              )}
              <div
                className={' left-0 w-20 flex justify-end'}
                aria-hidden="true">
                <StatusChip status={item?.status} size="sm" />
              </div>
              <div className="flex w-full justify-between pl-2 align-bottom">
                <span className="text-base font-medium text-slate-800 dark:text-slate-100">
                  {item?.status}
                </span>
                <span className="text-xs font-medium text-slate-400">
                  {moment(item?.datetime).format('Do MMM YYYY, hh:mm A')}
                </span>
              </div>
            </div>
            <div className="pl-9 text-xs">
              <span>
                <span className="text-blue-500">{item?.name}</span>{' '}
              </span>
              <span>
                at price - <span>{item?.price}</span>
                sqft
              </span>
            </div>
          </li>
        ))}
      </ul> */}
      <div className="bg-white py-4">
        <div className="mx-auto max-w-lg px-4">
          <div className="flow-root">
            <ul role="list" className="">
              {history?.map((item, key) => (
                <li>
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
                            <StatusChip status={item?.status} size="sm" />
                          </div>
                        </span>
                      </div>
                      <div className="w-full">
                        <div>
                          <p className="text-sm text-gray-500">
                            Applied to{' '}
                            <a href="#" className="font-medium text-gray-900">
                              Front End Developer
                            </a>
                          </p>
                        </div>
                        <div className="whitespace-nowrap text-left text-sm text-gray-500">
                          {moment(item?.datetime).format(
                            'Do MMM YYYY, hh:mm A'
                          )}
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
