import { CreateOrderToDeliverErrorCodes } from "@/types/enums/error_codes";
import { NotificationTypes } from "@/types/enums/notifications";
import { NotificationInfo } from "@/types/types/components/notifications";
import shopAndGoAPI from "@/utils/axios";
import { isClientErrorHTTPCode } from "@/utils/http";
import { notify } from "@/utils/notifications";
import { AxiosError, isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export function useAssignOrder(idOrder: number) {
  const router = useRouter();
  const [isProcessingAssignation, setIsProcessingAssignation] = useState(false);
  const [isConfirmatingAssignation, setIsConfirmatingAssignation] = useState(false);
  const {
    register,
    handleSubmit: submitWrapper,
    formState: { errors },
    getValues
  } = useForm({
    defaultValues: { idDeliveryMan: 0 }
  });

  const discardDeliveryManAssignation = useCallback(() => {
    setIsConfirmatingAssignation(false);
  }, []);

  const assignDeliveryManToOrder = useCallback(async () => {
    if(!isProcessingAssignation) {
      setIsConfirmatingAssignation(true);

      try {
        const idDeliveryMan = getValues("idDeliveryMan");
        await shopAndGoAPI.post(
          `orders/orders-to-deliver`, 
          { idOrder, idDeliveryMan }
        );
        notify({
          title: "Pedido asignado",
          message: "El pedido ha sido asignado correctamente al repartidor",
          type: NotificationTypes.SUCCESS
        });
        router.replace("/empleados/pedidos");
      } catch (error) {
        const notificationInfo: NotificationInfo = {
          title: "Error al asignar",
          message: "No hemos podido asignar el pedido al repartidor, por favor intente en otro momento",
          type: NotificationTypes.ERROR,
        };
  
        if (
          isAxiosError(error) &&
          isClientErrorHTTPCode(Number(error.response?.status))
        ) {
          notificationInfo.type = NotificationTypes.WARNING;
          switch(error.response?.data.errorCode) {
            case CreateOrderToDeliverErrorCodes.ORDER_NOT_FOUND:
              notificationInfo.message = "No hemos podido encontrar el pedido, posiblemente ya ha sido asignado";
              break;
            case CreateOrderToDeliverErrorCodes.EMPLOYEE_NOT_FOUND:
            case CreateOrderToDeliverErrorCodes.EMPLOYEE_FULL_OF_WORK:
              notificationInfo.message = "No ha sido posible asignar el pedido al "
                + "repartidor. Posiblemente ya ha alcanzado el límite de pedidos asignados.";
              break;
          }
        } else if (
          isAxiosError(error) &&
          error.code === AxiosError.ERR_NETWORK
        ) {
          notificationInfo.message =
            "No fue posible establecer una conexión para asignar el pedido " +
            "al repartidor. Verifique que su conexión a Internet es estable o intente más tarde.";
        }
  
        notify(notificationInfo);
      } finally {
        setIsProcessingAssignation(false);
      }
    }
  }, [isProcessingAssignation, getValues, idOrder, router]);

  const onSubmit: SubmitHandler<{ idDeliveryMan: number }> = async () => {
    setIsConfirmatingAssignation(true);
  };
  const handleSubmit = submitWrapper(onSubmit);

  return {
    orderAssignationForm: {
      register,
      handleSubmit,
      errors,
      isProcessingAssignation,
      getValues
    },
    isConfirmatingAssignation,
    discardDeliveryManAssignation,
    assignDeliveryManToOrder
  }
}