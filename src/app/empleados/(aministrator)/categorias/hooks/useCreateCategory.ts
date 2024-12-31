import { NotificationTypes } from "@/types/enums/notifications";
import { ProductCategory } from "@/types/types/model/products";
import shopAndGoAPI from "@/utils/axios";
import { isClientErrorHTTPCode } from "@/utils/http";
import { notify } from "@/utils/notifications";
import { isAxiosError } from "axios";
import { useCallback, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type ProductCategoryForm = {
  name: string;
  isActive: boolean;
};

export function useCreateCategory(addCategoryToList: (category: ProductCategory) => void) {
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState(false);
  const FORM_INITIAL_VALUES = useMemo(() => ({
    name: "",
    isActive: true
  }), []);
  const {
    register,
    reset,
    handleSubmit: submitWrapper,
    formState: { errors }
  } = useForm({
    defaultValues: FORM_INITIAL_VALUES
  });

  const openCreateCategoryModal = useCallback(() => {
    setIsCreateCategoryModalOpen(true);
  }, []);

  const closeCreateCategoryModal = useCallback(() => {
    setIsCreateCategoryModalOpen(false);
    reset();
  }, [reset]);

  const showSuccessCategoryCreationMessage = useCallback(() => {
    notify({
      title: "Categoría creada",
      message: "La información de la categoría ha sido guardada con éxito.",
      type: NotificationTypes.SUCCESS
    });
  }, []);

  const showRepeatedCategoryNameMessage = useCallback(() => {
    notify({
      title: "Nombre duplicado",
      message: "El nombre de la categoría que intenta registrar ya se encuentra en uso.",
      type: NotificationTypes.WARNING
    });
  }, []);

  const showCreationError = useCallback(() => {
    const message = "Hemos tenido problemas para guardar la información "
    + "de la categoría, por favor intente más tarde.";

    notify({
      title: "Error al guardar",
      message,
      type: NotificationTypes.ERROR
    });
  }, []);

  const onSubmit: SubmitHandler<ProductCategoryForm> = async (data) => {
    setIsCreatingCategory(true);
    
    try {
      const { data: newCategory } = await shopAndGoAPI.post<ProductCategory>("/product-categories", data);
      closeCreateCategoryModal();
      addCategoryToList(newCategory);
      showSuccessCategoryCreationMessage();
    } catch(error) {
      if (
        isAxiosError(error) &&
        isClientErrorHTTPCode(Number(error.response?.status))) {
        showRepeatedCategoryNameMessage();
      } else {
        showCreationError();
      }
    } finally {
      setIsCreatingCategory(false);
    }
  };
  const handleSubmit = submitWrapper(onSubmit);

  return {
    register,
    submitWrapper,
    errors,
    isCreatingCategory,
    isCreateCategoryModalOpen,
    openCreateCategoryModal,
    closeCreateCategoryModal,
    handleSubmit
  }
}