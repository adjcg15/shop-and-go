import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { TernaryButton } from "@/components/buttons/TernaryButton";
import { PlaceAutocomplete } from "@/components/inputs/PlaceAutocomplete";
import { Store } from "@/types/types/model/stores";
import { FC } from "react";
import { useModifyStore } from "../hooks/useModifyStore";
import { STORE_NAME_FORMAT } from "@/utils/regexp";
import { AdvancedMarker, Map, Pin } from "@vis.gl/react-google-maps";

type ModifyStoreCardProps = {
  store: Store;
  onDiscardEditionButtonClick: () => void;
};

export const ModifyStoreCard: FC<ModifyStoreCardProps> = ({ store, onDiscardEditionButtonClick }) => {
  const {
    register,
    errors,
    handleSubmit,
    getValues,
    handleNewPlaceSelected
  } = useModifyStore(store);

  return (
    <article className="p-8 rounded-lg border border-gray-300">
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
          />
          <p className="error">El nombre solo puede tener números y letras y no debe superar los 255 caracteres</p>
        </div>

        <div className={`form-group ${errors.address ? "invalid" : ""}`}>
          <label htmlFor="address">Dirección</label>
          <PlaceAutocomplete
            id="address"
            onPlaceSelect={handleNewPlaceSelected}
            value={getValues("address")}
          />
          <p className="error">La dirección no puede estar vacía</p>
          <div className="border border-gray-300 rounded-lg h-72 overflow-hidden mt-1">
            <Map
              style={{width: "100%", height: "100%"}}
              center={{lat: getValues("latitude"), lng: getValues("longitude") }}
              zoom={17}
              gestureHandling="none"
              disableDefaultUI={true}
              id={`map-${store.id}`}
              mapId={`map-${store.id}`}
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
            />
            <p className="error">El horario de cierre no puede estar vacío</p>
          </div>
        </div>

        <div className="mt-5 sm:flex justify-end">
          <TernaryButton 
            onClick={onDiscardEditionButtonClick} 
            type="button" 
            className="block sm:inline-block w-full sm:w-auto sm:mr-3"
          >
            Descartar
          </TernaryButton>
          <SecondaryButton className="block sm:inline-block w-full sm:w-auto mt-3 sm:mt-0">
            Guardar cambios
          </SecondaryButton>
        </div>
      </form>
    </article>
  );
}
