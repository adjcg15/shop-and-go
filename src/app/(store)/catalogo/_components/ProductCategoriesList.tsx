"use client";
import { ProductCategory } from "@/types/types/model/products";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";

type ProductCategoriesListProps = {
  productCategories: ProductCategory[];
};

const DEFAULT_CATEGORY: ProductCategory = {
  id: 0,
  name: "Todos los productos"
};

export const ProductCategoriesList:FC<ProductCategoriesListProps> = ({ productCategories }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState(DEFAULT_CATEGORY.id);
  
  const productCategoriesWithDefault = useMemo(
    () => [DEFAULT_CATEGORY, ...productCategories], [productCategories]
  );
  
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const categoryId = Number(event.target.value);
    const categoryExists = productCategoriesWithDefault.some(
      (category) => category.id === categoryId
    );

    const params = new URLSearchParams(searchParams);

    if(categoryExists && categoryId !== DEFAULT_CATEGORY.id) {
      params.set("filtroDeCategoria", String(categoryId));
    } else {
      params.delete("filtroDeCategoria");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const activeCategoryFilter = Number(searchParams.get("filtroDeCategoria"));

    const categoryExists = productCategoriesWithDefault.some(
      (category) => category.id === activeCategoryFilter
    );

    if(categoryExists && activeCategoryFilter !== DEFAULT_CATEGORY.id) {
      setSelectedCategoryId(activeCategoryFilter);
    } else {
      setSelectedCategoryId(DEFAULT_CATEGORY.id);
    }
  }, [searchParams, productCategoriesWithDefault, router]);

  return (
    <fieldset>
      <legend className="font-bold mb-2">Categorías</legend>
      {
        productCategoriesWithDefault.map(category => (
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