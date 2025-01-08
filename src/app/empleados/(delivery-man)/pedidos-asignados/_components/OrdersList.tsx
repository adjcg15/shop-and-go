"use client";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useEffect } from "react";
import { useOrdersToDeliverList } from "../_hooks/useOrdersToDeliverList";
import { ErrorBanner } from "@/components/ui/ErrorBanner";
import { OrderToDeliverCard } from "./OrderToDeliverCard";
import { OrderToDeliverCardSkeleton } from "./OrderToDeliverCardSkeleton";
import { CreateIncidentModal } from "./CreateIncidentModal";
import { useCreateIncident } from "../_hooks/useCreateIncident";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { useConfirmDelivery } from "../_hooks/useConfirmDelivery";

export const OrdersList = () => {
  const {
    ordersToDeliver,
    recoverOrdersToDeliver,
    onOrderRemoved
  } = useOrdersToDeliverList();

  const {
    isCreatingIncident,
    discardIncidentCreation,
    startIncidentCreation,
    incidentForm
  } = useCreateIncident(onOrderRemoved);

  const {
    isConfirmingDelivery,
    discardDeliveryConfirmation,
    startDeliveryConfirmation,
    deliverOrder
  } = useConfirmDelivery(onOrderRemoved);

  useEffect(() => {
    recoverOrdersToDeliver();
  }, [recoverOrdersToDeliver]);

  return (
    <>
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
            <ul className="lg:grid mt-3">
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
                        <OrderToDeliverCard 
                          startDeliveryConfirmation={startDeliveryConfirmation}
                          startIncidentCreation={startIncidentCreation}
                          order={order}
                        />
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
      <CreateIncidentModal 
        isOpen={isCreatingIncident}
        handleCloseModal={discardIncidentCreation}
        formState={incidentForm}
      />
      <ConfirmationModal
        isOpen={isConfirmingDelivery}
        onClose={discardDeliveryConfirmation}
        onConfirm={deliverOrder}
        primaryButtonText="Confirmar entrega"
        secondaryButtonText="Descartar"
        title="Confirmar entrega"
        message="¿Esta seguro que desea confirmar la entrega del pedido? Una vez entregado, este dejará de mostrarse en la lista"
      />
    </>
  );
}
