import ModalAction from '@/components/modal-action';
import getSiteByID from '@/api/get-site-by-id';
import updateSiteByID from '@/api/update-site-by-id';
import { Menu, Transition } from '@headlessui/react';
import flag from '@/public/images/flag.svg';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import StatusChip from '../../../components-library/StatusChip';
import { findDifferencesBwObjects, statusColors } from '@/common/utils';
import SiteTabs from './tabs/site-tabs';
import { siteStatus } from '@/common/mockdata';
import EditSite from './site-details/edit-site';
import SiteDetails from './site-details/details';
import NewLead from './site-details/new-lead';
import getLeadsBySite from '@/api/get-leads-by-site';

export default function Site({
  selectedSite,
  openModal,
  setOpenModal,
  onSiteStatusChange,
}) {
  const [siteDetails, setSiteDetails] = useState(null);
  const [tempSiteDetails, setTempSiteDetails] = useState(null);
  const [uiStatus, setUiStatus] = useState('sitedetails');
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [leads, setLeads] = useState([]);
  const onUpdateSiteFn = useCallback(() => {
    const temp = findDifferencesBwObjects(tempSiteDetails, siteDetails);
    const res = updateSiteByID(siteDetails?._id, temp);
    res?.then((res) => {
      if (res) {
        setSiteDetails(res?.site);
        onSiteStatusChange(res?.site?.number, res?.site?.status);
        setOpenModal(false);
      }
    });
  }, [siteDetails, tempSiteDetails]);

  const getSite = useCallback(() => {
    if (selectedSite?._id) {
      const res = getSiteByID(selectedSite?._id);
      res?.then((res) => {
        if (res) {
          setSiteDetails(res);
          setTempSiteDetails(res);
          getLeads();
        }
      });
    }
  }, [selectedSite?._id]);
  const getLeads = useCallback(() => {
    setLeadsLoading(true);
    const leads = getLeadsBySite(selectedSite?._id);
    leads?.then((leads) => {
      setLeadsLoading(false);
      setLeads(leads?.leads || []);
    });
  }, [selectedSite?._id]);

  const renderUi = (statustype) => {
    switch (statustype) {
      case 'sitedetails':
        return <SiteDetails siteDetails={siteDetails} />;
      case 'editdetails':
        return (
          <EditSite
            siteDetails={siteDetails}
            setSiteDetails={setSiteDetails}
            onUpdate={() => onUpdateSiteFn}
          />
        );
      case 'addlead':
        return (
          <NewLead
            setUiStatus={setUiStatus}
            siteDetails={siteDetails}
            fetchLeads={getLeads}
          />
        );
      default:
        return <SiteDetails siteDetails={siteDetails} />;
    }
  };

  const renderButtons = (statustype) => {
    switch (statustype) {
      case 'sitedetails':
        return (
          <React.Fragment>
            <button
              type="button"
              className="btnsecondary"
              onClick={() => setUiStatus('editdetails')}>
              Edit
            </button>
            <button
              type="button"
              className="btnprimary"
              onClick={() => setUiStatus('addlead')}>
              Add lead
            </button>
          </React.Fragment>
        );
      case 'editdetails':
        return (
          <button
            className="btncancel"
            onClick={() => setUiStatus('sitedetails')}>
            Close
          </button>
        );
      case 'addlead':
        return (
          <button
            className="btncancel"
            onClick={() => setUiStatus('sitedetails')}>
            Close
          </button>
        );
    }
  };

  useEffect(() => {
    getSite();
  }, [selectedSite?._id]);

  return (
    <div className="m-1.5">
      <ModalAction isOpen={openModal} setIsOpen={setOpenModal}>
        <div className="grid content-between h-full">
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
                        fill-rule="evenodd"
                        clip-rule="evenodd"
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
                <div>
                  <StatusChip status={siteDetails?.status} />
                </div>
              </div>
            </div>
            <div className="text-sm mb-3">
              <hr className=" border-b-0 mb-3 border-gray-200" />
              <div className="flex justify-end absolute right-0">
                <div className="sm:ml-6 space-x-2 sm:flex-shrink-0">
                  {renderButtons(uiStatus)}
                </div>
              </div>
              {renderUi(uiStatus)}
            </div>

            <hr className=" border-b-0 mb-3 border-gray-200" />
            {openModal && siteDetails?._id === selectedSite?._id && (
              <SiteTabs
                siteDetails={siteDetails}
                setSiteDetails={setSiteDetails}
                leads={leads}
                loading={leadsLoading}
              />
            )}
          </div>
        </div>
      </ModalAction>
    </div>
  );
}
