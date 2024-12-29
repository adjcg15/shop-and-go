"use client";
import { CategoriesListState } from "@/types/types/components/products";
import { ProductCategory } from "@/types/types/model/products";
import { getProductCategories } from "@/utils/api/products";
import { useCallback, useEffect, useState } from "react";
import { CreateCategorySection } from "./CreateCategorySection";
import { CategoriesList } from "./CategoriesList";

const INITIAL_CATEGORIES_LIST_STATE = { loading: true, value: [], error: null };

export const AdminProductCategoriesWrapper = () => {
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

  const addCategoryToList = useCallback((newCategory: ProductCategory) => {
    setCategoriesList(previousList => ({
      ...previousList,
      value: [newCategory, ...previousList.value].sort((a, b) => a.name.localeCompare(b.name))
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
    <>
      <CreateCategorySection addCategoryToList={addCategoryToList}/>
            
      <section className="mt-6">
        <h1>Categorías de productos registradas</h1>
        <CategoriesList 
          categoriesList={categoriesList} 
          updateCategoryOnList={updateCategoryOnList}
        />
      </section>
    </>
  )
}
