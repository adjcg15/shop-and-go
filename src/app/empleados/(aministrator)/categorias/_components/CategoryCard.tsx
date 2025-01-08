import { SecondaryIconButton } from "@/components/buttons/SecondaryIconButton";
import ToggleSwitch from "@/components/inputs/ToggleSwitch";
import { ProductCategory } from "@/types/types/model/products";
import { FC } from "react";
import { FaRegSave } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useCategoryCard } from "../hooks/useCategoryCard";

type CategoryCardProps = {
  category: ProductCategory;
  updateCategoryOnList: (category: ProductCategory) => void;
};

export const CategoryCard: FC<CategoryCardProps> = ({ category, updateCategoryOnList }) => {
  const {
    formCategoryState,
    handleCategoryNameChange,
    handleCategoryActiveStateChange,
    isEditingCategoryName,
    setIsEditingCategoryName,
    inputCategoryNameStyle,
    discardCategoryNameEdition,
    updatingCategory,
    updateCategoryName
  } = useCategoryCard(category, updateCategoryOnList);

  return (
    <article className="border border-gray-300 p-5 rounded-lg flex items-center">
      <main className="flex items-center grow">
        <input
          disabled={updatingCategory}
          value={formCategoryState.name}
          onChange={handleCategoryNameChange}
          className={!isEditingCategoryName ? "mr-6 border-none font-semibold" : "mr-0 text-base font-normal"}
          style={inputCategoryNameStyle}
          onFocus={() => setIsEditingCategoryName(true)}
          aria-describedby={`categoryNameInputDescription${category.id}`}
        />
        <p className="sr-only" id={`categoryNameInputDescription${category.id}`}>Nombre de la categoría a modificar</p>
        {
          isEditingCategoryName && (
            <div className="flex-shrink-0 ml-3 mr-6">
              <SecondaryIconButton 
                disabled={updatingCategory} 
                className="flex-shrink-0"
                onClick={updateCategoryName}
                aria-describedby={`discardNameChangesButtonDescription${category.id}`}
              >
                <FaRegSave/>
              </SecondaryIconButton>
              <p className="sr-only" id={`discardNameChangesButtonDescription${category.id}`}>Descartar los cambios realizados al nombre de la categoría</p>
              <SecondaryIconButton 
                className="ml-1 border-red-300 hover:border-red-400 text-red-600 hover:text-red-700"
                onClick={discardCategoryNameEdition}
                disabled={updatingCategory}
                aria-describedby={`saveNameChangesButtonDescription${category.id}`}
              >
                <IoClose/>
              </SecondaryIconButton>
              <p className="sr-only" id={`saveNameChangesButtonDescription${category.id}`}>Guardar los cambios realizados al nombre de la categoría</p>
            </div>
          )
        }
      </main>
      <footer className="shrink-0 flex">
        <ToggleSwitch 
          disabled={updatingCategory} 
          isChecked={formCategoryState.isActive} 
          setIsChecked={handleCategoryActiveStateChange}
        />
      </footer>
    </article>
  );
}
