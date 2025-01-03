import { ButtonHTMLAttributes, FC, ReactNode } from "react";

type SecondaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: ReactNode;
};

export const SecondaryButton: FC<SecondaryButtonProps> = (props) => {
    return (
        <button
            {...props}
            className={`text-sm sm:text-base bg-white hover:bg-gray-50 disabled:bg-gray-100 py-3 px-5 rounded-full font-medium border border-gray-300 disabled:text-gray-400 ${props.className}`}
        >
            {props.children}
        </button>
    );
};
