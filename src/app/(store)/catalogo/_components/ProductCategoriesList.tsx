"use client";
import { ProductCategory } from "@/types/types/model/products";
import { ChangeEvent, FC, useMemo, useState } from "react";

type ProductCategoriesListProps = {
  productCategories: ProductCategory[];
};

const DEFAULT_CATEGORY: ProductCategory = {
  id: 0,
  name: "Todos los productos"
};

export const ProductCategoriesList:FC<ProductCategoriesListProps> = ({ productCategories }) => {
  const productCategoriesWithDefault = useMemo(
    () => [DEFAULT_CATEGORY, ...productCategories], [productCategories]
  );
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY.name);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <fieldset>
      <legend className="font-bold mb-2">Categorías</legend>
      {
        productCategoriesWithDefault.map(category => (
          <div key={category.id}>
            <label className="font-medium text-base inline-flex items-center mb-2 cursor-pointer">
              <input 
                name="category" 
                value={category.name} 
                type="radio" 
                className="mr-2" 
                onChange={handleInputChange} 
                checked={selectedCategory === category.name}
              /> 
              {category.name}
            </label>
          </div>
        ))
      }
    </fieldset>
  );
}