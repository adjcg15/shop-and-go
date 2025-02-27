"use client";
import { ProductCategory } from "@/types/types/model/products"
import { FC } from "react";
import { useParam } from "@/hooks/useParam";
import { DEFAULT_PRODUCT_CATEGORY } from "@/utils/constants";
import { ProductsByCategorySection } from "./ProductsByCategorySection";
import { ProductsList } from "./ProductsList";

type ProductsSectionProps = {
  productCategories: ProductCategory[];
};

export const ProductsSection: FC<ProductsSectionProps> = ({ productCategories }) => {
  const { paramValue: categoryfilter } = useParam("filtroDeCategoria", "");
  const { paramValue: querySearch } = useParam("busqueda", "");

  return (
    <>
      {
        !categoryfilter && ! querySearch
        ? (
          <>
            <h1>¡Revise nuestros productos más nuevos!</h1>
            {
              productCategories.map(category => category.id !== DEFAULT_PRODUCT_CATEGORY.id && (
                <ProductsByCategorySection key={category.id} category={category}/>
              ))
            }
          </>
        )
        : (
          <ProductsList
            categoryIdFilter={categoryfilter}
            searchQuery={querySearch}
          />
        )
      }
    </>
  );
}
