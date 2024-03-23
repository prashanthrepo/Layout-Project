import React from 'react';
import { statusColors } from '@/common/utils';
export default function StatusChip({ status, size = 'md' }) {
  return (
    <span
      className={
        ' rounded-md text-center ' +
        statusColors(status) +
        ' ' +
        (size === 'sm' ? 'px-2 py-1 text-xs' : 'px-4 py-2 text-sm')
      }>
      {status}
    </span>
  );
}
