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
import { CartItem } from "@/types/types/model/products";
import { isRouteInRoutesArray } from "@/utils/routing";

type StoreProviderProps = {
    children: ReactNode;
};

const STORE_BASE_STATE: StoreState = {
    deliveryAddress: null,
    nearestStore: {
        isBeingCalculated: false,
        value: null,
        error: null,
    },
    shoppingCart: [],
};

export const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [state, dispatch] = useReducer(storeReducer, STORE_BASE_STATE);

    const setDeliveryAddress = useCallback((address: Address) => {
        dispatch({
            type: StoreActionTypes.SET_DELIVERY_ADDRESS,
            payload: address,
        });
    }, []);

    const setNearestStore = useCallback((store: Store) => {
        dispatch({ type: StoreActionTypes.SET_NEAREST_STORE, payload: store });
    }, []);

    const clearStore = useCallback(() => {
        dispatch({ type: StoreActionTypes.CLEAR_STORE_STATE });
    }, []);

    const addToCart = useCallback((item: CartItem) => {
        dispatch({ type: StoreActionTypes.ADD_PRODUCT_TO_CART, payload: item });
    }, []);

    const removeFromCart = useCallback((itemId: number) => {
        dispatch({
            type: StoreActionTypes.REMOVE_PRODUCT_FROM_CART,
            payload: itemId,
        });
    }, []);

    const clearCart = useCallback(() => {
        dispatch({ type: StoreActionTypes.CLEAR_CART });
    }, []);

    useEffect(() => {
        const getNearestStore = async () => {
            if (state.deliveryAddress !== null) {
                dispatch({
                    type: StoreActionTypes.START_NEAREST_STORE_CALCULATION,
                });
                try {
                    const { data: store } = await shopAndGoAPI.post<Store>(
                        "/stores/nearest-store",
                        {
                            latitude: state.deliveryAddress.latitude,
                            longitude: state.deliveryAddress.longitude,
                        }
                    );
                    setNearestStore(store);
                } catch (error) {
                    let errorMessage =
                        "No fue posible completar la búsqueda de una sucursal cercana, intente más tarde";
                    if (
                        isAxiosError(error) &&
                        isClientErrorHTTPCode(Number(error.response?.status))
                    ) {
                        errorMessage =
                            "No logramos encontrar una sucursal cerca de su dirección, intente con otra";
                    }
                    dispatch({
                        type: StoreActionTypes.FIRE_ERROR_CALCULATING_NEAREST_STORE,
                        payload: errorMessage,
                    });
                }
            }
        };

        getNearestStore();
    }, [state.deliveryAddress, setNearestStore]);

    useEffect(() => {
        if (
            isRouteInRoutesArray(pathname, NEAREST_STORE_CHECK_ROUTES) &&
            (state.deliveryAddress === null || state.nearestStore.error)
        ) {
            router.replace("/?redirigidoDesde=/catalogo");
        }
    }, [pathname, router, state.nearestStore.error, state.deliveryAddress]);

    return (
        <StoreContext.Provider
            value={{
                ...state,
                setDeliveryAddress,
                setNearestStore,
                clearStore,
                addToCart,
                removeFromCart,
                clearCart,
            }}
        >
            {NEAREST_STORE_CHECK_ROUTES.includes(pathname) &&
            state.nearestStore.isBeingCalculated ? (
                <FullScreenLoader />
            ) : (
                children
            )}
        </StoreContext.Provider>
    );
};
