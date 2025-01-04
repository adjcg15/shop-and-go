import { TernaryButton } from "@/components/buttons/TernaryButton";
import { Store } from "@/types/types/model/stores";
import { FC } from "react";

type StoreCardProps = {
  store: Store;
};

export const StoreCard:FC<StoreCardProps> = ({store}) => {
  return (
    <article className="p-8 rounded-lg border border-gray-300">
      <header className="border border-gray-300 rounded-lg h-72">

      </header>

      <main className="mt-6">
        <h1>{store.name}</h1>

        <section className="mt-3">
          <p className="font-bold"><small>Horario de atención</small></p>
          <p className="text-xl">{`${store.openingTime}-${store.closingTime}`}</p>
        </section>

        <section className="mt-3">
          <p className="font-bold"><small>Dirección</small></p>
          <p>{store.address}</p>
        </section>
      </main>

      <footer className="flex justify-end mt-3">
        <TernaryButton>Editar sucursal</TernaryButton>
      </footer>
    </article>
  );
}
