import { ButtonHTMLAttributes, FC, ReactNode } from "react";

type CancelButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
};

export const CancelButton: FC<CancelButtonProps> = (props) => {
  return (
    <button
      {...props}
      className={`bg-red-600 hover:bg-red-700 disabled:bg-gray-300 py-3 px-5 rounded-full text-white font-medium ${props.className}`}
    >
      {props.children}
    </button>
  );
};
