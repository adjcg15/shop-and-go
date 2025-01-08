import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { TernaryButton } from "@/components/buttons/TernaryButton";
import { Order } from "@/types/types/model/orders";
import { formatPlainAddressString } from "@/utils/address";
import { formatCommonTime, formatDDMMYYY } from "@/utils/date";
import { AdvancedMarker, Map, Pin } from "@vis.gl/react-google-maps";
import { FC } from "react";

type OrderToDeliverCardProps = {
  order: Order;
  startIncidentCreation: (idOrder: number) => void;
  startDeliveryConfirmation: (idOrder: number) => void;
};

export const OrderToDeliverCard:FC<OrderToDeliverCardProps> = ({ order, startIncidentCreation, startDeliveryConfirmation }) => {
  const purchaseDate = new Date(order.dateOfPurchase);

  return (
    <article className="p-8 rounded-lg border border-gray-300 mb-5">
      <header className="flex flex-col-reverse sm:flex-row sm:justify-between lg:justify-end">
        <TernaryButton 
          onClick={() => startIncidentCreation(order.id)}
          className="w-full sm:w-auto text-red-600 hover:text-red-700 mt-3 sm:mt-0"
          aria-describedby={`reportIncidentBtnDescription${order.id}`}
        >
          Reportar incidencia
        </TernaryButton>
        <p className="sr-only" id={`reportIncidentBtnDescription${order.id}`}>Abrir la ventana para registrar un nuevo reporte de la incidencia</p>
        <PrimaryButton 
          aria-describedby="deliverOrderBtnDescription" 
          className="w-full sm:w-auto lg:ml-3"
          onClick={() => startDeliveryConfirmation(order.id)}
        >
          Entregar
        </PrimaryButton>
        <p className="sr-only" id="deliverOrderBtnDescription">Abrir la ventana de confirmación para marcar el pedido como entregado</p>
      </header>

      <main className="mt-5 lg:grid lg:grid-cols-2 lg:gap-10">
        <section>
          <div>
            <p className="font-bold"><small>Fecha de solicitud</small></p>
            <p className="text-2xl font-bold">{`${formatDDMMYYY(purchaseDate)} - ${formatCommonTime(purchaseDate)}`}</p>
          </div>

          <div className="mt-3">
            <p className="font-bold"><small>Entregar en</small></p>
            <p>{formatPlainAddressString(order.deliveryAddress!)}</p>
          </div>

          <div className="border border-gray-300 rounded-lg h-72 overflow-hidden mt-1">
            <Map
              style={{width: "100%", height: "100%"}}
              defaultCenter={{lat: order.deliveryAddress!.latitude, lng: order.deliveryAddress!.longitude}}
              defaultZoom={17}
              gestureHandling="none"
              disableDefaultUI={true}
              id={`map-${order.id}`}
              mapId={`map-${order.id}`}
              reuseMaps
              scrollwheel={false}
              keyboardShortcuts={false}
            >
              <AdvancedMarker position={{lat: order.deliveryAddress!.latitude, lng: order.deliveryAddress!.longitude}}>
                <Pin
                  background="#f97316"
                  borderColor="transparent"
                  glyphColor="#fed7aa"
                />
              </AdvancedMarker>
            </Map>
          </div>
        </section>

        <div>
          <section className="mt-5 lg:mt-0">
            <h2>Productos para entregar</h2>

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
          </section>

          <section className="mt-5 lg:mt-10">
            <h2>Información del cliente</h2>

            <div className="mt-3">
              <p className="font-bold"><small>Nombre</small></p>
              <p>{order.client!.fullName}</p>
            </div>

            <div className="mt-1">
              <p className="font-bold"><small>Número de contacto</small></p>
              <p>{order.client!.phoneNumber}</p>
            </div>
          </section>
        </div>
      </main>
    </article>
  );
}
