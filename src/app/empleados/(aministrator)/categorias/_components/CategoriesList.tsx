"use client";
import { ErrorBanner } from "@/components/ui/ErrorBanner";
import { ProductCategory } from "@/types/types/model/products";
import { getProductCategories } from "@/utils/api/products";
import { useCallback, useEffect, useState } from "react";
import { CategoryCard } from "./CategoryCard";
import { CategoryCardSkeleton } from "./CategoryCardSkeleton";

type CategoriesListState = {
  loading: boolean; 
  value: ProductCategory[]; 
  error: null | string;
};

const INITIAL_CATEGORIES_LIST_STATE = { loading: true, value: [], error: null };

export const CategoriesList = () => {
  const [categoriesList, setCategoriesList] = useState<CategoriesListState>(INITIAL_CATEGORIES_LIST_STATE);

  const updateCategoryOnList = useCallback((updatedCategory: ProductCategory) => {
    setCategoriesList(previousList => ({
      ...previousList,
      value: previousList.value.map(category => {
        if(category.id === updatedCategory.id) {
          return updatedCategory;
        }
  
        return category
      })
    }))
  }, []);

  useEffect(() => {
    const recoverProductCategories = async () => {
      const { errorLoadingCategories, productCategories } = await getProductCategories();
      
      if(errorLoadingCategories) {
        setCategoriesList({ loading: false, value: [], error: errorLoadingCategories });
      } else {
        setCategoriesList({ loading: false, value: productCategories, error: null });
      }
    }

    recoverProductCategories();
  }, []);

  return (
    categoriesList.error
    ? (
      <ErrorBanner
        image={{
          src: "illustrations/server-error.svg",
          alt: "Ilustración representativa de un error en un servidor"
        }}
        message={categoriesList.error}
        title="¡Problemas técnicos"
      />
    )
    : (
      <ul className="lg:grid lg:grid-cols-2 lg:gap-4 mt-3">
        {
          categoriesList.loading
          ? (
            Array.from({ length: 8 }, (_, index) => (
              <li key={index} className="mb-4 lg:mb-0">
                <CategoryCardSkeleton/>
              </li>
            ))
          )
          : (
            categoriesList.value.map(category => (
              <li className="mb-4 lg:mb-0" key={category.id}>
                <CategoryCard category={category} updateCategoryOnList={updateCategoryOnList}/>
              </li>
            ))
          )
        }
      </ul>
    )
  );
}
