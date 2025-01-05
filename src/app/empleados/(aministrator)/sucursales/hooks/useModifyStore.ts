import { UpdateStoreErrorCodes } from "@/types/enums/error_codes";
import { NotificationTypes } from "@/types/enums/notifications";
import { NotificationInfo } from "@/types/types/components/notifications";
import { Store } from "@/types/types/model/stores";
import shopAndGoAPI from "@/utils/axios";
import { isClientErrorHTTPCode } from "@/utils/http";
import { notify } from "@/utils/notifications";
import { isAxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type AutocompletedPlace = Pick<
  google.maps.places.PlaceResult,
  "geometry" | "name" | "formatted_address" | "address_components"
>;

export function useModifyStore(store: Store, updateStoreOnList: (store: Store) => void) {
  const [isUpdatingStore, setIsUpdatingStore] = useState(false);
  const {
    register,
    handleSubmit: submitWrapper,
    formState: { errors },
    getValues,
    setValue,
    setFocus
  } = useForm({
    defaultValues: store
  });

  const onSubmit: SubmitHandler<Store> = async (storeModified) => {
    storeModified.openingTime += storeModified.openingTime.length === 5 ? ":00" : "";
    storeModified.closingTime += storeModified.closingTime.length === 5 ? ":00" : "";

    setIsUpdatingStore(true);
    try {
      const { data: newStore } = await shopAndGoAPI.put<Store>(`/stores/${storeModified.id}`, storeModified);
      const notificationInfo: NotificationInfo = {
        title: "Sucursal actualizada",
        message: "La información de la sucursal ha sido actualizada exitosamente.",
        type: NotificationTypes.SUCCESS,
      };

      notify(notificationInfo);
      updateStoreOnList(newStore);
    } catch(error) {
      const notificationInfo: NotificationInfo = {
        title: "Error al actualizar",
        message: "No hemos podido completar la actualización de la categoría, por favor intente más tarde.",
        type: NotificationTypes.ERROR,
      };

      if (
        isAxiosError(error) &&
        isClientErrorHTTPCode(Number(error.response?.status))
      ) {
        notificationInfo.type = NotificationTypes.WARNING;
        switch(error.response?.data.errorCode) {
          case UpdateStoreErrorCodes.STORE_LOCATION_DUPLICATED:
            notificationInfo.message = "Ya existe una tienda en la ubicación seleccionada.";
            break;
          case UpdateStoreErrorCodes.STORE_NAME_DUPLICATED: 
            notificationInfo.message = "El nombre de la tienda ya está siendo usado por otra.";
            break;
        }
      }

      notify(notificationInfo);
    } finally {
      setIsUpdatingStore(false);
    }
  };
  const handleSubmit = submitWrapper(onSubmit);

  const handleNewPlaceSelected = useCallback((place: AutocompletedPlace | null) => {
    if(place && place.formatted_address && place.geometry && place.geometry.location ) 
    {
      setValue("address", place.formatted_address, { shouldValidate: true });
      setValue("latitude", place.geometry.location.lat(), { shouldValidate: true });
      setValue("longitude", place.geometry.location.lng(), { shouldValidate: true });
    } else {
      notify("No fue posible recuperar la información de la dirección seleccionada");
    }
  }, [setValue]);

  useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  return {
    register,
    errors,
    handleSubmit,
    getValues,
    setValue,
    handleNewPlaceSelected,
    isUpdatingStore
  }
}