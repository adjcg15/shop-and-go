"use client";
import { ErrorBanner } from "@/components/ui/ErrorBanner";
import { useStores } from "@/hooks/useStores";
import { useEffect } from "react";
import { StoreCard } from "./StoreCard";
import { StoreCardSkeleton } from "./StoreCardSkeleton";
import { APIProvider } from "@vis.gl/react-google-maps";

export const StoresList = () => {
    const { recoverStores, storesList, updateStoreOnList } = useStores();

    useEffect(() => {
      recoverStores();
    }, [recoverStores]);

    return (
      <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY || ""}>
        {
          storesList.error
          ? (
            <ErrorBanner
              image={{
                src: "/illustrations/server-error.svg",
                alt: "Ilustración representativa de un error en un servidor"
              }}
              message={storesList.error}
              title="¡Problemas técnicos!"
            />
          )
          : (
            <ul className="lg:grid lg:grid-cols-2 lg:gap-4 mt-3">
              {
                storesList.loading
                ? (
                  Array.from({ length: 6 }, (_, index) => (
                    <li key={index} className="mb-4 lg:mb-0">
                      <StoreCardSkeleton/>
                    </li>
                  ))
                )
                : (
                  storesList.value.length > 0
                  ? (
                    storesList.value.map(store => (
                      <li className="mb-4 lg:mb-0" key={store.id}>
                        <StoreCard store={store} updateStoreOnList={updateStoreOnList}/>
                      </li>
                    ))
                  )
                  : (
                    <div className="col-span-full">
                      <ErrorBanner
                        image={{
                          src: "/illustrations/empty-cart.svg",
                          alt: "Imagen representativa de un carrito de compras vacío",
                        }}
                        title={"Lista vacía"}
                        message={`Aún no se ha registrado ninguna sucursal.`}
                      />
                    </div>
                  )
                )
              }
            </ul>
          )
        }
      </APIProvider>
    );
}
