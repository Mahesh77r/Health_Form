import React, { FC, ChangeEvent } from "react";

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps {
  id?: string;
  name?: string;
  options: Option[];
  value: string | number;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  required?: boolean;
}

export const Select: FC<SelectProps> = ({
  id,
  name,
  options,
  value,
  onChange,
  className = "",
  required = false,
}) => {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${className}`}
      required={required}
    >
    <option value="" disabled>
        Select an option
      </option>
        
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
