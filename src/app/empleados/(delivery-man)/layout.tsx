import { LogoutButton } from "@/components/buttons/LogoutButton";
import { Navbar } from "@/components/ui/Navbar";
import { NavbarLink } from "@/types/types/components/navbar";
import { useMemo } from "react";

export default function DeliveryManPanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const links = useMemo<NavbarLink[]>(() => ([
    { label: "Pedidos por entregar", route: "/empleados/pedidos-asignados" }
  ]), []);

  return (
    <>
      <header className="border-b border-gray-300 fixed top-0 w-full bg-white z-20">
        <div className="px-3 md:px-12 max-w-screen-2xl py-2 md:py-5 mx-auto flex items-center justify-between">
          <Navbar links={links} />
          <LogoutButton/>
        </div>
      </header>
      <div className="mt-16 md:mt-24">
        {children}
      </div>
    </>
  );
}