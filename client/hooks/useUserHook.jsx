'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import requestOTPApi from '@/apicalls/request-otp';
import validateOTPApi from '@/apicalls/validate-otp';
import getSelfApi from '@/apicalls/get-self';

const UserContext = createContext();
const loggedInUser = localStorage.getItem('user');

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(loggedInUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
    setLoading(false);
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
    setUser(res?.data);
    localStorage.setItem('user', JSON.stringify(res?.data));
  };

  const logout = () => {
    setUser(null);
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
