import React, { useState } from 'react';
import { siteStatus } from '@/common/mockdata';
import StatusChip from '@/components/StatusChip';
import ToToken from './to-token';
import ToSold from './to-sold';
import ToBlocked from './to-blocked';
import { useQuery } from 'react-query';
import { getAllContacts } from '@/apicalls/contacts';

const StatusSelector = (props) => {
  const [currentStatus, setCurrentStatus] = useState('Token');
  const {
    data: contacts,
    isLoading,
    error,
    refetch,
  } = useQuery('allContacts', getAllContacts);
  return (
    <div className="mb-4">
      <div className="font-medium text-slate-800 mb-3">
        Change site status to -
      </div>
      <div className={'flex flex-wrap items-center '}>
        {siteStatus?.map((status, key) => (
          <div
            className={
              'mr-2 ' +
              (status?.type != currentStatus
                ? ' border-2 border-transparent'
                : 'border-2 border-blue-400 rounded-lg')
            }
            key={key}>
            <label className="flex items-center  cursor-pointer">
              <input
                type="radio"
                name="site-status"
                className="form-radio hidden"
                defaultChecked={status?.type == props?.siteDetails?.status}
                onChange={() => setCurrentStatus(status?.type)}
              />
              <StatusChip status={status?.type} />
            </label>
          </div>
        ))}
      </div>
      {currentStatus == 'Token' && (
        <ToToken {...props} contacts={contacts?.data} />
      )}
      {currentStatus == 'Sold' && (
        <ToSold {...props} contacts={contacts?.data} />
      )}
      {currentStatus == 'Blocked' && (
        <ToBlocked {...props} contacts={contacts?.data} />
      )}
    </div>
  );
};

export default StatusSelector;
