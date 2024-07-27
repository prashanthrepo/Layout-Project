'use client';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { useUser } from '@/hooks/useUserHook';
import { useQuery } from 'react-query';
import updateProfile from '@/apicalls/update-profile';
import ButtonLoader from '@/components/ButtonLoader';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function AccountPanel() {
  const { user, getUser } = useUser();
  const { mutate, isLoading, data, error } = useMutation(updateProfile);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);

  const [errors, setErrors] = useState(null);

  const validate = () => {
    let errors = {};
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;

    if (!firstName) {
      errors['firstName'] = 'First name is required';
    }
    if (!lastName) {
      errors['lastName'] = 'Last name is required';
    }
    if (!email || email.trim() === '') {
      errors['email'] = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors['email'] = 'Email is invalid';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    const payload = {
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      email: emailRef.current.value,
    };

    if (payload.first_name === user?.first_name) {
      delete payload.first_name;
    }
    if (payload.last_name === user?.last_name) {
      delete payload.last_name;
    }
    if (payload.email === user?.email) {
      delete payload.email;
    }

    if (Object.keys(payload).length === 0) {
      return;
    }

    mutate(payload);
  };

  useEffect(() => {
    if (user) {
      firstNameRef.current.value = user?.first_name ?? '';
      lastNameRef.current.value = user?.last_name ?? '';
      emailRef.current.value = user?.email ?? '';
    }
  }, [user]);

  useEffect(() => {
    if (data?.status === 200) {
      getUser();
      toast.success('Profile updated successfully');
    }
  }, [data]);

  return (
    <div className="grow">
      <div className="p-6 space-y-6">
        <h2 className="text-2xl text-slate-800 font-bold mb-5">Profile</h2>
        <section>
          <div>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="pp-label" htmlFor="first-name">
                    First name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="first-name"
                    className="pp-input"
                    type="text"
                    ref={firstNameRef}
                  />
                  {errors?.firstName && (
                    <p className="text-sm text-rose-500">{errors?.firstName}</p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="pp-label" htmlFor="last-name">
                    Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="last-name"
                    className="pp-input"
                    type="text"
                    ref={lastNameRef}
                  />
                  {errors?.lastName && (
                    <p className="text-sm text-rose-500">{errors?.lastName}</p>
                  )}
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="pp-label" htmlFor="card-expiry">
                    Phone number
                  </label>
                  <input
                    id="card-expiry"
                    className="pp-input disabled:bg-slate-200"
                    type="tel"
                    defaultValue={user?.phone_number}
                    disabled
                  />
                </div>
                <div className="flex-1">
                  <label className="pp-label" htmlFor="card-email">
                    Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="card-email"
                    className="pp-input"
                    type="email"
                    ref={emailRef}
                  />
                  {errors?.email && (
                    <p className="text-sm text-rose-500">{errors?.email}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer>
        <div className="flex flex-col px-6 py-5 border-t border-slate-200">
          <div className="flex self-center">
            <Link
              href="/dashboard"
              className="mr-2 btn border-slate-200 hover:border-slate-300  text-slate-600">
              Close
            </Link>
            <ButtonLoader
              onClick={() => {
                handleSubmit();
              }}
              text={isLoading ? 'Saving...' : 'Save Changes'}
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
