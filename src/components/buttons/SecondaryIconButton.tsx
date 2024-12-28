import { ButtonHTMLAttributes, FC, ReactNode } from "react";

type SecondaryIconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
};

export const SecondaryIconButton: FC<SecondaryIconButtonProps> = (props) => {
  return (
    <button
      {...props}
      className={`bg-transparent disabled:bg-gray-100 border border-blue-300 hover:border-blue-400 disabled:border-gray-300 p-3 rounded-full text-blue-600 hover:text-blue-700 disabled:text-gray-400 font-medium ${props.className} text-2xl`}
    >
      {props.children}
    </button>
  );
}