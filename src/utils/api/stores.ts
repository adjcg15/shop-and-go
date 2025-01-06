import { StoresListResponse } from "@/types/types/api/products";
import shopAndGoAPI from "../axios";
import { Store } from "@/types/types/model/stores";
import { AxiosError, isAxiosError } from "axios";

async function getStores() {
    let storesList: Store[] = [];
    let errorLoadingStores: string | null = null;

    try {
        const { data: stores } = await shopAndGoAPI.get<StoresListResponse>(
            "/stores"
        );
        storesList = stores;
    } catch (error) {
        errorLoadingStores =
            "Estamos teniendo problemas para cargar las categorías, por favor intente más tarde.";

        if (isAxiosError(error) && error.code === AxiosError.ERR_NETWORK) {
            errorLoadingStores =
                "No fue posible establecer una conexión para cargar " +
                "la lista de categorías. Verifique que su conexión a Internet es estable o intente más tarde.";
        }
    }

    return { storesList, errorLoadingStores };
}

async function getStore(idStore: number) {
    let storeInList: Store[] = [];
    let errorLoadingStore: string | null = null;

    try {
        const { data: store } = await shopAndGoAPI.get<Store>(
            `/stores/${idStore}`
        );
        storeInList = [store];
    } catch (error) {
        errorLoadingStore =
            "Estamos teniendo problemas para cargar las categorías, por favor intente más tarde.";

        if (isAxiosError(error) && error.code === AxiosError.ERR_NETWORK) {
            errorLoadingStore =
                "No fue posible establecer una conexión para cargar " +
                "la lista de categorías. Verifique que su conexión a Internet es estable o intente más tarde.";
        }
    }

    return { storeInList, errorLoadingStore };
}

export { getStores, getStore };
