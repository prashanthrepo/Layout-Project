import React from 'react';
import Link from 'next/link';
import AuthHeader from '../auth-header';
import AuthImage from '../auth-image';
import loginPageSvg from '@/public/images/property-investor-illustration.svg';
import { useState } from 'react';
import OTPInput from './OTPInput';
import Image from 'next/image';

export default function PhoneSignin({ onVerify }) {
  return (
    <div className="md:w-1/2">
      <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
        <AuthHeader />

        <div className=" max-w-sm mx-auto w-full px-4 py-8">
          <Image
            src={loginPageSvg}
            className=" w-64 mx-auto"
            alt="Login Page Illustration"
          />
          <div className="my-10 text-center">
            <h1 className="text-2xl text-slate-800 dark:text-slate-100 font-bold">
              Enter Your Mobile Number
            </h1>
            <h4 className="text-sm font-medium">
              We will send you a Confirmation Code
            </h4>
          </div>
          <form>
            <div className="my-16">
              <input
                id="phone"
                className="form-input w-full"
                type="phone"
                placeholder="+91 9876543210"
              />
            </div>
            <div className="flex items-center justify-between my-10">
              <Link
                className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg py-3 font-semibold shadow-2xl"
                onClick={() => onVerify()}
                href="#">
                VERIFY
              </Link>
            </div>
          </form>
          <div className="pt-5  mt-40">
            <div className="text-sm text-center font-medium">
              By continuing you agree to our <br />
              <Link
                className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                href="/terms">
                Terms of Service {` `}
              </Link>
              and {` `}
              <Link
                className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                href="/privacy">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
