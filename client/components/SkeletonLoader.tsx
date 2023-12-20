import React from 'react';
import SkeletonLoaderHtml from './SkeletonLoaderHtml';
import NodataHtml from './NodataHtml';
interface SkeletonLoaderProps {
  children: React.ReactNode;
  isLoading: boolean;
  noDataText: string;
  type: string;
  length: number;
  isData: boolean;
}
export default function SkeletonLoader({
  children,
  isLoading,
  noDataText,
  type,
  length,
  isData,
}: SkeletonLoaderProps & {
  children: React.ReactNode;
}) {
  return (
    <div>
      {isLoading ? (
        <div>{SkeletonLoaderHtml(type, length)}</div>
      ) : !isData ? (
        <NodataHtml text={noDataText} />
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
}
