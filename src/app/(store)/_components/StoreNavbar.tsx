"use client";
import { IconButton } from "@/components/buttons/IconButton";
import { LogoutButton } from "@/components/buttons/LogoutButton";
import { Navbar } from "@/components/ui/Navbar";
import AuthContext from "@/contexts/auth/context";
import UserRoles from "@/types/enums/user_roles";
import { NavbarLink } from "@/types/types/components/navbar";
import { useContext, useMemo } from "react";
import { FaRegUser } from "react-icons/fa";
import { ShoppingCartButton } from "./ShoppingCartButton";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { TernaryButton } from "@/components/buttons/TernaryButton";
import Link from "next/link";

export const StoreNavbar = () => {
  const { role } = useContext(AuthContext);
  const guestLinks = useMemo<NavbarLink[]>(() => ([
    { label: "Dirección de entrega", route: "/" },
    { label: "Productos", route: "/catalogo" }
  ]), []);
  const clientLinks = useMemo<NavbarLink[]>(() => ([
    ...guestLinks,
    { label: "Mis pedidos", route: "/clientes/pedidos" },
  ]), [guestLinks]);

  return (
    <div className="px-3 md:px-12 max-w-screen-2xl py-5 mx-auto flex md:items-center justify-between">
      <Navbar links={role === UserRoles.CLIENT ? clientLinks : guestLinks } />
      <div>
        {
          role === UserRoles.CLIENT
          ? (
            <div>
              <ShoppingCartButton className="mr-3"/>
              <IconButton className="bg-white hover:bg-gray-50 mr-3">
                <FaRegUser className="text-gray-800"/>
              </IconButton>
              <LogoutButton/>
            </div>
          )
          : (
            <div className="flex flex-wrap md:items-center">
              <Link href="/iniciar-sesion">
                <TernaryButton className="mr-3">Iniciar sesión</TernaryButton>
              </Link>
              <Link href="/crear-cuenta" className="no-underline">
                <SecondaryButton className="hidden md:block mr-5">Crear cuenta</SecondaryButton>
              </Link>
              <ShoppingCartButton/>
            </div>
          )
        }
      </div>
    </div>
  );
}
