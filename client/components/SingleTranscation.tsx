import React from 'react';
import StatusChip from './StatusChip';
import moment from 'moment';

export default function SingleTranscation({ transaction }) {
  const transactionType = () => {
    switch (transaction.type) {
      case 'Token':
        return (
          <div>
            <p className="text-xm text-gray-800">
              Token by{' '}
              <span className="font-semibold">{transaction?.tokenBy}</span> for
              Site{' '}
              <span className="font-semibold">{transaction?.siteNumber}</span>
              {transaction?.layoutName && (
                <span className="font-semibold">
                  {' '}
                  ({transaction?.layoutName})
                </span>
              )}
            </p>
          </div>
        );
      case 'Sold':
        return (
          <div>
            <p className="text-xm text-gray-800">
              Site{' '}
              <span className="font-semibold">{transaction?.siteNumber}</span>{' '}
              sold to{' '}
              <span className="font-semibold">{transaction?.soldTo}</span>
              {transaction?.layoutName && (
                <span className="font-semibold">
                  {' '}
                  ({transaction?.layoutName})
                </span>
              )}
            </p>
          </div>
        );
      case 'Blocked':
        return (
          <div>
            <p className="text-xm text-gray-800">
              Site{' '}
              <span className="font-semibold">{transaction?.siteNumber}</span>{' '}
              blocked by{' '}
              <span className="font-semibold">{transaction?.blockedBy}</span>
              {transaction?.layoutName && (
                <span className="font-semibold">
                  {' '}
                  ({transaction?.layoutName})
                </span>
              )}
            </p>
          </div>
        );
      case 'Token Cancelled':
        return (
          <div>
            <p className="text-xm text-gray-800">
              Token Cancelled by{' '}
              <span className="font-semibold">
                {transaction?.tokenCancelledBy}
              </span>
              {transaction?.layoutName && (
                <span className="font-semibold">
                  {' '}
                  ({transaction?.layoutName})
                </span>
              )}
            </p>
          </div>
        );
      default:
    }
  };

  return (
    <li className={'mb-5'}>
      <div className="relative">
        <div className="relative flex space-x-2">
          <div className="w-20 pl-2">
            <span className="h-5 w-8 mt-1 rounded-full flex items-center justify-center ring-8 ring-white">
              <div aria-hidden="true">
                <StatusChip status={transaction?.type} size="sm" />
              </div>
            </span>
          </div>
          <div className="w-full">
            {transactionType()}
            <div className="whitespace-nowrap text-left text-xs text-gray-500">
              {moment(transaction?.date).format('Do MMM YYYY, hh:mm A')}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
