"use client";
import { StoreState } from "@/types/types/contexts/states";
import { FC, ReactNode, useCallback, useEffect, useReducer } from "react";
import StoreContext from "./context";
import { storeReducer } from "./reducer";
import { Address } from "@/types/types/model/deliveries";
import { Store } from "@/types/types/model/stores";
import { StoreActionTypes } from "@/types/types/contexts/actions";
import { isAxiosError } from "axios";
import { isClientErrorHTTPCode } from "@/utils/http";
import shopAndGoAPI from "@/utils/axios";
import { usePathname, useRouter } from "next/navigation";
import { NEAREST_STORE_CHECK_ROUTES } from "@/utils/constants";
import { FullScreenLoader } from "@/components/ui/FullScreenLoader";

type StoreProviderProps = {
  children: ReactNode;
};

//TODO: clear plain delivery address
const STORE_BASE_STATE: StoreState = {
  deliveryAddress: {
    apartmentNumber: null,
    city: "Xalapa",
    id: 1,
    isActive: true,
    latitude: 19.52953,
    longitude: -96.92463,
    municipality: "Xalapa",
    neighborhood: "Zona centro",
    postalCode: "91000",
    state: "Veracruz",
    street: "Francisco Javier Clavijero",
    streetNumber: "17"
  },
  nearestStore: {
    isBeingCalculated: false,
    value: null,
    error: null
  },
  shoppingCart: []
};

export const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [state, dispatch] = useReducer(storeReducer, STORE_BASE_STATE);

  const setDeliveryAddress = useCallback((address: Address) => {
    dispatch({ type: StoreActionTypes.SET_DELIVERY_ADDRESS, payload: address });
  }, []);
  
  const setNearestStore = useCallback((store: Store) => {
    dispatch({ type: StoreActionTypes.SET_NEAREST_STORE, payload: store });
  }, []);
  
  const clearStore = useCallback(() => {
    dispatch({ type: StoreActionTypes.CLEAR_STORE_STATE });
  }, []);
  
  useEffect(() => {
    const getNearestStore = async() => {
      if(state.deliveryAddress !== null) {
        dispatch({ type: StoreActionTypes.START_NEAREST_STORE_CALCULATION });
        try {
          const { data: store } = await shopAndGoAPI.post<Store>("/stores/nearest-store", {
            latitude: state.deliveryAddress.latitude,
            longitude: state.deliveryAddress.longitude
          });
          setNearestStore(store);
        } catch (error) {
          let errorMessage = "No fue posible completar la búsqueda de una sucursal cercana, intente más tarde";
          if (
            isAxiosError(error) 
            && isClientErrorHTTPCode(Number(error.response?.status))
          ) {
            errorMessage = "No logramos encontrar una sucursal cerca de su dirección, intente con otra";
          }
          dispatch({ type: StoreActionTypes.FIRE_ERROR_CALCULATING_NEAREST_STORE, payload: errorMessage });
        }
      }
    }

    getNearestStore();
  }, [state.deliveryAddress, setNearestStore]);

  useEffect(() => {
    if(NEAREST_STORE_CHECK_ROUTES.includes(pathname) && state.nearestStore.error) {
      router.replace("/?redirigidoDesde=/catalogo");
    }
  }, [pathname, router, state.nearestStore.error]);

  return (
    <StoreContext.Provider
      value={{
        ...state,
        setDeliveryAddress,
        setNearestStore,
        clearStore
      }}
    >
      {
        NEAREST_STORE_CHECK_ROUTES.includes(pathname) && state.nearestStore.isBeingCalculated
        ? <FullScreenLoader/>
        : children
      }
    </StoreContext.Provider>
  );
}