import { useEffect, useState } from "react";
import shopAndGoAPI from "@/utils/axios";
import { NotificationInfo } from "@/types/types/components/notifications";
import { NotificationTypes } from "@/types/enums/notifications";
import { getTokenPayload } from "@/utils/token_payload";
import { isAxiosError } from "axios";
import { isClientErrorHTTPCode } from "@/utils/http";
import { HttpStatusCodes } from "@/types/enums/http";
import { notify } from "@/utils/notifications";
import { PaymentMethod } from "@/types/types/model/payment_methods";
import { DeletePaymentMethodErrorCodes } from "@/types/enums/error_codes";

export const usePaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);

  const { id: idClient } = getTokenPayload();

  const getPaymentMethods = async () => {
    try {
      setLoading(true);

      const { data } = await shopAndGoAPI.get<PaymentMethod[]>(
        `/clients/${idClient}/payment-methods`
      );

      setPaymentMethods(data);
    } catch (error: any) {
      const notificationInfo: NotificationInfo = {
        title: "Servicio no disponible",
        message:
          "Por el momento el sistema no se encuentra disponible, por favor intente más tarde",
        type: NotificationTypes.ERROR,
      };

      if (
        isAxiosError(error) &&
        isClientErrorHTTPCode(Number(error.response?.status)) &&
        error.response?.status !== HttpStatusCodes.TOO_MANY_REQUESTS
      ) {
        notificationInfo.title = "Cliente incorrecto";
        notificationInfo.message =
          "No se pudieron obtener los métodos de pago porque el cliente no se pudo identificar";
        notificationInfo.type = NotificationTypes.WARNING;
      }

      notify(notificationInfo);
    } finally {
      setLoading(false);
    }
  };

  const deletePaymentMethod = async (id: number) => {
    try {
      await shopAndGoAPI.delete(`/clients/${idClient}/payment-methods/${id}`);

      await getPaymentMethods();
    } catch (error) {
      const notificationInfo: NotificationInfo = {
        title: "Servicio no disponible",
        message:
          "Por el momento el sistema no se encuentra disponible, por favor intente más tarde",
        type: NotificationTypes.ERROR,
      };

      if (
        isAxiosError(error) &&
        isClientErrorHTTPCode(Number(error.response?.status)) &&
        error.response?.status !== HttpStatusCodes.TOO_MANY_REQUESTS
      ) {
        const errorCode = error.response?.data?.errorCode;
        if (errorCode === DeletePaymentMethodErrorCodes.CLIENT_NOT_FOUND) {
          notificationInfo.title = "Cliente incorrecto";
          notificationInfo.message =
            "No se pudieron obtener los métodos de pago porque el cliente no se pudo identificar";
          notificationInfo.type = NotificationTypes.WARNING;
        } else {
          notificationInfo.title = "Método de pago no encontrado";
          notificationInfo.message =
            "No se pudo eliminar el método de pago porque no se encontró en el sistema";
          notificationInfo.type = NotificationTypes.WARNING;
        }
      }

      notify(notificationInfo);
    }
  };

  useEffect(() => {
    getPaymentMethods();
  }, []);

  return {
    paymentMethods,
    loading,
    getPaymentMethods,
    deletePaymentMethod,
  };
};
