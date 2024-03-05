/* eslint-disable react/jsx-props-no-spreading */
import React, { memo, useRef, useLayoutEffect, useEffect } from 'react';
import usePrevious from './usePrevious';

export interface SingleOTPInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  focus?: boolean;
}

export function SingleOTPInputComponent(props: SingleOTPInputProps) {
  const { focus, autoFocus, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const prevFocus = usePrevious(!!focus);
  useLayoutEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus();
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [autoFocus, focus, prevFocus]);

  return (
    <div className="w-16 h-16 ">
      <input
        ref={inputRef}
        {...rest}
        className={
          'w-full h-full text-white focus:text-indigo-100 font-semibold flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border-0 border-indigo-100 text-xl bg-indigo-100 focus:bg-indigo-200  ' +
          (props?.value != '' ? 'bg-indigo-500' : 'bg-indigo-50')
        }
        type="number"
        inputMode="numeric"
      />
    </div>
  );
}

const SingleOTPInput = memo(SingleOTPInputComponent);
export default SingleOTPInput;
