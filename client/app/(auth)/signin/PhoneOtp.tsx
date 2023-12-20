import React from 'react';
import Link from 'next/link';
import AuthHeader from '../auth-header';
import AuthImage from '../auth-image';
import otpImage from '@/public/images/otp-input.svg';
import { useState } from 'react';
import OTPInput from './OTPInput';
import Image from 'next/image';

export default function PhoneOtp({ onOtp }) {
  return (
    <div className="md:w-1/2">
      <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
        <AuthHeader />

        <div className=" max-w-sm mx-auto w-full px-4 py-8">
          <Image src={otpImage} className=" w-64 mx-auto" alt="OTP screen" />
          <div className="h-72 my-10 grid gap-4 content-between">
            <div className="text-center">
              <h1 className="text-2xl text-slate-800 dark:text-slate-100 font-bold">
                Enter Verification Code
              </h1>
              <h4 className="text-sm font-medium">
                We are automatically detecting a SMS sent to your phone number
              </h4>
            </div>
            <form>
              <div className="">
                <div>
                  <OTPInput
                    autoFocus
                    isNumberInput
                    length={4}
                    className="flex flex-row items-center justify-between mx-auto w-full max-w-xs"
                    inputClassName="otpInput"
                    onChangeOTP={(otp) => onOtp(otp)}
                  />
                </div>
              </div>
              {/* <div className="flex items-center justify-between my-10">
              <Link
                className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg py-3 font-semibold"
                onClick={() => onVerify()}
                href="/">
                VERIFY
              </Link>
            </div> */}
            </form>
            <div className="text-sm text-center font-bold">
              Din't recieve the OTP? {` `}
              <Link
                className=" text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 "
                href="#">
                RESEND OTP
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
