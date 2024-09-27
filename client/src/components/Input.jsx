import React, { forwardRef } from "react";

const Input = forwardRef(({ type = "text", placeholder = "", value, onChange, className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`p-2 rounded-xl border w-full bg-transparent placeholder:text-gray-500 text-gray-500 text-sm border border-slate-200 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow ${className}`}
      {...props}
    />
  );
});

export default Input;
