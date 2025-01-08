import { redirect } from "next/navigation";
import { OrderByIdWrapper } from "./_components/OrderByIdWrapper";

export async function generateMetadata({ params }: { params: Promise<{ idOrder: string }> }) {
  const { idOrder } = await params;
  return {
    title: `Pedido para asignar ${idOrder.padStart(6, "0")}`,
  };
}

export default async function OrderToAssignPage({
  params,
}: {
  params: Promise<{ idOrder: string }>
}) {
  const { idOrder } = await params;
  const parsedIdOrder = Number(idOrder);

  if(isNaN(parsedIdOrder)) {
    redirect("/empleados/pedidos");
  }
  
  return (
    <main className="px-4 sm:px-8 lg:px-12 max-w-screen-2xl mx-auto pt-8 pb-16">
      <h1 className="mb-5">Pedidos por validar</h1>

      <OrderByIdWrapper idOrder={parsedIdOrder} />
    </main>
  )
}
