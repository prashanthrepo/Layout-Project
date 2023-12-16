'use client';
import React, { useState } from 'react';

import { useEffect } from 'react';
import { layoutData } from '@/common/mockdata.js';
import SiteDetails from './site-details';
import { siteTypeColor, useAppStore } from '@/common/utils';
import getLayoutByID from '@/api/get-layout-by-id';
import LayoutSettingsButton from './layout-settings';
export default function Page({ params }: { params: { slug: string } }) {
  const { user } = useAppStore((state) => state);
  console.log('user :>> ', user);
  const { layout, loading, error } = getLayoutByID(params?.slug);
  const [data, setData] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [seletedSite, setSelectedSite] = React.useState(null);
  const onSiteClick = (site: any) => {
    if (site?.type == 'road') return;
    const siteNumber = site;
    siteNumber && setSelectedSite(siteNumber);
    siteNumber && setOpenModal(true);
  };
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragTranslate, setDragTranslate] = useState({ x: 0, y: 0 });

  const handleWheel = (e) => {
    e.preventDefault();
    const newScale = scale - e.deltaY * 0.01;
    setScale(Math.min(Math.max(0.5, newScale), 3)); // Adjust the minimum and maximum zoom levels as needed
  };

  let initialDistance = 0;

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      initialDistance = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
    }
  };

  const handleTouchMove = (e) => {
    e.preventDefault();

    if (e.touches.length === 2) {
      const currentDistance = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );

      const delta = currentDistance - initialDistance;
      const newScale = scale + delta * 0.01;

      setScale(Math.min(Math.max(0.5, newScale), 3)); // Adjust the minimum and maximum zoom levels as needed

      initialDistance = currentDistance;
    }
  };

  const handleTouchEnd = () => {
    initialDistance = 0;
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      setDragTranslate({
        x: dragTranslate.x + deltaX,
        y: dragTranslate.y + deltaY,
      });
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const onSiteStatusChange = (number, type) => {
    const newData = data?.sites?.map((item) => {
      if (item?.number === number) {
        item.status = type;
      }
      return item;
    });
    setData({ ...data, sites: newData });
  };

  useEffect(() => {
    setData(layout);
  }, [layout]);

  return (
    <div className="relative">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
        <div
          className="zoomable-content"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{
            transform: `scale(${scale}) translate(${dragTranslate.x}px, ${dragTranslate.y}px)`,
          }}>
          <div className="flex">
            <div className="w-full">
              <svg
                className="px-4 w-full"
                viewBox="0 0 600 800"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                {data?.sites?.map((layout, key) => (
                  <g key={key} onClick={() => onSiteClick(layout)}>
                    {layout?.type === 'site' ? (
                      <polygon
                        className=" cursor-pointer hover:opacity-60"
                        points={layout.points}
                        fill={siteTypeColor(layout?.status)}
                        stroke="#000"
                        strokeWidth="0.1"
                      />
                    ) : (
                      <polygon
                        points={layout.points}
                        fill="#6b7280"
                        stroke="#6b7280"
                        strokeWidth="1"
                      />
                    )}
                    {layout?.info?.map((item, key) => {
                      if (item?.type === 'number') {
                        return (
                          <text
                            key={key}
                            transform={item?.transform}
                            className=" cursor-pointer"
                            fill="#000"
                            fontSize="10"
                            fontWeight="normal">
                            {item?.text}
                          </text>
                        );
                      } else if (item?.type === 'road') {
                        return (
                          <text
                            key={key}
                            transform={item?.transform}
                            fill="#fff"
                            fontSize="10"
                            fontWeight="normal">
                            {`${item?.text}' Feet Wide Road`}
                          </text>
                        );
                      }
                    })}
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* {user?.role == 'Admin' && <LayoutSettingsButton />} */}
      {seletedSite && (
        <SiteDetails
          selectedSite={seletedSite}
          openModal={openModal}
          setOpenModal={setOpenModal}
          onSiteStatusChange={onSiteStatusChange}
        />
      )}
    </div>
  );
}
