import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { TernaryButton } from "@/components/buttons/TernaryButton";
import { Order } from "@/types/types/model/orders";
import { formatPlainAddressString } from "@/utils/address";
import { formatCommonTime, formatDDMMYYY } from "@/utils/date";
import { AdvancedMarker, Map, Pin } from "@vis.gl/react-google-maps";
import { FC } from "react";

type OrderToDeliverCardProps = {
  order: Order;
};

export const OrderToDeliverCard:FC<OrderToDeliverCardProps> = ({ order }) => {
  const purchaseDate = new Date(order.dateOfPurchase);

  return (
    <article className="p-8 rounded-lg border border-gray-300">
      <header className="flex flex-col-reverse sm:flex-row sm:justify-between">
        <TernaryButton className="w-full sm:w-auto text-red-600 hover:text-red-700">Reportar incidencia</TernaryButton>
        <PrimaryButton className="w-full sm:w-auto mt-3 sm:mt-0">Entregar</PrimaryButton>
      </header>

      <main className="mt-5">
        <section>
          <p className="font-bold"><small>Fecha de solicitud</small></p>
          <p className="text-2xl font-bold">{`${formatDDMMYYY(purchaseDate)} - ${formatCommonTime(purchaseDate)}`}</p>
        </section>

        <section className="mt-3">
          <p className="font-bold"><small>Entregar en</small></p>
          <p>{formatPlainAddressString(order.deliveryAddress!)}</p>

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

        <section className="mt-3">
          <p className="font-bold"><small>Entregar a</small></p>
          <p>{order.client!.fullName}</p>
        </section>

        <section className="mt-3">
          <p className="font-bold"><small>Contacto del cliente</small></p>
          <p>{order.client!.phoneNumber}</p>
        </section>
      </main>
    </article>
  );
}
