import { ErrorBanner } from "@/components/ui/ErrorBanner";
import { ProductCategory } from "@/types/types/model/products";
import { FC } from "react";
import { CategoryCard } from "./CategoryCard";
import { CategoryCardSkeleton } from "./CategoryCardSkeleton";
import { CategoriesListState } from "@/types/types/components/products";

type CategoriesListProps = {
  categoriesList: CategoriesListState,
  updateCategoryOnList: (category: ProductCategory) => void;
};

export const CategoriesList: FC<CategoriesListProps> = ({ categoriesList, updateCategoryOnList }) => {
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
            categoriesList.value.length > 0
            ? (
              categoriesList.value.map(category => (
                <li className="mb-4 lg:mb-0" key={category.id}>
                  <CategoryCard category={category} updateCategoryOnList={updateCategoryOnList}/>
                </li>
              ))
            )
            : (
              <div className="col-span-full">
                <ErrorBanner
                  image={{
                    src: "/illustrations/empty-cart.svg",
                    alt: "Imagen representativa de un carrito de compras vacío",
                  }}
                  title={"Lista vacía"}
                  message={`Aún no se ha registrado ninguna categoría de productos.`}
                />
              </div>
            )
          )
        }
      </ul>
    )
  );
}
