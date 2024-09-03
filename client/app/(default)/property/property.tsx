'use client';
import React, { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { siteTypeColor } from '@/common/utils';
import { getLayoutByID } from '@/apicalls/layouts';
import LayoutSettingsButton from './property-settings';
import Site from './site/site';
import SkeletonLoader from '@/components/SkeletonLoader';
import PropertySettings from './property-settings';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Property() {
  const params = useSearchParams();
  const slug = params.get('id');
  const [layoutLoading, setLayoutLoading] = React.useState(true);
  const [data, setData] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [seletedSite, setSelectedSite] = React.useState(null);
  const [settingsModal, setSettingsModal] = React.useState(false);
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

  const takeScreenshot = useCallback(() => {
    const input = document.getElementById('propertyPhoto');
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', 0.5);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });

      const margin = 10;
      const imgWidth = canvas.width - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'jpeg', margin, margin, imgWidth, imgHeight);
      pdf.save('download.pdf');
    });
  }, []);

  return (
    <div className="relative">
      <div className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-[96rem] mx-auto">
        <SkeletonLoader
          type=""
          length={3}
          isLoading={layoutLoading}
          isData={data?.sites?.length > 0}
          noDataText="No sites in the layout.">
          <div className="flex justify-between mb-4 ">
            <h5 className="text-sm font-medium text-gray-900">{data?.name}</h5>
            <div className="">
              <button
                className="btnsecondary"
                onClick={() => setSettingsModal(true)}>
                Settings
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 ml-1">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.738c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738a1.125 1.125 0 0 1-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.15.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </button>
            </div>
            {/* <button className="btnsecondary" onClick={takeScreenshot}>
              Take Screenshot
            </button> */}
          </div>
          <div className="flex" id="propertyPhoto">
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
      {settingsModal && (
        <PropertySettings
          open={settingsModal}
          setOpen={setSettingsModal}
          property={data}
          layoutId={slug}
        />
      )}

      <Site
        selectedSite={seletedSite}
        openModal={openModal}
        setOpenModal={setOpenModal}
        onSiteStatusChange={onSiteStatusChange}
      />
    </div>
  );
}
