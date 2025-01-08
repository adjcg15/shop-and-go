"use client";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Modal } from "@/components/ui/Modal";
import { useCreateCategory } from "../hooks/useCreateCategory";
import { CATEGORY_NAME_FORMAT } from "@/utils/regexp";
import { TernaryButton } from "@/components/buttons/TernaryButton";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { ProductCategory } from "@/types/types/model/products";
import { FC } from "react";

type CreateCategorySectionProps = {
  addCategoryToList: (category: ProductCategory) => void;
};

export const CreateCategorySection: FC<CreateCategorySectionProps> = ({ addCategoryToList }) => {
  const {
    register,
    errors,
    isCreatingCategory,
    isCreateCategoryModalOpen,
    openCreateCategoryModal,
    closeCreateCategoryModal,
    handleSubmit
  } = useCreateCategory(addCategoryToList);

  return (
    <section className="flex justify-end">
      <PrimaryButton aria-describedby="createCategoryButtonDescription" onClick={openCreateCategoryModal}>Nueva categoría</PrimaryButton>
      <p className="sr-only" id="createCategoryButtonDescription">Mostrar la ventana para registrar una nueva categoría de productos</p>

      <Modal isOpen={isCreateCategoryModalOpen} handleCloseModal={closeCreateCategoryModal}>
        <h1 className="text-xl">Nueva categoría</h1>
        <form onSubmit={handleSubmit}>
          <div className={`form-group ${errors.name ? "invalid" : ""}`}>
            <label htmlFor="name">Nombre de la categoría <abbr className="text-orange-600 no-underline" title="Requerido">*</abbr></label>
            <input 
              {
                ...register(
                  "name", 
                  { 
                    required: true, 
                    maxLength: 255,  
                    pattern: CATEGORY_NAME_FORMAT
                  }
                )
              }
              id="name" 
              type="text"
              disabled={isCreatingCategory}
              aria-describedby="categoryNameInputDescription"
            />
            <p className="sr-only" id="categoryNameInputDescription">Nombre de la categoría de productos</p>
            <p className="error">El nombre solo acepta números, letras y espacios</p>
          </div>
          <div className={`form-group ${errors.isActive ? "invalid" : ""} flex items-center flex-row-reverse justify-end mt-3`}>
            <label htmlFor="isActive" className="ml-2">Categoría activa</label>
            <input 
              {
                ...register(
                  "isActive", 
                  { 
                    required: true, 
                    maxLength: 255,  
                    pattern: CATEGORY_NAME_FORMAT
                  }
                )
              }
              id="isActive" 
              type="checkbox"
              disabled={isCreatingCategory}
              aria-describedby="categoryIsActiveInputDescription"
            />
            <p className="sr-only" id="categoryIsActiveInputDescription">Especifica si la nueva categoría será mostrada a los usuarios, es decir, si estará activa</p>
            <p className="error">El nombre solo acepta números, letras y espacios</p>
          </div>

          <div className="mt-6 mb-[5px] flex items-center justify-end">
            <TernaryButton 
              type="button" 
              className="mr-3 text-red-600 hover:text-red-700"
              disabled={isCreatingCategory}
              onClick={closeCreateCategoryModal}
              aria-describedby="discardCategoryCreationButtonDescription"
            >
              Descartar
            </TernaryButton>
            <p className="sr-only" id="discardCategoryCreationButtonDescription">Cerrar la ventana de creación de categoría y descartar la información ingresada</p>
            <SecondaryButton aria-describedby="saveCategoryInfoButtonDescription" disabled={isCreatingCategory}>Crear categoría</SecondaryButton>
            <p className="sr-only" id="saveCategoryInfoButtonDescription">Guardar la información de la nueva categoría en el sistema</p>
          </div>
        </form>
      </Modal>
    </section>
  );
}
