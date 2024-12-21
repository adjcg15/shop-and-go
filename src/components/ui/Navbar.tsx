"use client";
import { NavbarLink } from "@/types/types/components/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

type NavbarProps = {
  links: NavbarLink[];
};

export const Navbar:FC<NavbarProps> = ({ links }) => {
  const pathname = usePathname();
  const baseLinkStyle = "py-3 mr-5 inline-block text-base font-medium no-underline transition-colors hover:text-blue-900";
  const activeLinkStyle = "py-3 mr-5 inline-block text-base font-medium no-underline transition-colors text-blue-600";

  return (
    <nav>
      <ul className="flex">
        {
          links.map(link => (
            <li key={link.route}>
              <Link 
                className={pathname === link.route ? activeLinkStyle : baseLinkStyle}
                href={link.route}
              >
                {link.label}
              </Link>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}
