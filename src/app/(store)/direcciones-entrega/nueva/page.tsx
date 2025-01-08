import { Metadata } from "next";
import { CreateAddressForm } from "./_components/CreateAddressForm";

export const metadata: Metadata = {
  title: "Registrar nueva dirección de entrega"
};

export default function NewAddressPage() {
  return (
    <div className="px-4 sm:px-8 lg:px-12 max-w-screen-2xl mx-auto pt-8 pb-16">
      <header className="flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Registrar nueva dirección de entrega
        </h1>
      </header>
        <section aria-labelledby="address-form-label">
            <h2 id="address-form-label" className="sr-only">Formulario de dirección de entrega</h2>
            <CreateAddressForm />
        </section>
    </div>
  );
}
