import { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
};

export const PrimaryButton: FC<IProps> = (props) => {
  return (
    <button
      {...props}
      className={`bg-blue-600 hover:bg-blue-700 py-3 px-5 rounded-full text-white font-medium ${props.className}`}
    >
      {props.children}
    </button>
  );
}