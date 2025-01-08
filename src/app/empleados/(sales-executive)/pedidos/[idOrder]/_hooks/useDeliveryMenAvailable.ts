import { NotificationTypes } from "@/types/enums/notifications";
import { Employee } from "@/types/types/model/users";
import shopAndGoAPI from "@/utils/axios";
import { notify } from "@/utils/notifications";
import { AxiosError, isAxiosError } from "axios";
import { useCallback, useState } from "react";

type DeliveryMenList = {
  loading: boolean;
  value: Employee[];
  error: null | string;
}

export function useDeliveryMenAvailable() {
  const [deliveryMenList, setDeliveryMenList] = useState<DeliveryMenList>({loading: false, value: [], error: null});

  const recoverDeliveryMenList = useCallback(async () => {
    try {
      const { data: employees } =
        await shopAndGoAPI.get<Employee[]>(
          `/employees/delivery-men`
        );
      setDeliveryMenList({ loading: false, value: employees, error: null });
    } catch(error) {
      let errorMessage = "Estamos teniendo problemas para cargar la lista de repartidores, por favor intente más tarde.";

      if (isAxiosError(error) && error.code === AxiosError.ERR_NETWORK) {
        errorMessage =
          "No fue posible establecer una conexión para cargar " +
          "la lista de repartidores. Verifique que su conexión a Internet es estable o intente más tarde.";
      }

      notify({
        title: "Repartidores inaccesibles",
        message: errorMessage,
        type: NotificationTypes.ERROR
      });
      setDeliveryMenList({ loading: false, value: [], error: errorMessage });
    }
  }, []);

  return {
    deliveryMenList,
    recoverDeliveryMenList
  }
}