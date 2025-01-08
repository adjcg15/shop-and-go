import { IconButton } from "@/components/buttons/IconButton";
import Link from "next/link";
import { ButtonHTMLAttributes, FC } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";

type ShoppingCartButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const ShoppingCartButton:FC<ShoppingCartButtonProps> = (props) => {
  return (
    <Link href="/carrito">
      <IconButton 
        {...props}
        className={`bg-white hover:bg-gray-50 ${props.className}`}
        title="Carrito de compras"
      >
        <MdOutlineShoppingCart className="text-gray-800"/>
      </IconButton>
    </Link>
  );
}