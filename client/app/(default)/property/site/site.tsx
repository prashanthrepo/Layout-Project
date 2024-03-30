import React, { useCallback, useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import ModalAction from '@/components/modal-action';
import getSiteByID from '@/apicalls/get-site-by-id';
import updateSiteByID from '@/apicalls/update-site-by-id';
import StatusChip from '../../../../components/StatusChip';
import { findDifferencesBwObjects, statusColors } from '@/common/utils';
import SiteTabs from './tabs/site-tabs';
import EditSite from './site-details/edit-site';
import SiteDetails from './site-details/site-details';
import NewLead from './site-details/new-lead';
import getLeadsBySite from '@/apicalls/get-leads-by-site';
import SkeletonLoader from '@/components/SkeletonLoader';
import ShareButton from '@/components/ShareButton';
import OptionsDropdown from './options-dropdown';
import StatusChange from './site-details/status-change/index';
import { XMarkIcon, PencilSquareIcon } from '@heroicons/react/20/solid';
import TokenDetails from './site-details/details/token-details';

export default function Site({
  selectedSite,
  openModal,
  setOpenModal,
  onSiteStatusChange,
}) {
  const [siteDetails, setSiteDetails] = useState(null);
  const [tempSiteDetails, setTempSiteDetails] = useState(null);
  const [uiStatus, setUiStatus] = useState('sitedetails');
  const [loading, setLoading] = useState(false);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [leads, setLeads] = useState([]);
  const [cancelToken, setCancelToken] = useState(false);
  const onUpdateSiteFn = useCallback(() => {
    const temp = findDifferencesBwObjects(tempSiteDetails, siteDetails);
    const res = updateSiteByID({ id: siteDetails?._id, temp });
    res?.then((res) => {
      if (res) {
        setSiteDetails(res?.data?.site);
        onSiteStatusChange(res?.data?.site?.number, res?.data?.site?.status);
        setOpenModal(false);
      }
    });
  }, [siteDetails, tempSiteDetails]);
  // const onShare = async () => {
  //   const temp = {
  //     title: siteDetails?.number,
  //     text: siteDetails?.status,
  //     url: window.location.href,
  //     dialogTitle: `Share site no ${siteDetails?.number} with friends`,
  //   };
  //   await Share.share(temp);
  // };
  // const share = async () => {
  //   await Share.share({
  //     title: 'Simons YT Channel',
  //     text: 'Learn to build awesome mobile apps!',
  //     url: 'https://www.youtube.com/simongrimmdev_',
  //     dialogTitle: 'Share with friends',
  //   });
  // };
  const getSite = useCallback(() => {
    if (selectedSite?._id) {
      setLoading(true);
      const res = getSiteByID(selectedSite?._id);
      res?.then((res) => {
        setLoading(false);
        if (res) {
          setSiteDetails(res?.data);
          setTempSiteDetails(res?.data);
          onSiteStatusChange(res?.data?.number, res?.data?.status);
          getLeads();
        }
      });
    }
  }, [selectedSite?._id]);
  const getLeads = useCallback(() => {
    setLeadsLoading(true);
    const leads = getLeadsBySite(selectedSite?._id);
    leads?.then((res) => {
      setLeadsLoading(false);
      setLeads(res?.data || []);
    });
  }, [selectedSite?._id]);

  const onRefetchDataFn = (res) => {
    setUiStatus('sitedetails');
    onSiteStatusChange(res?.number, res?.status);
    getSite();
  };

  const renderUi = (statustype) => {
    switch (statustype) {
      case 'statuschange':
        return (
          <StatusChange
            siteDetails={siteDetails}
            setUiStatus={setUiStatus}
            leads={leads}
            onRefetchDataFn={onRefetchDataFn}
            onClose={() => setUiStatus('sitedetails')}
          />
        );
      case 'sitedetails':
        switch (siteDetails?.status) {
          // case 'Token':
          //   return <TokenDetails siteDetails={siteDetails} reFetch={getSite} />;
          case 'Sold':
            return (
              <SiteDetails
                siteDetails={siteDetails}
                setUiStatus={setUiStatus}
              />
            );
          default:
            return (
              <SiteDetails
                siteDetails={siteDetails}
                setUiStatus={setUiStatus}
              />
            );
        }

      case 'editdetails':
        return (
          <EditSite
            siteDetails={siteDetails}
            setSiteDetails={setSiteDetails}
            onClose={() => setUiStatus('sitedetails')}
          />
        );
      case 'addlead':
        return (
          <NewLead
            setUiStatus={setUiStatus}
            siteDetails={siteDetails}
            fetchLeads={getLeads}
            onClose={() => setUiStatus('sitedetails')}
          />
        );

      default:
        return <></>;
    }
  };

  const renderButtons = (statustype) => {
    switch (statustype) {
      case 'sitedetails':
        return (
          <React.Fragment>
            <button
              type="button"
              className="btnprimary"
              onClick={() => setUiStatus('addlead')}>
              Add lead
            </button>
            {/* <OptionsDropdown
              align="left"
              onOptionClick={(val) => setUiStatus(val)}
            /> */}
            <button
              className="btn bg-white dark:bg-slate-800 border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
              onClick={() => setUiStatus('editdetails')}>
              <PencilSquareIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <button
              className="btn bg-white dark:bg-slate-800 border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
              onClick={() => setOpenModal(false)}>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </React.Fragment>
        );
      case 'editdetails':
        return (
          <button
            className="text-slate-400 dark:text-slate-500 hover:text-slate-500 dark:hover:text-slate-400 pr-1"
            onClick={() => setUiStatus('sitedetails')}>
            <div className="sr-only">Close</div>
            <svg className="w-4 h-4 fill-current">
              <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
            </svg>
          </button>
        );
    }
  };

  useEffect(() => {
    getSite();
    setUiStatus('sitedetails');
  }, [selectedSite?._id]);

  return (
    <div className="m-1.5">
      <ModalAction isOpen={openModal} setIsOpen={setOpenModal}>
        <SkeletonLoader
          type="SiteDetails"
          length={3}
          isLoading={loading}
          isData={siteDetails ? true : false}
          noDataText="Something went wrong. Please try after sometime.">
          <div>
            <div className="mb-5 ">
              <div className="flex justify-between  md:space-y-0 space-x-2">
                <div className="flex items-start space-x-3 ">
                  <div
                    className={
                      statusColors(siteDetails?.status) + ' w-10 h-10'
                    }>
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 30 30"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.25 6.25875H23.125C23.3617 6.25875 23.5781 6.3925 23.684 6.60424C23.7899 6.81598 23.767 7.06936 23.625 7.25875L20.1562 11.8837L23.625 16.5087C23.767 16.6981 23.7899 16.9515 23.684 17.1633C23.5781 17.375 23.3617 17.5087 23.125 17.5087H16.875C15.8395 17.5087 15 16.6693 15 15.6337C15 15.2886 14.7202 15.0087 14.375 15.0087H7.5V25.6338C7.5 25.9789 7.22018 26.2588 6.875 26.2588C6.52982 26.2588 6.25 25.9789 6.25 25.6338V5.625C6.25 4.58947 7.08947 3.75 8.125 3.75H14.375C15.4105 3.75 16.25 4.58947 16.25 5.625V6.25875Z"
                      />
                    </svg>
                  </div>
                  <div className="">
                    <span className="flex font-semibold text-slate-800 dark:text-slate-100 leading-5">
                      {siteDetails?.number}
                    </span>
                    <span className={'text-xm'}>{siteDetails?.status}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {renderButtons(uiStatus)}
                  {/* {Capacitor.isNativePlatform() && (
                    <ShareButton onClick={() => onShare()} />
                  )} */}
                </div>
              </div>
            </div>
            <div className="text-sm mb-3">
              <hr className=" border-b-0 mb-3 border-gray-200" />
              <div className="flex justify-end absolute right-0">
                <div className="sm:ml-6 space-x-2 sm:flex-shrink-0"></div>
              </div>
              {renderUi(uiStatus)}
            </div>

            {openModal &&
              siteDetails?._id === selectedSite?._id &&
              uiStatus == 'sitedetails' && (
                <SiteTabs
                  siteDetails={siteDetails}
                  setSiteDetails={setSiteDetails}
                  leads={leads}
                  loading={leadsLoading}
                />
              )}
          </div>
        </SkeletonLoader>
      </ModalAction>
    </div>
  );
}
