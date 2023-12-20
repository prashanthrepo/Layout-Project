'use client';

import Link from 'next/link';
import AuthHeader from '../auth-header';
import AuthImage from '../auth-image';
import loginPageSvg from '@/public/images/property-investor-illustration.svg';
import { useState } from 'react';
import OTPInput from './OTPInput';
import Image from 'next/image';
import PhoneSignin from './PhoneSignin';
import PhoneOtp from './PhoneOtp';
import PhoneSuccess from './PhoneSuccess';

export default function SignIn() {
  const [phoneNumber, setPhoneNumber] = useState(false);
  const [otp, setOtp] = useState(null);
  const onVerifyClick = () => {
    setPhoneNumber(true);
  };
  const onOtpChange = (val) => {
    setOtp(val);
  };
  return (
    <main className="bg-white dark:bg-slate-900">
      <div className="relative md:flex">
        {!phoneNumber ? (
          <PhoneSignin onVerify={() => onVerifyClick()} />
        ) : otp?.length > 3 ? (
          <PhoneSuccess />
        ) : (
          <PhoneOtp onOtp={(val) => onOtpChange(val)} />
        )}

        <AuthImage />
      </div>
    </main>
  );
}
