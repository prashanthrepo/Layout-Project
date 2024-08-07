'use client';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import React from 'react';
export default function MobileNav() {
  const segments = useSelectedLayoutSegments();
  return (
    <div>
      <div className="fixed bottom-0 left-0 z-50 w-full h-20 bg-white border-t border-gray-200">
        <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium pb-2">
          <Link
            href="/"
            className="inline-flex flex-col items-center justify-center px-1 hover:bg-gray-50 group">
            <svg
              className={`w-5 h-5 mb-1 ${
                segments.length === 0 ? 'text-indigo-500' : 'text-slate-600'
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            <span
              className={`text-sm ${
                segments.length === 0 ? 'text-indigo-500' : 'text-slate-600'
              }`}>
              Home
            </span>
          </Link>
          <Link
            href="/properties"
            className="inline-flex flex-col items-center justify-center px-1 hover:bg-gray-50 group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`w-5 h-5 mb-1 ${
                segments.includes('property')
                  ? 'text-indigo-500'
                  : 'text-slate-600'
              }`}>
              <path d="M15 3.75H9v16.5h6V3.75ZM16.5 20.25h3.375c1.035 0 1.875-.84 1.875-1.875V5.625c0-1.036-.84-1.875-1.875-1.875H16.5v16.5ZM4.125 3.75H7.5v16.5H4.125a1.875 1.875 0 0 1-1.875-1.875V5.625c0-1.036.84-1.875 1.875-1.875Z" />
            </svg>

            <span
              className={`text-sm ${
                segments.includes('property')
                  ? 'text-indigo-500'
                  : 'text-slate-600'
              }`}>
              Layouts
            </span>
          </Link>
          <Link
            href="/contacts"
            type="button"
            className="inline-flex flex-col items-center justify-center px-1 hover:bg-gray-50 group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="shrink-0 h-6 w-6">
              <path
                className={`fill-current ${
                  segments.includes('contacts')
                    ? 'text-indigo-500'
                    : 'text-slate-600'
                }`}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z"
              />
            </svg>
            <span
              className={`text-sm ${
                segments.includes('contacts')
                  ? 'text-indigo-500'
                  : 'text-slate-600'
              }`}>
              Contacts
            </span>
          </Link>
          <Link
            href="/profile"
            className="inline-flex flex-col items-center justify-center px-1 hover:bg-gray-50 group">
            <svg
              className={`w-5 h-5 mb-1 ${
                segments.includes('profile')
                  ? 'text-indigo-500'
                  : 'text-slate-600'
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            <span
              className={`text-sm ${
                segments.includes('profile')
                  ? 'text-indigo-500'
                  : 'text-slate-600'
              }`}>
              Profile
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
