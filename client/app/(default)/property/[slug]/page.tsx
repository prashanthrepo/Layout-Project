'use client';
import React from 'react';
import { useEffect } from 'react';
import { layoutData } from '@/common/mockdata.js';
import SiteDetails from './site-details';
import { siteTypeColor } from '@/common/utils';
export default function Page({ params }: { params: { slug: string } }) {
  const [data, setData] = React.useState(layoutData);
  const [openModal, setOpenModal] = React.useState(false);
  const [seletedSite, setSelectedSite] = React.useState(null);
  const onSiteClick = (site: any) => {
    if (site?.type == 'road') return;
    const siteNumber = site;
    siteNumber && setSelectedSite(siteNumber);
    siteNumber && setOpenModal(true);
  };

  const onSiteStatusChange = (number, type) => {
    const newData = data?.map((item) => {
      if (item?.number === number) {
        item.status = type;
      }
      return item;
    });
    setData(newData);
    // setOpenModal(false);
  };

  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
        <div className="flex">
          <div className="w-full">
            <svg
              className="px-4"
              viewBox="0 0 600 800"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              {data?.map((layout, key) => (
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
