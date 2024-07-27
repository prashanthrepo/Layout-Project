import React, { useState } from 'react';
import updateprofile from '@/apicalls/update-profile';
import { useRouter } from 'next/navigation';
export default function ProfileUpdate({ phone }) {
  const router = useRouter();
  const [profileDetails, setProfileDetails] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });
  const onUpdateProfile = () => {
    const res = updateprofile(profileDetails);
    res?.then((res) => {
      if (res) {
        if (res?.status == 200) {
          //route to dashboard
          router.push('/');
          // setTimeout(() => {
          //   window.location.href = '/';
          // }, 5000);
        }
      }
    });
  };
  return (
    <div>
      <div className="space-y-6 ">
        <h3 className="text-2xl font-semibold text-slate-800 mb-5">
          Update your profile details
        </h3>
        <div className="flex space-x-5">
          <div className="flex-1">
            <label
              className="block text-xs sm:text-sm font-medium"
              htmlFor="first-name">
              First Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="first-name"
              className="form-input w-full"
              type="text"
              placeholder=""
              defaultValue={profileDetails?.first_name}
              onChange={(e) =>
                setProfileDetails({
                  ...profileDetails,
                  first_name: e.target.value,
                })
              }
            />
          </div>
          <div className="flex-1">
            <label
              className="block text-xs sm:text-sm font-medium"
              htmlFor="last-name">
              Last Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="last-name"
              className="form-input w-full"
              type="text"
              placeholder=""
              defaultValue={profileDetails?.last_name}
              onChange={(e) =>
                setProfileDetails({
                  ...profileDetails,
                  last_name: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="flex space-x-5">
          <div className="flex-1">
            <label
              className="block text-xs sm:text-sm font-medium"
              htmlFor="email">
              Email <span className="text-rose-500">*</span>
            </label>
            <input
              id="email"
              className="form-input w-full text-right"
              type="email"
              defaultValue={profileDetails?.email}
              onChange={(e) =>
                setProfileDetails({ ...profileDetails, email: e.target.value })
              }
            />
          </div>
          <div className="flex-1">
            <label
              className="block text-xs sm:text-sm font-medium"
              htmlFor="phone-number">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <input
              id="phone-number"
              className="form-input w-full  disabled:bg-slate-100 disabled:text-slate-600"
              type="number"
              inputMode="numeric"
              defaultValue={phone}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center space-x-2 my-10">
        <button
          className="btnprimary"
          onClick={() => {
            onUpdateProfile();
          }}
          disabled={
            profileDetails.first_name === '' ||
            profileDetails.last_name === '' ||
            profileDetails.email === ''
          }>
          Save
        </button>
        <button
          className="btnlink"
          onClick={() => {
            window.location.href = '/';
          }}>
          Skip
        </button>
      </div>
    </div>
  );
}
