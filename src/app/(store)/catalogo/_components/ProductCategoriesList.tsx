"use client";
import { ProductCategory } from "@/types/types/model/products";
import { DEFAULT_PRODUCT_CATEGORY } from "@/utils/constants";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, FC, useEffect, useState } from "react";

type ProductCategoriesListProps = {
  productCategories: ProductCategory[];
};

export const ProductCategoriesList:FC<ProductCategoriesListProps> = ({ productCategories }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState(DEFAULT_PRODUCT_CATEGORY.id);
  
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const categoryId = Number(event.target.value);
    const categoryExists = productCategories.some(
      (category) => category.id === categoryId
    );

    const params = new URLSearchParams(searchParams);

    if(categoryExists && categoryId !== DEFAULT_PRODUCT_CATEGORY.id) {
      params.set("filtroDeCategoria", String(categoryId));
    } else {
      params.delete("filtroDeCategoria");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const activeCategoryFilter = Number(searchParams.get("filtroDeCategoria"));

    const categoryExists = productCategories.some(
      (category) => category.id === activeCategoryFilter
    );

    if(categoryExists && activeCategoryFilter !== DEFAULT_PRODUCT_CATEGORY.id) {
      setSelectedCategoryId(activeCategoryFilter);
    } else {
      setSelectedCategoryId(DEFAULT_PRODUCT_CATEGORY.id);
    }
  }, [searchParams, productCategories, router]);

  return (
    <fieldset>
      <legend className="font-bold mb-2">Categorías</legend>
      {
        productCategories.map(category => (
          <div key={category.id}>
            <label className="font-medium text-base inline-flex items-center mb-2 cursor-pointer">
              <input 
                name="category" 
                value={category.id} 
                type="radio" 
                className="mr-2" 
                onChange={handleInputChange} 
                checked={selectedCategoryId === category.id}
              /> 
              {category.name}
            </label>
          </div>
        ))
      }
    </fieldset>
  );
}