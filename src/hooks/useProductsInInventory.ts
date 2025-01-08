import { useCallback, useContext, useEffect, useRef } from "react";
import { Product } from "@/types/types/model/products";
import AuthContext from "@/contexts/auth/context";
import { getProductsList } from "@/utils/api/products";
import UserRoles from "@/types/enums/user_roles";
import { useProducts } from "@/hooks/useProducts";

export function useProductsInInventory() {
    const {
        productsList,
        finishProductsLoading,
        fireErrorLoadingProducts,
        startProductsLoading,
        restartProductsList,
    } = useProducts();
    const bottomOfProductsListRef = useRef(null);

    const { employeeProfile } = useContext(AuthContext);
    const userRole = employeeProfile?.position;
    const idStore = employeeProfile?.idStore;

    const getProductsInInventory = useCallback(
        async (productsBatchSize: number, totalProductsToOmit: number) => {
            startProductsLoading();
            let products: Product[] | null = null;
            let errorLoadingProducts: string | null = "";
            const params = { limit: productsBatchSize } as {
                limit: number;
                offset?: number;
            };
            if (totalProductsToOmit > 0) params.offset = totalProductsToOmit;

            if (userRole === UserRoles.ADMINISTRATOR) {
                const dataResult = await getProductsList(userRole, params);
                products = dataResult.productList;
                errorLoadingProducts = dataResult.errorLoadingProducts;
            } else if (userRole === UserRoles.SALES_EXECUTIVE) {
                const dataResult = await getProductsList(
                    userRole,
                    params,
                    idStore
                );
                products = dataResult.productList;
                errorLoadingProducts = dataResult.errorLoadingProducts;
            }

            if (errorLoadingProducts) {
                fireErrorLoadingProducts(errorLoadingProducts);
            } else if (products) {
                const stillProductsToLoad =
                    products.length >= productsBatchSize;
                finishProductsLoading(products!, stillProductsToLoad);
            }
        },
        [
            finishProductsLoading,
            fireErrorLoadingProducts,
            idStore,
            startProductsLoading,
            userRole,
        ]
    );

    useEffect(() => {
        restartProductsList();
    }, [restartProductsList]);

    useEffect(() => {
        const handleEndOfProductsListReached: IntersectionObserverCallback =
            async (entries) => {
                const [bottomOfProductsList] = entries;
                if (
                    (bottomOfProductsList.isIntersecting ||
                        productsList.value.length === 0) &&
                    !productsList.loading &&
                    productsList.stillProducsToLoad
                ) {
                    const PRODUCTS_BATCH = 12;
                    const totalProductsLoaded = productsList.value.length;
                    await getProductsInInventory(
                        PRODUCTS_BATCH,
                        totalProductsLoaded
                    );
                }
            };

        const productsListObserver = new IntersectionObserver(
            handleEndOfProductsListReached,
            { rootMargin: "0px", threshold: 0.1 }
        );
        const bottomOfProductsList = bottomOfProductsListRef.current;

        if (bottomOfProductsList) {
            productsListObserver.observe(bottomOfProductsList);
        }

        return () => {
            productsListObserver.disconnect();
        };
    }, [
        productsList.loading,
        getProductsInInventory,
        productsList.stillProducsToLoad,
        productsList.value.length,
    ]);

    return {
        productsList,
        bottomOfProductsListRef,
    };
}
