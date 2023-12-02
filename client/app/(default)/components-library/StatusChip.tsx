import React from 'react';
import { statusColors } from '@/common/utils';
export default function StatusChip({ status }) {
  return (
    <span
      className={
        'px-4 py-2 text-sm rounded-full text-center ' + statusColors(status)
      }>
      {status}
    </span>
  );
}
