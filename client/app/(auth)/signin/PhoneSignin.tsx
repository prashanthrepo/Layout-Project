import React, { useEffect } from 'react';
import Link from 'next/link';
import AuthHeader from '../auth-header';
import loginPageSvg from '@/public/images/property-investor-illustration.svg';
import { useState } from 'react';
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import ButtonLoader from '@/components/ButtonLoader';
import { useUser } from '@/hooks/useUserHook';

export default function PhoneSignin({ onVerify }) {
  const { requestOTP, logout } = useUser();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState('VERIFY');

  const onRequestOtpFn = () => {
    setLoading(true);
    setButtonText('Sending OTP...');
    const response = requestOTP({
      phone_number: phone,
    });
    response?.then((res) => {
      if (res?.status == 200) {
        setLoading(false);
        onVerify(phone);
      }
    });
  };

  useEffect(() => {
    logout();
  }, []);

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
            <div className="my-12">
              <PhoneInput
                inputProps={{
                  name: 'phone',
                  required: true,
                }}
                countryCodeEditable={false}
                disableDropdown={true}
                country={'in'}
                value={phone}
                onChange={(phone) => setPhone(phone)}
                placeholder="Enter your mobile number"
                containerClass="w-full "
                inputClass="w-full border-1 border-indigo-500 rounded-lg py-3 px-4 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center justify-between my-10">
              {/* <button
                className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg py-3 font-semibold shadow-2xl disabled:bg-slate-400 disabled:cursor-not-allowed"
                onClick={() => onSendOtpFn()}
                disabled={phone?.length < 12}
                type="button">
                VERIFY
              </button> */}
              <ButtonLoader
                text={buttonText}
                onClick={onRequestOtpFn}
                disabled={phone?.length < 12}
                loading={loading}
                classes="btnprimary w-full"
              />
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
