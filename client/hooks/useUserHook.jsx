'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import requestOTPApi from '@/apicalls/request-otp';
import validateOTPApi from '@/apicalls/validate-otp';
import getSelfApi from '@/apicalls/get-self';
import { useRouter } from 'next/navigation';
const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedInUser = localStorage.getItem('user') || null;
      if (loggedInUser !== 'undefined') {
        setUser(JSON.parse(loggedInUser));
        setLoading(false);
      }
    }
  }, []);

  const requestOTP = (phoneNumber) => {
    return requestOTPApi(phoneNumber);
  };

  const validateOtp = (payload) => {
    const response = validateOTPApi(payload);
    return response;
  };

  const getUser = () => {
    const res = getSelfApi();
    res?.then((res) => {
      setUser(res?.data);
      localStorage.setItem('user', JSON.stringify(res?.data));
    });
  };

  const logout = () => {
    console.log('logout');
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    setUser(null);
    router.push('/');
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        logout,
        requestOTP,
        validateOtp,
        getUser,
        setUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
