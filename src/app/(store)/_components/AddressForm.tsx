import { Address } from "@/types/types/model/deliveries";
import { FC } from "react";
import { useAddressForm } from "../_hooks/useAddressForm";
import { PlaceAutocomplete } from "@/components/inputs/PlaceAutocomplete";
import { AdvancedMarker, Map, Pin } from "@vis.gl/react-google-maps";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";

type AddressFormProps = {
  onSubmitComplete: (address: Address) => void;
};

export const AddressForm: FC<AddressFormProps> = ({ onSubmitComplete }) => {
  const {
    errors,
    handleSubmit,
    getValues,
    handleNewPlaceSelected,
    isSavingChanges,
  } = useAddressForm(onSubmitComplete);

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={`mx-auto max-w-lg px-5 pt-8 pb-16 form-group ${
          errors.street ? "invalid" : ""
        } mt-0`}
      >
        <label htmlFor="street">
          Dirección
          <abbr className="text-orange-600 no-underline" title="Requerido">
            *
          </abbr>
        </label>
        <PlaceAutocomplete
          id="street"
          onPlaceSelect={handleNewPlaceSelected}
          value={getValues("street")}
          disabled={isSavingChanges}
          placeholder="Calle, número exterior e interior, colonia"
        />
        <p className="error">La dirección no puede estar vacía</p>
        <div className="border border-gray-300 rounded-lg h-72 overflow-hidden mt-1">
          <Map
            style={{ width: "100%", height: "100%" }}
            center={{ lat: getValues("latitude"), lng: getValues("longitude") }}
            zoom={17}
            gestureHandling="none"
            disableDefaultUI={true}
            id={`map-creating-id`}
            mapId={`map-creating-id`}
            reuseMaps
            scrollwheel={false}
            keyboardShortcuts={false}
          >
            <AdvancedMarker
              position={{
                lat: getValues("latitude"),
                lng: getValues("longitude"),
              }}
            >
              <Pin
                background="#f97316"
                borderColor="transparent"
                glyphColor="#fed7aa"
              />
            </AdvancedMarker>
          </Map>
        </div>

        <div className="mt-5 sm:flex justify-end">
          <SecondaryButton
            className="block sm:inline-block w-full sm:w-auto mt-3 sm:mt-0"
            disabled={isSavingChanges}
            aria-describedby="addAddressButtonDescription"
          >
            Agregar dirección
          </SecondaryButton>
          <p className="sr-only" id="addAddressButtonDescription">
            Agrega la dirección a tu lista de direcciones de entrega
          </p>
        </div>
      </div>
    </form>
  );
};
