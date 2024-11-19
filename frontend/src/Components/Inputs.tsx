import React, { FC, ChangeEvent } from "react";

interface InputProps {
  placeholder?: string;
  type?: string;
  name?: string;
  id?: string;
  autoComplete?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value?: string | number | string[];
  checked?: boolean;
}

export const Input: FC<InputProps> = ({
  placeholder = "",
  type = "text",
  name,
  id,
  autoComplete,
  onChange,
  className = "",
  value = "",
  checked,
  ...props
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
      value={value}
      className={`input p-2 ${className}`}
      onChange={onChange}
      checked={checked}
      {...props}
    />
  );
};
