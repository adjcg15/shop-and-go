import { Metadata } from "next";
import { OrdersWrapper } from "./_components/OrdersWrapper";

export const metadata: Metadata = {
  title: "Pedidos para asignar a repartidor"
};

export default async function OrdersAssignmentPage() {
  return (
    <main className="px-4 sm:px-8 lg:px-12 max-w-screen-2xl mx-auto pt-8 pb-16">
      <h1 className="mb-5">Pedidos por validar</h1>

      <OrdersWrapper/>
    </main>
  );
}