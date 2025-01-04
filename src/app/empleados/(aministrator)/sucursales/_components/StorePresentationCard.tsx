import { TernaryButton } from "@/components/buttons/TernaryButton";
import { Store } from "@/types/types/model/stores";
import { parseToCommonTime } from "@/utils/date";
import { AdvancedMarker, Map, Pin } from "@vis.gl/react-google-maps";
import { FC } from "react";

type StorePresentationCardProps = {
  store: Store;
  onModifyStoreButtonClick: () => void;
};

export const StorePresentationCard: FC<StorePresentationCardProps> = ({ store, onModifyStoreButtonClick }) => {
  const storeLocation = { lat: store.latitude, lng: store.longitude };

  return (
    <article className="p-8 rounded-lg border border-gray-300">
      <header className="border border-gray-300 rounded-lg h-72 overflow-hidden">
        <Map
          style={{width: "100%", height: "100%"}}
          defaultCenter={storeLocation}
          defaultZoom={17}
          gestureHandling="none"
          disableDefaultUI={true}
          id={`map-${store.id}`}
          mapId={`map-${store.id}`}
          reuseMaps
          scrollwheel={false}
          keyboardShortcuts={false}
        >
          <AdvancedMarker position={storeLocation}>
            <Pin
              background="#f97316"
              borderColor="transparent"
              glyphColor="#fed7aa"
            />
          </AdvancedMarker>
        </Map>
      </header>

      <main className="mt-6">
        <h1>{store.name}</h1>

        <section className="mt-3">
          <p className="font-bold"><small>Horario de atención</small></p>
          <p className="text-xl">{`${parseToCommonTime(store.openingTime)}-${parseToCommonTime(store.closingTime)}`}</p>
        </section>

        <section className="mt-3">
          <p className="font-bold"><small>Dirección</small></p>
          <p>{store.address}</p>
        </section>
      </main>

      <footer className="flex justify-end mt-3">
        <TernaryButton onClick={onModifyStoreButtonClick}>Editar sucursal</TernaryButton>
      </footer>
    </article>
  );
}
