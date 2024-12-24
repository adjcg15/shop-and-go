"use client";
import { PaymentMethod } from "./PaymentMethod";

export const ListWrapper = () => {
  const paymentMethods = [
    { id: 1, banco: "Banco A", tarjeta: "Visa", titular: "Juan Pérez" },
    { id: 2, banco: "Banco B", tarjeta: "MasterCard", titular: "Ana Gómez" },
    {
      id: 3,
      banco: "Banco C",
      tarjeta: "American Express",
      titular: "Carlos Díaz",
    },
  ];
  const handleDelete = (id: number) => {};
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
      <PaymentMethod paymentMethods={paymentMethods} onDelete={handleDelete} />
    </>
  );
};
