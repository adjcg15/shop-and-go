import { AddressSelector } from "./_components/AddressSelector";

export default function DeliveryAddressSelectionPage() {
  return (
    <main className="px-4 sm:px-8 lg:px-12 max-w-screen-2xl mx-auto pt-8 pb-16">
      <h1>Selección de dirección de entrega</h1>
      <section aria-labelledby="address-selector-label">
        <h2 id="address-selector-label" className="sr-only">Selector de dirección de entrega</h2>
        <AddressSelector />
      </section>
    </main>
  );
}