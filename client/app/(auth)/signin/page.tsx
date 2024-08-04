'use client';

import Link from 'next/link';
import AuthHeader from '../auth-header';
import AuthImage from '../auth-image';
import loginPageSvg from '@/public/images/property-investor-illustration.svg';
import { useState } from 'react';
import OTPInput from './OTPInput';
import Image from 'next/image';
import PhoneSignin from './PhoneSignin';
import PhoneOtpVerify from './PhoneOtpVerify';
import PhoneSuccess from './PhoneSuccess';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUserHook';

export default function SignIn() {
  const router = useRouter();
  const { getUser } = useUser();
  const [screenType, setScreenType] = useState('send');
  const [phone, setPhone] = useState('');
  const [token, setToken] = useState(null);
  const onVerifyClick = (val) => {
    setScreenType('verify');
    setPhone(val);
  };
  const onOTPSuccess = (data) => {
    // setScreenType('success');
    if (data?.accountVerified) {
      getUser();
      router.push('/dashboard');
    }
    setToken(data);
  };
  return (
    <main className="bg-white ">
      <div className="relative">
        {screenType == 'send' ? (
          <PhoneSignin onVerify={(val) => onVerifyClick(val)} />
        ) : screenType == 'verify' ? (
          <PhoneOtpVerify
            onSuccess={(data) => onOTPSuccess(data)}
            phoneNumber={phone}
          />
        ) : (
          <PhoneSuccess phone={phone} token={token} />
        )}
      </div>
    </main>
  );
}
