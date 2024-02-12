import React, { useEffect } from 'react';
import Link from 'next/link';
import AuthHeader from '../auth-header';
import AuthImage from '../auth-image';
import verified from '@/public/images/verified.svg';
import { useState } from 'react';
import OTPInput from './OTPInput';
import Image from 'next/image';
import ProfileUpdate from '@/components/ProfileUpdate';
import getSelf from '@/apicalls/get-self';
import { useAppStore } from '@/common/appstore';

export default function PhoneSuccess({ phone, token }) {
  const { user, setUser } = useAppStore((state) => state);
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token && !user) {
      const res = getSelf();
      res?.then((res) => {
        if (res) {
          if (res?.status == 200) {
            setUser(res?.data);
          }
        }
      });
    }
  }, []);
  return (
    <div className="md:w-1/2">
      <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
        <AuthHeader />

        <div className=" max-w-lg mx-auto w-full px-4 py-8">
          {token?.accountVerified ? (
            <div className=" h-70v my-10 grid gap-4 content-around">
              <Image
                src={verified}
                className="w-40  mx-auto"
                alt="OTP screen"
              />
              <div className="text-center">
                <div className="btn w-full dark:bg-slate-800  text-slate-600 dark:text-slate-300">
                  <span className="text-2xl text-green-500 dark:text-slate-100 font-bold">
                    Verified
                  </span>
                  <div
                    className="ml-2 rounded-full bg-green-500"
                    aria-hidden="true">
                    <svg
                      className="w-5 h-5 fill-current text-white"
                      viewBox="0 0 20 20">
                      <path d="M14.4 8.4L13 7l-4 4-2-2-1.4 1.4L9 13.8z" />
                    </svg>
                  </div>
                </div>
                <h4 className="text-sm font-medium">
                  You will be redirected to the Dashboard.
                </h4>
              </div>

              <div className="flex items-center justify-between my-10">
                <Link
                  className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg py-3 font-semibold shadow-2xl"
                  href="/">
                  Okay
                </Link>
              </div>
            </div>
          ) : (
            <div className=" h-70v my-10 grid gap-4 content-around">
              <ProfileUpdate phone={phone} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
