import { ProductsInStoreResponse } from "@/types/types/api/products";
import { ProductCategory } from "@/types/types/model/products";
import shopAndGoAPI from "@/utils/axios";
import { FC, useContext, useEffect } from "react";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { ProductCard } from "./ProductCard";
import { useProducts } from "../hooks/useProducts";
import { FiAlertCircle } from "react-icons/fi";
import StoreContext from "@/contexts/store/context";

type ProductCategorySectionProps = {
  category: ProductCategory;
};

export const ProductsByCategorySection:FC<ProductCategorySectionProps> = ({ category }) => {
  const { nearestStore } = useContext(StoreContext);
  const { 
    productsList,
    finishProductsLoading,
    fireErrorLoadingProducts,
    startProductsLoading
  } = useProducts();

  useEffect(() => {
    let ignore = false;

    const loadProductsByCategory = async () => {
      startProductsLoading();
      try {
        const { data: products } = await shopAndGoAPI.get<ProductsInStoreResponse>(`/stores/${nearestStore.value!.id}/products`, {
          params: { limit: 3, categoryFilter: category.id }
        });
        if(!ignore) {
          finishProductsLoading(products);
        }
      } catch {
        fireErrorLoadingProducts();
      }
    }

    loadProductsByCategory();

    return () => {
      ignore = true;
    }
  }, [category.id, finishProductsLoading, fireErrorLoadingProducts, startProductsLoading, nearestStore.value]);

  return (
    <section key={category.id} className="mt-8">
      <h2 className="mb-2">{category.name}</h2>
      {
        productsList.error
        ? (
          <div className="flex items-center">
            <FiAlertCircle className="text-red-600" size={20}/>
            <p className="ml-2">Estamos experimentando problemas para cargar los productos de esta categoría.</p>
          </div>
        )
        : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {
              productsList.loading 
              ? (
                Array.from({ length: 3}, (_, index) => (
                  <li key={index}>
                    <ProductCardSkeleton/>
                  </li>
                ))
              )
              : productsList.value.map(product => <ProductCard key={product.id} product={product}/>)
            }
          </ul>
        )
      }
    </section>
  );
}
