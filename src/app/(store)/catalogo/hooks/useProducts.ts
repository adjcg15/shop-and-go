import { Product, ProductWithInventory } from "@/types/types/model/products";
import { useCallback, useState } from "react";

type ProductsListState = {
    loading: boolean;
    value: ProductWithInventory[] | Product[];
    error: null | string;
    stillProducsToLoad: boolean;
};

const INITIA_PRODUCTS_LIST_STATE = {
    loading: false,
    value: [],
    error: null,
    stillProducsToLoad: true,
};

export function useProducts() {
    const [productsList, setProductsList] = useState<ProductsListState>(
        INITIA_PRODUCTS_LIST_STATE
    );

    const restartProductsList = useCallback(() => {
        setProductsList(INITIA_PRODUCTS_LIST_STATE);
    }, []);

    const startProductsLoading = useCallback(() => {
        setProductsList((previousProductsList) => ({
            loading: true,
            value: previousProductsList.value,
            error: null,
            stillProducsToLoad: true,
        }));
    }, []);

    const finishProductsLoading = useCallback(
        (
            products: ProductWithInventory[] | Product[],
            stillProducsToLoad: boolean = false
        ) => {
            setProductsList((previousProductsList) => ({
                loading: false,
                value: [...previousProductsList.value, ...products],
                error: null,
                stillProducsToLoad,
            }));
        },
        []
    );

    const fireErrorLoadingProducts = useCallback((message?: string) => {
        setProductsList((previousProducstList) => ({
            loading: false,
            value: previousProducstList.value,
            error:
                message ??
                "Estamos teniendo problemas para cargar los productos, por favor intente más tarde.",
            stillProducsToLoad: false,
        }));
    }, []);

    return {
        startProductsLoading,
        finishProductsLoading,
        fireErrorLoadingProducts,
        restartProductsList,
        productsList,
    };
}
