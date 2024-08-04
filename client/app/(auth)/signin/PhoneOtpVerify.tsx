import React, { useEffect } from 'react';
import Link from 'next/link';
import AuthHeader from '../auth-header';
import AuthImage from '../auth-image';
import otpImage from '@/public/images/otp-input.svg';
import { useState } from 'react';
// import OTPInput from './OTPInput';
import Image from 'next/image';
import ButtonLoader from '@/components/ButtonLoader';
import { useUser } from '@/hooks/useUserHook';
import OtpInput from 'react-otp-input';

export default function PhoneOtpVerify({ phoneNumber, onSuccess }) {
  const { validateOtp, requestOTP } = useUser();
  const [otp, setOtp] = useState(null);
  const [resendOtpText, setResendOtpText] = useState('Resend OTP in ');
  const [timer, setTimer] = useState(30);
  const onValidateOtpFn = () => {
    const res = validateOtp({
      phone_number: phoneNumber,
      otp: otp,
    });
    res?.then((res) => {
      if (res?.status == 200) {
        if (res?.data?.token) {
          localStorage.setItem('authToken', res?.data?.token);
          onSuccess(res?.data);
        }
      }
    });
  };
  const onResendOtpFn = () => {
    const response = requestOTP({ phone_number: phoneNumber });
    response?.then((res) => {
      if (res?.status == 200) {
        setTimer(60);
        setResendOtpText('New OTP sent, Resend OTP in ');
      }
    });
  };
  useEffect(() => {
    if (otp && otp.length === 4) {
      onValidateOtpFn();
    }
  }, [otp]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="">
      <div className="flex flex-col after:flex-1">
        {/* <AuthHeader /> */}

        <div className=" max-w-sm mx-auto w-full px-4 py-8">
          <Image src={otpImage} className=" w-64 mx-auto" alt="OTP screen" />
          <div className=" my-10 grid gap-4 content-between">
            <div className="text-center">
              <h1 className="text-2xl text-slate-800 font-bold">
                Enter Verification Code
              </h1>
              <h4 className="text-sm font-medium">
                We are automatically detecting a SMS sent to your phone number
              </h4>
            </div>
            <form>
              <div className="">
                <div>
                  {/* <OTPInput
                    autoFocus
                    isNumberInput
                    length={4}
                    className="flex flex-row items-center justify-between mx-auto w-full max-w-xs"
                    inputClassName="otpInput"
                    onChangeOTP={(otp) => setOtp(otp)}
                  /> */}
                  <OtpInput
                    containerStyle="flex flex-row items-center justify-between mx-auto w-full px-10"
                    value={otp}
                    onChange={(otp) => setOtp(otp)}
                    numInputs={4}
                    inputStyle="border border-indigo-200 bg-indigo-50 rounded-lg px-4 py-2 outline-none focus:border-slate-600 h-14 w-14 text-center text-xl"
                    // renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} style={{}} />}
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
            {timer === 0 ? (
              <div className="text-sm text-center font-bold">
                Din't recieve the OTP? {` `}
                <ButtonLoader
                  text="Resend OTP"
                  onClick={() => onResendOtpFn()}
                  classes="btnlink"
                />
              </div>
            ) : (
              <div className="text-sm text-center font-bold">
                {resendOtpText}
                {timer}s
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
