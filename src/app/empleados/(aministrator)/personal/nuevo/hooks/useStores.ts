import { NotificationTypes } from "@/types/enums/notifications";
import { Store } from "@/types/types/model/stores";
import shopAndGoAPI from "@/utils/axios";
import { notify } from "@/utils/notifications";
import { AxiosError, isAxiosError } from "axios";
import { useCallback, useState } from "react";

type StoresList = {
  loading: boolean;
  value: Store[];
  error: null | string;
}

export function useStores() {
  const [storesList, setStoresList] = useState<StoresList>({loading: false, value: [], error: null});

  const recoverStoresList = useCallback(async () => {
    try {
      const { data: stores } =
        await shopAndGoAPI.get<Store[]>(
          `/stores`
        );
      setStoresList({ loading: false, value: stores, error: null });
    } catch(error) {
      let errorMessage = "Estamos teniendo problemas para cargar la lista de sucursales, por favor intente más tarde.";

      if (isAxiosError(error) && error.code === AxiosError.ERR_NETWORK) {
        errorMessage =
          "No fue posible establecer una conexión para cargar " +
          "la lista de sucursales. Verifique que su conexión a Internet es estable o intente más tarde.";
      }

      notify({
        title: "Sucursales inaccesibles",
        message: errorMessage,
        type: NotificationTypes.ERROR
      });
      setStoresList({ loading: false, value: [], error: errorMessage });
    }
  }, []);

  return {
    storesList,
    recoverStoresList
  }
}