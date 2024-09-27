import React from "react";

const Button = ({
  type = "button",
  onClick,
  className = "",
  children,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-2 px-4 bg-[#4481ff] text-white font-semibold rounded-lg hover:bg-[#254a94] focus:outline-none focus:ring-0 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
