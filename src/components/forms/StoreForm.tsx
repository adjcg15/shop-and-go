"use client";
import { useStoreForm } from "@/hooks/useStoreForm";
import { PlaceAutocomplete } from "../inputs/PlaceAutocomplete";
import { Store } from "@/types/types/model/stores";
import { STORE_NAME_FORMAT } from "@/utils/regexp";
import { AdvancedMarker, Map, Pin } from "@vis.gl/react-google-maps";
import { TernaryButton } from "../buttons/TernaryButton";
import { FC } from "react";
import { SecondaryButton } from "../buttons/SecondaryButton";

type StoreFormProps = {
  initialStoreValue?: Store;
  onSubmitComplete: (store: Store) => void;
  onDiscard: () => void;
};

export const StoreForm: FC<StoreFormProps> = ({ initialStoreValue, onDiscard, onSubmitComplete }) => {
  const {
    register,
    errors,
    handleSubmit,
    getValues,
    handleNewPlaceSelected,
    isSavingChanges
  } = useStoreForm(initialStoreValue, onSubmitComplete);

  return (
    <form onSubmit={handleSubmit}>
      <div className={`form-group ${errors.name ? "invalid" : ""} mt-0`}>
        <label htmlFor="name">Nombre</label>
        <input 
          {
            ...register(
              "name",
              { required: true, maxLength: 255,  pattern: STORE_NAME_FORMAT, validate: value => value.trim() !== "" },
              
            )
          }
          id="name"
          type="text"
          disabled={isSavingChanges}
        />
        <p className="error">El nombre solo puede tener letras y no debe superar los 255 caracteres</p>
      </div>

      <div className={`form-group ${errors.address ? "invalid" : ""}`}>
        <label htmlFor="address">Dirección</label>
        <PlaceAutocomplete
          id="address"
          onPlaceSelect={handleNewPlaceSelected}
          value={getValues("address")}
          disabled={isSavingChanges}
        />
        <p className="error">La dirección no puede estar vacía</p>
        <div className="border border-gray-300 rounded-lg h-72 overflow-hidden mt-1">
          <Map
            style={{width: "100%", height: "100%"}}
            center={{lat: getValues("latitude"), lng: getValues("longitude") }}
            zoom={17}
            gestureHandling="none"
            disableDefaultUI={true}
            id={`map-${initialStoreValue?.id ||"map-creating-id"}`}
            mapId={`map-${initialStoreValue?.id || "map-creating-id"}`}
            reuseMaps
            scrollwheel={false}
            keyboardShortcuts={false}
          >
            <AdvancedMarker position={{lat: getValues("latitude"), lng: getValues("longitude") }}>
              <Pin
                background="#f97316"
                borderColor="transparent"
                glyphColor="#fed7aa"
              />
            </AdvancedMarker>
          </Map>
        </div>
      </div>

      <div className="sm:grid grid-cols-2 gap-3">
        <div className={`form-group ${errors.openingTime ? "invalid" : ""}`}>
          <label htmlFor="openingTime">Horario de apertura</label>
          <input 
            {
              ...register(
                "openingTime", 
                { required: true }
              )
            }
            id="openingTime"
            type="time"
            disabled={isSavingChanges}
          />
          <p className="error">El horario de apertura no puede estar vacío</p>
        </div>

        <div className={`form-group ${errors.closingTime ? "invalid" : ""}`}>
          <label htmlFor="closingTime">Horario de cierre</label>
          <input 
            {
              ...register(
                "closingTime", 
                { required: true }
              )
            }
            id="closingTime"
            type="time"
            disabled={isSavingChanges}
          />
          <p className="error">El horario de cierre no puede estar vacío</p>
        </div>
      </div>

      <div className="mt-5 sm:flex justify-end">
        <TernaryButton 
          onClick={onDiscard} 
          type="button" 
          className="block sm:inline-block w-full sm:w-auto sm:mr-3"
          disabled={isSavingChanges}
        >
          Descartar
        </TernaryButton>
        <SecondaryButton 
          className="block sm:inline-block w-full sm:w-auto mt-3 sm:mt-0"
          disabled={isSavingChanges}
        >
          Guardar cambios
        </SecondaryButton>
      </div>
    </form>
  );
}
