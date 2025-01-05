"use client";
import { formatMXNCurrency } from "@/utils/currency";
import { useCart } from "../_hooks/useCart";
import { CartItems } from "./CartItems";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";

export const ShoppingCart = () => {
  const { items, total } = useCart();

  return (
    <>
      <CartItems items={items} />
        {items.length !== 0 && (
          <footer className="flex items-end justify-between mt-8">
            <p className="font-bold text-2xl">
            Total: <span className="text-orange-500">{formatMXNCurrency(total)}</span>
            </p>
            <PrimaryButton>Realizar pedido</PrimaryButton>
          </footer>
        )}
    </>
  );
};
