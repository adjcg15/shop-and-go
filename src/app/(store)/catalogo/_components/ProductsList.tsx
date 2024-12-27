import { FC, useCallback, useContext, useEffect, useRef } from "react";
import { useProducts } from "../hooks/useProducts";
import shopAndGoAPI from "@/utils/axios";
import { ProductsInStoreResponse } from "@/types/types/api/products";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { ErrorBanner } from "@/components/ui/ErrorBanner";
import StoreContext from "@/contexts/store/context";
import { AxiosError, isAxiosError } from "axios";

type ProductsListProps = {
  categoryIdFilter: string;
  searchQuery: string;
};

export const ProductsList: FC<ProductsListProps> = ({ categoryIdFilter, searchQuery }) => {
  const { nearestStore } = useContext(StoreContext);
  const { 
    productsList,
    finishProductsLoading,
    fireErrorLoadingProducts,
    startProductsLoading,
    restartProductsList
  } = useProducts();
  const bottomOfProductsListRef = useRef(null);

  const loadProducts = useCallback(async(productsBatchSize: number, totalProductsToOmit: number) => {
    startProductsLoading();
    try {
      const categoryFilter = Number(categoryIdFilter) || undefined;
      const params = { limit: productsBatchSize } as { limit: number, offset?: number, query?: string, categoryFilter?: number };

      if(totalProductsToOmit > 0) params.offset = totalProductsToOmit;
      if(categoryFilter) params.categoryFilter = categoryFilter;
      if(searchQuery) params.query = searchQuery;

      const { data: products } = await shopAndGoAPI.get<ProductsInStoreResponse>(`/stores/${nearestStore.value!.id}/products`, { params });
      const stillProductsToLoad = products.length >= productsBatchSize;
      finishProductsLoading(products, stillProductsToLoad);
    } catch(error) {
      let message;

      if(isAxiosError(error) && error.code === AxiosError.ERR_NETWORK) {
        message = "No fue posible establecer una conexión para cargar "
          + "la lista de productos. Verifique que su conexión a Internet es estable o intente más tarde."
      }

      fireErrorLoadingProducts(message);
    }
  }, [categoryIdFilter, searchQuery, startProductsLoading, finishProductsLoading, fireErrorLoadingProducts, nearestStore.value]);

  useEffect(() => {
    restartProductsList();
  }, [restartProductsList, categoryIdFilter, searchQuery])

  useEffect(() => {
    const handleEndOfProductsListReached: IntersectionObserverCallback = async (entries) => {
      const [bottomOfProductsList] = entries;

      if(
        (bottomOfProductsList.isIntersecting || productsList.value.length === 0)
        && !productsList.loading
        && productsList.stillProducsToLoad
      ) {
        const PRODUCTS_BATCH = 12;
        const totalProductsLoaded = productsList.value.length;

        await loadProducts(PRODUCTS_BATCH, totalProductsLoaded);
      }
    }

    const productsListObserver = new IntersectionObserver(
      handleEndOfProductsListReached,
      { rootMargin: "0px", threshold: 0.1 }
    );
    const bottomOfProductsList = bottomOfProductsListRef.current;

    if(bottomOfProductsList) {
      productsListObserver.observe(bottomOfProductsList);
    }

    return () => {
      productsListObserver.disconnect();
    }
  }, [productsList.loading, loadProducts, productsList.stillProducsToLoad, productsList.value.length]);

  return (
    productsList.error 
    ? (
      <ErrorBanner
        image={{ src: "/illustrations/server-error.svg", alt: "Imagen representativa de un servidor no disponible" }}
        title={"¡Problemas técnicos!"}
        message={productsList.error}
      />
    )
    : (
      <>
        { 
          !productsList.loading && productsList.value.length === 0 && (
            <ErrorBanner
              image={{ src: "/illustrations/empty-cart.svg", alt: "Imagen representativa de un carrito de compras vacío" }}
              title={"¡No hay productos!"}
              message={`Lo sentimos mucho, no encontramos coincidencias de productos con su búsqueda.`}
            />
          )
        }
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          { productsList.value.map(product => <ProductCard key={product.id} product={product}/>) }
          { 
            productsList.loading && (
              Array.from({ length: 12}, (_, index) => (
                <li key={index}>
                  <ProductCardSkeleton/>
                </li>
              ))
            )
          }
          <li ref={bottomOfProductsListRef} className="h-0"></li>
        </ul>
      </>
    )
  );
}
