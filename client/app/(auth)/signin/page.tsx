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
import { useAppStore } from '@/common/utils';

export default function SignIn() {
  const { setUser } = useAppStore((state) => state);
  const [phoneNumber, setPhoneNumber] = useState(false);
  const [otp, setOtp] = useState(null);
  const onVerifyClick = () => {
    setPhoneNumber(true);
  };
  const onOtpChange = (val: String) => {
    if (val == '0000') {
      localStorage.setItem(
        'user',
        JSON.stringify({ name: 'Prashanth Reddy', role: 'seller' })
      );
      setUser({ name: 'Prashanth Reddy', role: 'seller' });
    } else if (val == '1111') {
      localStorage.setItem(
        'user',
        JSON.stringify({ name: 'Srikanth Reddy', role: 'buyer' })
      );
      setUser({ name: 'Srikanth Reddy', role: 'buyer' });
    } else if (val == '9999') {
      localStorage.setItem(
        'user',
        JSON.stringify({ name: 'Admin', role: 'admin' })
      );
      setUser({ name: 'Admin', role: 'admin' });
    }
    setOtp(val);
  };
  return (
    <main className="bg-white dark:bg-slate-900">
      <div className="relative md:flex">
        {!phoneNumber ? (
          <PhoneSignin onVerify={() => onVerifyClick()} />
        ) : otp == '0000' || otp == '1111' || otp == '9999' ? (
          <PhoneSuccess />
        ) : (
          <PhoneOtp onOtp={(val) => onOtpChange(val)} />
        )}

        <AuthImage />
      </div>
    </main>
  );
}
