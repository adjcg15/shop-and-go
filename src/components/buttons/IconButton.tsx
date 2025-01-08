import { ButtonHTMLAttributes, FC, ReactNode } from "react";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
};

export const IconButton: FC<IconButtonProps> = (props) => {
  return (
    <button
      {...props}
      className={`bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 p-3 rounded-full text-white font-medium ${props.className} text-2xl`}
    >
      {props.children}
    </button>
  );
}