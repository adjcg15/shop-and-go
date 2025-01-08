"use client";
import { ButtonHTMLAttributes, FC, useContext } from "react";
import { IconButton } from "./IconButton";
import { MdLogout } from "react-icons/md";
import AuthContext from "@/contexts/auth/context";

type LogoutButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const LogoutButton:FC<LogoutButtonProps> = (props) => {
  const { logout } = useContext(AuthContext);

  return (
    <IconButton 
      {...props}
      onClick={logout}
      className={`bg-red-600 hover:bg-red-700 ${props.className}`} 
      title="Cerrar sesión"
    >
      <MdLogout/>
    </IconButton>
  );
}
