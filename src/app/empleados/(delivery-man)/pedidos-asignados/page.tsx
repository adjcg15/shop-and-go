import { Metadata } from "next";
import { OrdersList } from "./_components/OrdersList";

export const metadata: Metadata = {
  title: "Pedidos pendientes por entregar",
};

export default function AssignedOrdersPage() {
  return (
    <main className="px-4 sm:px-8 lg:px-12 max-w-screen-2xl mx-auto pt-8 pb-16">
      <h1>Pedidos pendientes por entregar</h1>
      <OrdersList/>
    </main>
  );
}