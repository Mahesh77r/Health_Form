import React, { FC } from "react";

interface LabelProps {
  htmlFor?: string;
  title: string;
  className?: string;
}

export const Label: FC<LabelProps> = ({ htmlFor = "label", title, className = "" }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-gray-700 text-sm font-bold ${className}`}
    >
      {title}
    </label>
  );
};
