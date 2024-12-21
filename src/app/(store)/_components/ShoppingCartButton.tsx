import { IconButton } from "@/components/buttons/IconButton";
import { ButtonHTMLAttributes, FC } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";

type ShoppingCartButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const ShoppingCartButton:FC<ShoppingCartButtonProps> = (props) => {
  return (
    <IconButton 
      {...props}
      className={`bg-white hover:bg-gray-50 ${props.className}`}
      title="Carrito de compras"
    >
      <MdOutlineShoppingCart className="text-gray-800"/>
    </IconButton>
  );
}