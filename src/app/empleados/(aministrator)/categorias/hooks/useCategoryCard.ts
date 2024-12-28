"use client";
import { NotificationTypes } from "@/types/enums/notifications";
import { ProductCategory } from "@/types/types/model/products";
import shopAndGoAPI from "@/utils/axios";
import { notify } from "@/utils/notifications";
import { CATEGORY_NAME_FORMAT } from "@/utils/regexp";
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

  const showUpdateError = useCallback(() => {
    const message = "Hemos tenido problemas para guardar la información "
    + "de la categoría, por favor intente más tarde.";

    notify({
      title: "Error al guardar",
      message,
      type: NotificationTypes.ERROR
    });
  }, []);

  const showInvalidCategoryNameError = useCallback(() => {
    notify({
      title: "Nombre inválido",
      message: "Asegúrese de que el nombre ingresado solamente tenga letras, números y espacios y no supere los 255 caracteres.",
      type: NotificationTypes.WARNING
    });
  }, []);

  const updateCategoryName = useCallback(async() => {
    const newCategoryName = formCategoryState.name.trim();

    if(newCategoryName === category.name) return;

    if(!CATEGORY_NAME_FORMAT.test(newCategoryName)) {
      showInvalidCategoryNameError();
      return;
    }

    setUpdatingCategory(true);
    try {
      const { data: updatedProductCategory } = await shopAndGoAPI
        .patch<ProductCategory | null>(`/product-categories/${category.id}`, { name: newCategoryName });
      
      if(updatedProductCategory) {
        updateCategoryOnList(updatedProductCategory);
        notify({
          title: "Categoría actualizada",
          message: `El nombre de la categoría ha sido actualizado correctamente`,
          type: NotificationTypes.SUCCESS
        });
      }
      setIsEditingCategoryName(false);
    } catch {
      showUpdateError();
    } finally {
      setUpdatingCategory(false);
    }
  }, [formCategoryState.name, category.name, showUpdateError, category.id, updateCategoryOnList, showInvalidCategoryNameError]);

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
      setFormCategoryState(previousValue => ({
        ...previousValue,
        isActive: category.isActive!
      }));
      showUpdateError();
    } finally {
      setUpdatingCategory(false);
    }
  }, [category, updateCategoryOnList, showUpdateError]);

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
    updatingCategory,
    updateCategoryName
  };
}