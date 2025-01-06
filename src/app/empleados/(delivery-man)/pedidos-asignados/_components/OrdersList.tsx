"use client";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useEffect } from "react";
import { useOrdersToDeliverList } from "../_hooks/useOrdersToDeliverList";
import { ErrorBanner } from "@/components/ui/ErrorBanner";
import { OrderToDeliverCard } from "./OrderToDeliverCard";
import { OrderToDeliverCardSkeleton } from "./OrderToDeliverCardSkeleton";

export const OrdersList = () => {
  const {
    ordersToDeliver,
    recoverOrdersToDeliver
  } = useOrdersToDeliverList();

  useEffect(() => {
    recoverOrdersToDeliver();
  }, [recoverOrdersToDeliver]);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY || ""}>
      {
        ordersToDeliver.error
        ? (
          <ErrorBanner
            image={{
              src: "/illustrations/server-error.svg",
              alt: "Ilustración representativa de un error en un servidor"
            }}
            title="¡Problemas técnicos!"
            message={ordersToDeliver.error}
          />
        )
        : (
          <ul className="lg:grid lg:grid-cols-2 lg:gap-4 mt-3">
            {
              ordersToDeliver.loading
              ? (
                Array.from({ length: 6 }, (_, index) => (
                  <li key={index} className="mb-4 lg:mb-0">
                    <OrderToDeliverCardSkeleton/>
                  </li>
                ))
              )
              : (
                ordersToDeliver.value.length > 0
                ? (
                  ordersToDeliver.value.map(order => (
                    <li className="mb-4 lg:mb-0" key={order.id}>
                      <OrderToDeliverCard order={order}/>
                    </li>
                  ))
                )
                : (
                  <div className="col-span-full">
                    <ErrorBanner
                      image={{
                        src: "/illustrations/empty-cart.svg",
                        alt: "Imagen representativa de un carrito de compras vacío",
                      }}
                      title={"Lista vacía"}
                      message={`Parece ser que aún no tienes pedidos para entregar.`}
                    />
                  </div>
                )
              )
            }
          </ul>
        )
      }
    </APIProvider>
  );
}
