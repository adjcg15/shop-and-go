"use client";
import { formatMXNCurrency } from "@/utils/currency";
import { useCart } from "../_hooks/useCart";
import { CartItems } from "./CartItems";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import Link from "next/link";
import { useContext } from "react";
import AuthContext from "@/contexts/auth/context";

export const ShoppingCart = () => {
    const { items, total } = useCart();
    const { clientProfile } = useContext(AuthContext);

    return (
        <>
            <CartItems items={items} />
            {items.length !== 0 && (
                <footer className="flex items-end justify-between mt-8">
                    <p className="font-bold text-2xl">
                        Total:{" "}
                        <span className="text-orange-500">
                            {formatMXNCurrency(total)}
                        </span>
                    </p>
                    <Link
                        href={
                            clientProfile
                                ? "/confirmar-pedido"
                                : "/iniciar-sesion"
                        }
                    >
                        <PrimaryButton>Realizar pedido</PrimaryButton>
                    </Link>
                </footer>
            )}
        </>
    );
};
