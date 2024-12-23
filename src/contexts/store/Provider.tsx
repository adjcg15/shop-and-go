import { StoreState } from "@/types/types/contexts/states";
import { FC, ReactNode, useCallback, useEffect, useReducer } from "react";
import StoreContext from "./context";
import { storeReducer } from "./reducer";
import { Address } from "@/types/types/model/deliveries";
import { Store } from "@/types/types/model/stores";
import { StoreActionTypes } from "@/types/types/contexts/actions";
import { isAxiosError } from "axios";
import { isClientErrorHTTPCode } from "@/utils/http";

type StoreProviderProps = {
  children: ReactNode;
};

const STORE_BASE_STATE: StoreState = {
  deliveryAddress: null,
  nearestStore: {
    isBeingCalculated: false,
    value: null,
    error: null
  },
  shoppingCart: []
};

export const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
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
    if(state.deliveryAddress !== null) {
      dispatch({ type: StoreActionTypes.START_NEAREST_STORE_CALCULATION });
      try {
        //TODO: load and set nearest store when delivery address change is detected
        // setNearestStore(nearestStore);
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
  }, [state.deliveryAddress]);

  return (
    <StoreContext.Provider
      value={{
        ...state,
        setDeliveryAddress,
        setNearestStore,
        clearStore
      }}
    >
      { children }
    </StoreContext.Provider>
  );
}