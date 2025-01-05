import { Store } from "@/types/types/model/stores";
import shopAndGoAPI from "@/utils/axios";
import { AxiosError, isAxiosError } from "axios";
import { useCallback, useState } from "react";

type StoresListState = {
  loading: boolean; 
  value: Store[]; 
  error: null | string;
};

const INITIAL_STORES_LIST_STATE = { loading: true, value: [], error: null };

export function useStores() {
  const [storesList, setStoresList] = useState<StoresListState>(INITIAL_STORES_LIST_STATE);

  const recoverStores = useCallback(async () => {
    try {
      const { data: stores } = await shopAndGoAPI.get<Store[]>("/stores");
      setStoresList({ loading: false, value: stores, error: null });
    } catch (error) {
      let errorLoadingStores =
        "Estamos teniendo problemas para cargar las sucursales, por favor intente más tarde.";

      if (isAxiosError(error) && error.code === AxiosError.ERR_NETWORK) {
        errorLoadingStores =
          "No fue posible establecer una conexión para cargar " +
          "la lista de sucursales. Verifique que su conexión a Internet es estable o intente más tarde.";
      }

      setStoresList({ loading: false, value: [], error: errorLoadingStores });
    }
  }, []);

  const updateStoreOnList = useCallback((updatedStore: Store) => {
    setStoresList(previousList => ({
      ...previousList,
      value: previousList.value.map(store => {
        if(store.id === updatedStore.id) {
          return updatedStore;
        } 
  
        return store;
      })
    }))
  }, []);

  return {
    recoverStores,
    storesList,
    updateStoreOnList
  };
}