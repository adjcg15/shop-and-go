import AuthContext from "@/contexts/auth/context";
import { DeleteAddressErrorCodes } from "@/types/enums/error_codes";
import { HttpStatusCodes } from "@/types/enums/http";
import { NotificationTypes } from "@/types/enums/notifications";
import { NotificationInfo } from "@/types/types/components/notifications";
import { Address } from "@/types/types/model/deliveries";
import shopAndGoAPI from "@/utils/axios";
import { isClientErrorHTTPCode } from "@/utils/http";
import { notify } from "@/utils/notifications";
import { isAxiosError } from "axios";
import { useCallback, useContext, useEffect, useState } from "react";

type AddressState = {
  loading: boolean;
  value: Address[] | null;
  error: null | string;
};

const INITIAL_ADDRESS_LIST_STATE = {
  loading: false,
  value: [],
  error: null,
};

export function useAddresses() {
  const [addresses, setAddresses] = useState<AddressState>(
    INITIAL_ADDRESS_LIST_STATE
  );

  const { clientProfile } = useContext(AuthContext);
  const idClient = clientProfile?.id;

  const getAddresses = useCallback(async () => {
    try {
      setAddresses(() => ({
        loading: true,
        value: null,
        error: null,
      }));

      const { data } = await shopAndGoAPI.get<Address[]>(
        `/clients/${idClient}/addresses`
      );

      setAddresses(() => ({
        loading: false,
        value: data,
        error: null,
      }));
    } catch (error) {
      let errorMessage =
        "Por el momento el sistema no se encuentra disponible, por favor intente más tarde";

      if (
        isAxiosError(error) &&
        isClientErrorHTTPCode(Number(error.response?.status)) &&
        error.response?.status !== HttpStatusCodes.TOO_MANY_REQUESTS
      ) {
        errorMessage =
          "No se pudieron obtener las direcciones de entrega porque el cliente no se pudo identificar";
      }

      setAddresses(() => ({
        loading: false,
        value: null,
        error: errorMessage,
      }));
    }
  }, [idClient]);

  const deleteAddress = useCallback(
    async (id: number) => {
      try {
        await shopAndGoAPI.delete(`/clients/${idClient}/addresses/${id}`);

        setAddresses((previousMethodsState) => ({
            ...previousMethodsState,
            value: previousMethodsState.value!.filter(
                (address) => address.id !== id  
            ),
        }));
      } catch (error) {
        const notificationInfo: NotificationInfo = {
            title: "Servicio no disponible",
            message: "Por el momento el sistema no se encuentra disponible, por favor intente más tarde",
            type: NotificationTypes.ERROR,
        }

        if (
          isAxiosError(error) &&
          isClientErrorHTTPCode(Number(error.response?.status)) &&
          error.response?.status !== HttpStatusCodes.TOO_MANY_REQUESTS
        ) {
            const errorCode = error.response?.data?.errorCode;
            if (errorCode === DeleteAddressErrorCodes.CLIENT_NOT_FOUND) {
                notificationInfo.title = "Cliente incorrecto";
                notificationInfo.message = "No se pudieron obtener las direcciones de entrega porque el cliente no se pudo identificar";
                notificationInfo.type = NotificationTypes.WARNING;
            } else {
                notificationInfo.title = "Dirección de entrega no encontrada";
                notificationInfo.message = "No se pudo eliminar la dirección de entrega porque no se encontró en el sistema";
                notificationInfo.type = NotificationTypes.WARNING;
            }
        }

        notify(notificationInfo);
      }
    },
    [idClient]
  );

  useEffect(() => {
    getAddresses();
  }, [getAddresses]);

  return {
    addresses,
    getAddresses,
    deleteAddress,
  };
}
