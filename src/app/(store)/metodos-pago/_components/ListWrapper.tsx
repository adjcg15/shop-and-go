"use client";
import { usePaymentMethods } from "../_hooks/usePaymentMethods";
import { PaymentMethods } from "./PaymentMethod";

export const ListWrapper = () => {
  const { paymentMethods, loading, deletePaymentMethod } = usePaymentMethods();

  if (loading)
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-center mt-36 text-2xl gap-8">
          Cargando métodos de pago...
        </p>
      </div>
    );
  if (!paymentMethods || paymentMethods.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-center mt-36 text-2xl gap-8">
          No existen métodos de pago registrados, <br />
          deberá registrar uno nuevo
        </p>
      </div>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-4 mt-9 gap-8 bg-gray-300 p-4 border border-slate-500">
        <li className="flex justify-center items-center">
          <p className="text-lg font-semibold text-gray-800">Banco</p>
        </li>
        <li className="flex justify-center items-center">
          <p className="text-lg font-semibold text-gray-800">Tarjeta</p>
        </li>
        <li className="flex justify-center items-center">
          <p className="text-lg font-semibold text-gray-800">Titular</p>
        </li>
        <li className="flex justify-center items-center">
          <p className="text-lg font-semibold text-gray-800">Eliminación</p>
        </li>
      </ul>
      <PaymentMethods
        paymentMethods={paymentMethods}
        onDelete={deletePaymentMethod}
      />
    </>
  );
};
