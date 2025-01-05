import { Metadata } from "next";
import { ShoppingCart } from "./_components/ShoppingCart";

export const metadata: Metadata = {
  title: "Carrito de compras",
};

export default function ShoppingCartPage() {
  return (
    <main className="px-4 sm:px-8 lg:px-12 h-full max-w-screen-2xl mx-auto pt-8 pb-16">
      <header
        aria-labelledby="shopping-cart-header"
        className="flex flex-col items-center"
      >
        <h1 className="text-2xl sm:text-3xl" id="shopping-cart-heading">Mi carrito de compras</h1>
      </header>
      <ShoppingCart />
    </main>
  );
}
