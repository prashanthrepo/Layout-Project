import React from 'react';

export default function NodataHtml({ text }) {
  return (
    <div className="flex justify-center m-auto align-middle shadow-lg rounded-sm border px-5 py-4 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
      <span className=" text-slate-700 font-medium text-sm px-4 dark:text-slate-200 py-28 ">
        {text}
      </span>
    </div>
  );
}
