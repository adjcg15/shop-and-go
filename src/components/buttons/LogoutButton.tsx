"use client";
import { useContext } from "react";
import { IconButton } from "./IconButton";
import { MdLogout } from "react-icons/md";
import AuthContext from "@/contexts/auth/context";

export const LogoutButton = () => {
  const { logout } = useContext(AuthContext);

  return (
    <IconButton onClick={logout} className="bg-red-600 hover:bg-red-700" title="Cerrar sesión">
      <MdLogout/>
    </IconButton>
  );
}
