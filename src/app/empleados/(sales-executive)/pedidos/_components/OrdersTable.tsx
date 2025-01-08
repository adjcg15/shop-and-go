import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Order } from "@/types/types/model/orders"
import { formatPlainAddressString } from "@/utils/address";
import { formatCommonTime, formatDDMMYYY } from "@/utils/date";
import Link from "next/link";
import { FC } from "react"

type OrdersTableProps = {
  orders: Order[];
};

export const OrdersTable: FC<OrdersTableProps> = ({ orders }) => {
  return (
      <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300"
      >
      <table className="w-full min-w-[500px]">
        <thead className="bg-gray-50">
          <tr>
            <th className="uppercase py-3 px-5 text-left">Pedido</th>
            <th className="uppercase py-3 px-5 text-center">Acción</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="text-center border-b border-gray-300">
              <td className="py-3 px-5 text-left">
                <p className="font-bold">{`${formatDDMMYYY(new Date(order.dateOfPurchase))} - ${formatCommonTime(new Date(order.dateOfPurchase))}`}</p>
                <p>{formatPlainAddressString(order.deliveryAddress!)}</p>
              </td>
              <td className="py-3 px-5 whitespace-nowrap">
                <Link href={`/empleados/pedidos/${order.id}`} className="p-0 m-0">
                  <PrimaryButton aria-describedby={`assignOrderButtonDescription${order.id}`}>Asignar repartidor</PrimaryButton>
                  <p className="sr-only" id={`assignOrderButtonDescription${order.id}`}></p>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
