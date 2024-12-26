"use client";
import { ProductCategory } from "@/types/types/model/products";
import { DEFAULT_PRODUCT_CATEGORY } from "@/utils/constants";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { MdFilterList } from "react-icons/md";

type ProductCategoriesListProps = {
  productCategories: ProductCategory[];
};

export const ProductCategoriesList:FC<ProductCategoriesListProps> = ({ productCategories }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState(DEFAULT_PRODUCT_CATEGORY.id);
  const [isVisible, setIsVisible] = useState(false);
  
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
      <legend onClick={() => setIsVisible((prevValue) => !prevValue)} className="bg-white py-3 px-5 md:p-0 rounded-full md:rounded-none border border-gray-300 font-medium md:border-none md:font-bold md:mb-2 flex items-center">
        <span className="md:hidden inline-flex items-center mr-1">
          <MdFilterList size={20} className="mr-2"/> 
          Filtrar Por 
        </span> 
        <span>Categorías</span>
      </legend>
      <ul className={`absolute w-full p-3 bg-gray-50 md:bg-transparent -mx-3 md:relative md:p-0 rounded-lg md:rounded-none ${isVisible ? "block" : "hidden"} md:block z-10 border border-gray-300 md:border-none max-h-60 md:max-h-none overflow-y-auto md:overflow-visible`}>
        {
          productCategories.map(category => (
            <li key={category.id}>
              <label className="font-medium text-base flex md:inline-flex items-center py-1 md:py-0 mb-2 cursor-pointer" onClick={() => setIsVisible(false)}>
                <input
                  name="category" 
                  value={category.id} 
                  type="radio" 
                  className="mr-2 flex-shrink-0" 
                  onChange={handleInputChange} 
                  checked={selectedCategoryId === category.id}
                /> 
                {category.name}
              </label>
            </li>
          ))
        }
      </ul>

    </fieldset>
  );
}