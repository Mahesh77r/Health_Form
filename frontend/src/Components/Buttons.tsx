import React, { FC,FormEvent } from "react";

interface ButtonsProps {
  icon?: React.ReactNode;
  onclickfunction: (e?: FormEvent) => void | Promise<void>;
  title: string;
  className?: string;
  disabled?:boolean;
}

export const Buttons: FC<ButtonsProps> = ({
  icon,
  onclickfunction,
  title,
  className = "",
  disabled
}) => {
  return (
    <button
      type="button"
      onClick={(e) =>onclickfunction(e)}
      className={`inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${className}`}
      disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {title}
    </button>
  );
};
