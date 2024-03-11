'use client';
import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { siteTypeColor } from '@/common/utils';
import getLayoutByID from '@/apicalls/get-layout-by-id';
import LayoutSettingsButton from './layout-settings';
import Site from './site/site';
import SkeletonLoader from '@/components/SkeletonLoader';
export default function SitePage({ slug }) {
  const [layoutLoading, setLayoutLoading] = React.useState(true);
  const [data, setData] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [seletedSite, setSelectedSite] = React.useState(null);
  const onSiteClick = useCallback((site: any) => {
    if (site?.type == 'road') return;
    setSelectedSite(site);
    setOpenModal(true);
  }, []);

  const onSiteStatusChange = useCallback(
    (number, type) => {
      const newData = data?.sites?.map((item) => {
        if (item?.number === number) {
          item.status = type;
        }
        return item;
      });
      setData({ ...data, sites: newData });
    },
    [data?.sites]
  );

  const getLayout = useCallback(() => {
    setLayoutLoading(true);
    const res = getLayoutByID(slug);
    res?.then((res) => {
      if (res?.status == 200) {
        setLayoutLoading(false);
        setData(res?.data);
      } else {
        setLayoutLoading(false);
      }
    });
  }, [slug]);

  useEffect(() => {
    getLayout();
  }, [slug]);

  return (
    <div className="relative">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
        <SkeletonLoader
          type=""
          length={3}
          isLoading={layoutLoading}
          isData={data?.sites?.length > 0}
          noDataText=" No sites in the layout.">
          <div className="flex">
            <div className="w-full">
              <svg
                className="px-4 w-full"
                viewBox="0 0 600 800"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                {data?.sites?.map((site, key) => (
                  <g
                    key={key}
                    className={
                      site?.type === 'site'
                        ? ' cursor-pointer hover:opacity-70'
                        : ''
                    }
                    onClick={() => onSiteClick(site)}>
                    {site?.type === 'site' ? (
                      <polygon
                        className=""
                        points={site.points}
                        fillOpacity={
                          seletedSite?.number === site?.number ? 1 : 1
                        }
                        fill={siteTypeColor(site?.status)}
                        stroke="#000"
                        strokeWidth="0.1"
                      />
                    ) : (
                      <polygon
                        points={site.points}
                        fill="#6b7280"
                        stroke="#6b7280"
                        strokeWidth="1"
                      />
                    )}
                    {site?.info?.map((item, key) => {
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
        </SkeletonLoader>
      </div>
      {/* {user?.role == 'Admin' && <LayoutSettingsButton />} */}
      <Site
        selectedSite={seletedSite}
        openModal={openModal}
        setOpenModal={setOpenModal}
        onSiteStatusChange={onSiteStatusChange}
      />
    </div>
  );
}
