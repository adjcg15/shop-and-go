import { CreateStoreErrorCodes, UpdateStoreErrorCodes } from "@/types/enums/error_codes";
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

const EMPTY_STORE: Store = {
  id: 0,
  name: "",
  address: "",
  closingTime: "",
  openingTime: "",
  latitude: 19.42281838838243, 
  longitude: -99.14095063624518
};

export function useStoreForm(storeInitialValue: Store | undefined, onSubmitComplete: (store: Store) => void) {
  const [isSavingChanges, setIsSavingChanges] = useState(false);
  const {
    register,
    handleSubmit: submitWrapper,
    formState: { errors },
    getValues,
    setValue,
    setFocus,
    setError,
    clearErrors
  } = useForm({
    defaultValues: storeInitialValue ?? EMPTY_STORE
  });

  const updateStore = useCallback(async (store: Store) => {
    const { data: newStore } = await shopAndGoAPI.put<Store>(`/stores/${store.id}`, store);
    const notificationInfo: NotificationInfo = {
      title: "Sucursal actualizada",
      message: "La información de la sucursal ha sido actualizada exitosamente.",
      type: NotificationTypes.SUCCESS,
    };

    notify(notificationInfo);
    onSubmitComplete(newStore);
  }, [onSubmitComplete]);

  const createStore = useCallback(async (store: Store) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...storeWithoudId } = store;
    const { data: newStore } = await shopAndGoAPI.post<Store>(`/stores`, storeWithoudId);

    notify({
      title: "Sucursal registrada con éxito",
      type: NotificationTypes.SUCCESS
    });
    onSubmitComplete(newStore);
  }, [onSubmitComplete]);

  const saveChanges = useCallback(async (store: Store) => {
    store.openingTime += store.openingTime.length === 5 ? ":00" : "";
    store.closingTime += store.closingTime.length === 5 ? ":00" : "";

    setIsSavingChanges(true);
    try {
      if(storeInitialValue) {
        await updateStore(store);
      } else {
        await createStore(store);
      }
    } catch(error) {
      const notificationInfo: NotificationInfo = {
        title: "Error al guardar",
        message: "No hemos podido guardar la información de la sucursal, por favor intente más tarde.",
        type: NotificationTypes.ERROR,
      };

      if (
        isAxiosError(error) &&
        isClientErrorHTTPCode(Number(error.response?.status))
      ) {
        notificationInfo.type = NotificationTypes.WARNING;
        switch(error.response?.data.errorCode) {
          case UpdateStoreErrorCodes.STORE_LOCATION_DUPLICATED:
          case CreateStoreErrorCodes.STORE_LOCATION_DUPLICATED:
            notificationInfo.message = "Ya existe una tienda en la ubicación seleccionada.";
            break;
          case UpdateStoreErrorCodes.STORE_NAME_DUPLICATED: 
          case CreateStoreErrorCodes.STORE_NAME_DUPLICATED:
            notificationInfo.message = "El nombre de la tienda ya está siendo usado por otra.";
            break;
        }
      }

      notify(notificationInfo);
    } finally {
      setIsSavingChanges(false);
    }
  }, [createStore, storeInitialValue, updateStore]);

  const onSubmit: SubmitHandler<Store> = async (storeModified) => {
    if (!storeModified.address) {
      setError("address", { type: "manual", message: "El address es obligatorio" });
    } else {
      clearErrors("address");
      await saveChanges(storeModified);
    }
  };
  const handleSubmit = submitWrapper(onSubmit);

  const handleNewPlaceSelected = useCallback((place: AutocompletedPlace | null) => {
    if(place && place.formatted_address && place.geometry && place.geometry.location ) 
    {
      setValue("address", place.formatted_address, { shouldValidate: true });
      setValue("latitude", place.geometry.location.lat(), { shouldValidate: true });
      setValue("longitude", place.geometry.location.lng(), { shouldValidate: true });

      clearErrors("address");
    } else {
      notify("No fue posible recuperar la información de la dirección seleccionada");
    }
  }, [setValue, clearErrors]);

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
    isSavingChanges
  };
}