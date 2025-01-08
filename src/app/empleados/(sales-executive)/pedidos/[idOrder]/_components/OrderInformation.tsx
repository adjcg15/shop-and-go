import { Order } from "@/types/types/model/orders"
import { formatPlainAddressString } from "@/utils/address";
import { formatMXNCurrency } from "@/utils/currency";
import { formatCommonTime, formatDDMMYYY } from "@/utils/date";
import { FC } from "react";

type OrderInformationProps = {
  order: Order;
}

export const OrderInformation: FC<OrderInformationProps> = ({ order }) => {
  return (
    <div className="mt-8">
      <section>
        <h2>Detalles del pedido</h2>

        <div className="mt-3">
          <p className="font-bold">Fecha de solicitud</p>
          <p className="text-lg">{`${formatDDMMYYY(new Date(order.dateOfPurchase))} - ${formatCommonTime(new Date(order.dateOfPurchase))}`}</p>
        </div>

        <div className="mt-3">
          <p className="font-bold">Entrega en</p>
          <p className="text-lg">{formatPlainAddressString(order.deliveryAddress!)}</p>
        </div>

        <div className="mt-3">
          <p className="font-bold">Cliente</p>
          <p className="text-lg">{order.client!.fullName}</p>
        </div>
      </section>
      <section className="mt-8">
        <h2>Productos</h2>

        <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-300"
        >
          <table className="w-full min-w-[500px] mt-3">
            <thead className="bg-gray-50">
              <tr>
                <th className="uppercase py-3 px-5">Producto</th>
                <th className="uppercase py-3 px-5 text-center">Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {
                order.products!.map(product => (
                  <tr key={product.id} className="border-b border-gray-300">
                    <td className="py-3 px-5">{product.name}</td>
                    <td className="py-3 px-5 text-center">{product.OrderProduct!.amount}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex items-center justify-end">
          <p className="font-bold mr-3">Total:</p>
          <p className="text-lg font-bold text-orange-600">{
            formatMXNCurrency(
              order.products!.reduce(
                (sum, product) => sum + product.salePrice * product.OrderProduct!.amount, 
                0
              )
            )
          }</p>
        </div>
      </section>
    </div>
  )
}
