import { PaymentMethodForm } from "./_components/PaymentMethodForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registro de un nuevo método de pago",
};

export default function Login() {
  return (
    <div className="my-20 mx-auto w-3/5 lg:w-2/5 px-5 pt-8">
      <header className="flex flex-col items-center">
        <h1 className="lg:text-3xl md:text-3xl sm:text-2xl font-bold text-gray-800">
          Registro de tarjeta
        </h1>
      </header>
      <PaymentMethodForm />
    </div>
  );
}
