import AuthContext from "@/contexts/auth/context";
import { CreateAddressMethodErrorCodes } from "@/types/enums/error_codes";
import { NotificationTypes } from "@/types/enums/notifications";
import { NotificationInfo } from "@/types/types/components/notifications";
import { Address } from "@/types/types/model/deliveries";
import shopAndGoAPI from "@/utils/axios";
import { isClientErrorHTTPCode } from "@/utils/http";
import { notify } from "@/utils/notifications";
import { isAxiosError } from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type AutocompletedPlace = Pick<
  google.maps.places.PlaceResult,
  "geometry" | "name" | "formatted_address" | "address_components"
>;

const EMPTY_ADDRESS: Address = {
  id: 0,
  street: "",
  streetNumber: "",
  apartmentNumber: null,
  neighborhood: "",
  municipality: "",
  city: "",
  postalCode: "",
  state: "",
  latitude: 19.42281838838243,
  longitude: -99.14095063624518,
  isActive: false,
};

export function useAddressForm(onSubmitComplete: (address: Address) => void) {
  const [isSavingChanges, setIsSavingChanges] = useState(false);
  const {
    handleSubmit: submitWrapper,
    formState: { errors },
    getValues,
    setValue,
    setFocus,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: EMPTY_ADDRESS,
  });
  const { clientProfile } = useContext(AuthContext);

  const createAddress = useCallback(
    async (address: Address) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, isActive, ...addressBody } = address;

      const { data: newAddress } = await shopAndGoAPI.post<Address>(
        `/clients/${clientProfile?.id}/addresses`,
        addressBody
      );

      notify({
        title: "Dirección registrada con éxito",
        type: NotificationTypes.SUCCESS,
      });
      onSubmitComplete(newAddress);
    },
    [onSubmitComplete, clientProfile?.id]
  );

  const saveChanges = useCallback(
    async (address: Address) => {
      setIsSavingChanges(true);

      try {
        if (clientProfile) await createAddress(address);
        else onSubmitComplete(address);
      } catch (error) {
        const notificationInfo: NotificationInfo = {
          title: "Error al guardar la dirección",
          message:
            "Ocurrió un error al guardar la dirección, por favor intenta de nuevo.",
          type: NotificationTypes.ERROR,
        };

        if (
          isAxiosError(error) &&
          isClientErrorHTTPCode(Number(error.response))
        ) {
          notificationInfo.type = NotificationTypes.WARNING;
          switch (error.response?.data.errorCode) {
            case CreateAddressMethodErrorCodes.CLIENT_NOT_FOUND:
              notificationInfo.title = "Cliente no encontrado";
              notificationInfo.message =
                "No se encontró la cuenta de cliente actual, por favor inicia sesión nuevamente e intentálo de nuevo.";
              break;
            case CreateAddressMethodErrorCodes.ADDRESS_ALREADY_EXISTS:
              notificationInfo.title = "Dirección ya registrada";
              notificationInfo.message =
                "Ya existe una dirección con la ubicación indicada.";
              break;
            default:
              if (error.response?.data.message) {
                notificationInfo.title = "Sin sucursal cercana";
                notificationInfo.message =
                  "Lo sentimos, no contamos con una sucursal cercana a la dirección ingresada. Por favor, verifica los datos o ingresa una dirección diferente.";
              }
              break;
          }
        }

        notify(notificationInfo);
      } finally {
        setIsSavingChanges(false);
      }
    },
    [createAddress, clientProfile, onSubmitComplete]
  );

  const onSubmit: SubmitHandler<Address> = async (address) => {
    if (address.street === "") {
      setError("street", {
        type: "manual",
        message: "La dirección es obligatoria",
      });
    } else {
      clearErrors();
      await saveChanges(address);
    }
  };
  const handleSubmit = submitWrapper(onSubmit);

  const handleNewPlaceSelected = useCallback(
    (place: AutocompletedPlace | null) => {
      if (
        place &&
        place.formatted_address &&
        place.geometry &&
        place.geometry.location
      ) {
        const addressComponents = place.address_components || [];
        let streetNumberFound = false;

        addressComponents.forEach((component) => {
          if (component.types.includes("route"))
            setValue("street", component.long_name, { shouldValidate: true });

          if (component.types.includes("street_number")) {
            setValue("streetNumber", component.long_name, {
              shouldValidate: true,
            });
            streetNumberFound = true;
          }

          if (component.types.includes("subpremise"))
            setValue("apartmentNumber", component.long_name, {
              shouldValidate: true,
            });

          if (
            component.types.includes("sublocality") ||
            component.types.includes("neighborhood") ||
            component.types.includes("sublocality_level_1")
          )
            setValue("neighborhood", component.long_name, {
              shouldValidate: true,
            });

          if (component.types.includes("locality")) {
            setValue("city", component.long_name, { shouldValidate: true });
            setValue("municipality", component.long_name, {
              shouldValidate: true,
            });
          }

          if (component.types.includes("postal_code"))
            setValue("postalCode", component.long_name, {
              shouldValidate: true,
            });

          if (component.types.includes("administrative_area_level_1"))
            setValue("state", component.long_name, { shouldValidate: true });
        });

        if (!streetNumberFound) {
          setValue("streetNumber", "S/N", {
            shouldValidate: true,
          });
        }

        setValue("latitude", place.geometry.location.lat(), {
          shouldValidate: true,
        });
        setValue("longitude", place.geometry.location.lng(), {
          shouldValidate: true,
        });

        clearErrors();
      } else {
        notify(
          "No fue posible recuperar la información de la dirección seleccionada"
        );
      }
    },
    [setValue, clearErrors]
  );

  useEffect(() => {
    setFocus("street");
  }, [setFocus]);

  return {
    errors,
    handleSubmit,
    getValues,
    setValue,
    handleNewPlaceSelected,
    isSavingChanges,
  };
}
