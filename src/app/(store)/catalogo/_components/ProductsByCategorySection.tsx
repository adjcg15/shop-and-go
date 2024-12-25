import { ProductsInStoreResponse } from "@/types/types/api/products";
import { ProductCategory, ProductWithInventory } from "@/types/types/model/products";
import shopAndGoAPI from "@/utils/axios";
import { FC, useEffect, useState } from "react";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { ProductCard } from "./ProductCard";

type ProductCategorySectionProps = {
  category: ProductCategory;
};

export const ProductsByCategorySection:FC<ProductCategorySectionProps> = ({ category }) => {
  const [productsList, setProductsList] = useState<{ loading: boolean, value: ProductWithInventory[], error: null | string }>(
    { loading: false, value: [], error: null }
  );

  useEffect(() => {
    const loadProductsByCategory = async () => {
      setProductsList({ loading: true, value: [], error: null });
      try {
        const { data: products } = await shopAndGoAPI.get<ProductsInStoreResponse>(`/stores/${4}/products`, {
          params: { limit: 3, categoryFilter: category.id }
        });
        setProductsList({ 
          loading: false,
          value: products, 
          error: null 
        });
      } catch {
        setProductsList({ loading: false, value: [], error: "Ocurrió un error al cargar los productos, intente más tarde" });
      }
    }

    loadProductsByCategory();
  }, [category.id]);

  return (
    <section key={category.id} className="mt-8">
      <h2 className="mb-2">{category.name}</h2>
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
    </section>
  );
}
