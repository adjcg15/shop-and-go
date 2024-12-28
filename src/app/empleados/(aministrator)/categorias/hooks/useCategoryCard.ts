"use client";
import { NotificationTypes } from "@/types/enums/notifications";
import { ProductCategory } from "@/types/types/model/products";
import shopAndGoAPI from "@/utils/axios";
import { notify } from "@/utils/notifications";
import { ChangeEventHandler, useCallback, useMemo, useState } from "react";

export function useCategoryCard(category: ProductCategory, updateCategoryOnList: (category: ProductCategory) => void) {
  const [formCategoryState, setFormCategoryState] = useState({
    name: category.name,
    isActive: category.isActive!
  });
  const [updatingCategory, setUpdatingCategory] = useState(false);
  const [isEditingCategoryName, setIsEditingCategoryName] = useState(false);
  const inputCategoryNameStyle = useMemo(() => {
    return {
      backgroundColor: !isEditingCategoryName ? "white" : undefined
    }
  }, [isEditingCategoryName]);

  const handleCategoryNameChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => setFormCategoryState(previousValue => ({
      ...previousValue,
      name: e.target.value
    })), 
    []
  );

  const handleCategoryActiveStateChange = useCallback(async (isActive: boolean) => {
    setUpdatingCategory(true);
    setFormCategoryState(previousValue => ({
      ...previousValue,
      isActive
    }));

    try {
      const { data: updatedProductCategory } = await shopAndGoAPI
        .patch<ProductCategory | null>(`/product-categories/${category.id}`, { isActive });
      
      if(updatedProductCategory) {
        updateCategoryOnList(updatedProductCategory);
        notify({
          title: "Categoría actualizada",
          message: `El estado de la categoría "${category.name}" ha sido actualizado correctamente`,
          type: NotificationTypes.SUCCESS
        });
      }
    } catch {
      const message = "Hemos tenido problemas para guardar la información "
      + "de la categoría, por favor intente más tarde.";

      setFormCategoryState(previousValue => ({
        ...previousValue,
        isActive: category.isActive!
      }));

      notify({
        title: "Error al guardar",
        message,
        type: NotificationTypes.ERROR
      });
    } finally {
      setUpdatingCategory(false);
    }
  }, [category, updateCategoryOnList]);

  const discardCategoryNameEdition = useCallback(() => {
    setIsEditingCategoryName(false);
    setFormCategoryState(previousValue => ({
      ...previousValue,
      name: category.name
    }));
  }, [category.name]);
  
  return {
    formCategoryState,
    handleCategoryNameChange,
    handleCategoryActiveStateChange,
    isEditingCategoryName,
    setIsEditingCategoryName,
    inputCategoryNameStyle,
    discardCategoryNameEdition,
    updatingCategory
  };
}