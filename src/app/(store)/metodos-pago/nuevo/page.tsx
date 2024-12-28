import { PaymentMethodForm } from "./_components/PaymentMethodForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registro de un nuevo método de pago",
};

export default function Login() {
  return (
    <div className="my-20 mx-auto max-w-md px-5 pt-8">
      <header className="flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Registro de tarjeta
        </h1>
      </header>
      <PaymentMethodForm />
    </div>
  );
}
