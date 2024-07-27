import React from 'react';

export default function NodataHtml({ text }) {
  return (
    <div className="flex justify-center m-auto align-middle rounded-sm border px-5 py-4 bg-white border-slate-200">
      <span className=" text-slate-700 font-medium text-sm px-4 py-28 ">
        {text}
      </span>
    </div>
  );
}
