import { Store } from "@/types/types/model/stores";
import { notify } from "@/utils/notifications";
import { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type AutocompletedPlace = Pick<
  google.maps.places.PlaceResult,
  "geometry" | "name" | "formatted_address" | "address_components"
>;

export function useModifyStore(store: Store) {
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
    console.log(storeModified);
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
    handleNewPlaceSelected
  }
}