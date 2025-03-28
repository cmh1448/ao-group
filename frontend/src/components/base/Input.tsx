import clsx from "clsx";
import { InputHTMLAttributes, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, ...props }: InputProps) {
  const [focus, setFocus] = useState(false);

  return (
    <>
      <div
        className={clsx(
          "border-b-2 transition-colors",
          {
            "border-blue-500": focus,
            "border-red-500": error,
          },
          props.className
        )}
      >
        <div className={"text-gray-400 text-sm"}>{label}</div>
        <input
          {...props}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={clsx(
            "focus:outline-none text-2xl py-1 w-full bg-transparent"
          )}
        />
      </div>
      {error && <div className={"text-red-500 text-sm mt-1"}>{error}</div>}
    </>
  );
}
