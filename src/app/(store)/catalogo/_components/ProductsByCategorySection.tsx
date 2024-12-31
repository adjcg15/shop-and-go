import { ProductsInStoreResponse } from "@/types/types/api/products";
import {
    ProductCategory,
    ProductWithInventory,
} from "@/types/types/model/products";
import shopAndGoAPI from "@/utils/axios";
import { FC, useContext, useEffect } from "react";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { ProductCard } from "./ProductCard";
import { useProducts } from "../hooks/useProducts";
import { FiAlertCircle } from "react-icons/fi";
import StoreContext from "@/contexts/store/context";
import { AxiosError, isAxiosError } from "axios";

type ProductCategorySectionProps = {
    category: ProductCategory;
};

export const ProductsByCategorySection: FC<ProductCategorySectionProps> = ({
    category,
}) => {
    const { nearestStore } = useContext(StoreContext);
    const {
        productsList,
        finishProductsLoading,
        fireErrorLoadingProducts,
        startProductsLoading,
    } = useProducts();

    useEffect(() => {
        let ignore = false;

        const loadProductsByCategory = async () => {
            startProductsLoading();
            try {
                const { data: products } =
                    await shopAndGoAPI.get<ProductsInStoreResponse>(
                        `/stores/${nearestStore.value!.id}/products`,
                        {
                            params: { limit: 3, categoryFilter: category.id },
                        }
                    );
                if (!ignore) {
                    finishProductsLoading(products);
                }
            } catch (error) {
                let message;

                if (
                    isAxiosError(error) &&
                    error.code === AxiosError.ERR_NETWORK
                ) {
                    message =
                        "No fue posible establecer una conexión para cargar " +
                        "la lista de productos. Verifique que su conexión a Internet es estable o intente más tarde.";
                }

                fireErrorLoadingProducts(message);
            }
        };

        loadProductsByCategory();

        return () => {
            ignore = true;
        };
    }, [
        category.id,
        finishProductsLoading,
        fireErrorLoadingProducts,
        startProductsLoading,
        nearestStore.value,
    ]);

    return (
        <section key={category.id} className="mt-8">
            <h2 className="mb-2">{category.name}</h2>
            {productsList.error ? (
                <div className="flex items-center">
                    <FiAlertCircle className="text-red-600" size={20} />
                    <p className="ml-2">
                        Estamos experimentando problemas para cargar los
                        productos de esta categoría.
                    </p>
                </div>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {productsList.loading
                        ? Array.from({ length: 3 }, (_, index) => (
                              <li key={index}>
                                  <ProductCardSkeleton />
                              </li>
                          ))
                        : productsList.value.map((product) => (
                              <ProductCard
                                  key={product.id}
                                  product={product as ProductWithInventory}
                              />
                          ))}
                </ul>
            )}
        </section>
    );
};
