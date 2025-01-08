import { NotificationTypes } from "@/types/enums/notifications";
import { NotificationInfo } from "@/types/types/components/notifications";
import { Order } from "@/types/types/model/orders";
import shopAndGoAPI from "@/utils/axios";
import { notify } from "@/utils/notifications";
import { AxiosError, isAxiosError } from "axios";
import { useCallback, useState } from "react";

export function useConfirmDelivery(onOrderDelivered: (idOrder: number) => void) {
  const [isConfirmingDelivery, setIsConfirmingDelivery] = useState(false);
  const [isSavingConfirmation, setIsSavingConfirmation] = useState(false);
  const [idOrder, setIdOrder] = useState(0);

  const startDeliveryConfirmation = useCallback((idOrder: number) => {
    setIdOrder(idOrder);
    setIsConfirmingDelivery(true);
  }, []);

  const discardDeliveryConfirmation = useCallback(() => {
    setIsConfirmingDelivery(false);
  }, []);

  const deliverOrder = useCallback(async () => {
    if(!isSavingConfirmation) {
      setIsSavingConfirmation(true);

      try {
        const { data: order } = await shopAndGoAPI.post<Order>("/orders/deliveries", { idOrder });
        notify({
          title: "Pedido entregado",
          message: "El pedido fue guardado como entregado",
          type: NotificationTypes.SUCCESS
        });
        onOrderDelivered(order.id);
        setIsConfirmingDelivery(false);
      } catch(error) {
        const notificationInfo: NotificationInfo = {
          title: "Error al guardar",
          message: "El sistema no logró actualizar el pedido, por favor intente en otro momento.",
          type: NotificationTypes.ERROR,
        };

        if (isAxiosError(error) && error.code === AxiosError.ERR_NETWORK) {
          notificationInfo.message =
            "No fue posible establecer una conexión para actualizar " +
            "el pedido. Verifique que su conexión a Internet es estable o intente más tarde.";
        }

        notify(notificationInfo);
      } finally {
        setIsSavingConfirmation(false);
      }
    }
  }, [idOrder, onOrderDelivered, isSavingConfirmation]);

  return {
    isConfirmingDelivery,
    discardDeliveryConfirmation,
    startDeliveryConfirmation,
    deliverOrder
  };
}