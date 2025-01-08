import { ButtonHTMLAttributes, FC, ReactNode } from "react";

type TernaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
};

export const TernaryButton: FC<TernaryButtonProps> = (props) => {
  return (
    <button
      {...props}
      className={`text-base bg-white py-3 px-5 rounded-full font-medium text-blue-600 hover:text-blue-800 disabled:text-gray-400 ${props.className}`}
    >
      {props.children}
    </button>
  );
}