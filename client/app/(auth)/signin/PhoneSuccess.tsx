import React from 'react';
import Link from 'next/link';
import AuthHeader from '../auth-header';
import AuthImage from '../auth-image';
import verified from '@/public/images/verified.svg';
import { useState } from 'react';
import OTPInput from './OTPInput';
import Image from 'next/image';

export default function PhoneSuccess() {
  return (
    <div className="md:w-1/2">
      <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
        <AuthHeader />

        <div className=" max-w-sm mx-auto w-full px-4 py-8">
          <div className=" h-70v my-10 grid gap-4 content-around">
            <Image src={verified} className="w-40  mx-auto" alt="OTP screen" />
            <div className="text-center">
              <h1 className="text-2xl text-slate-800 dark:text-slate-100 font-bold">
                Verified
              </h1>
              <h4 className="text-sm font-medium">
                You will be referred to the next page
              </h4>
            </div>

            <div className="flex items-center justify-between my-10">
              <Link
                className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg py-3 font-semibold"
                // onClick={() => onVerify()}
                href="/">
                Okay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
