"use client";

import { FC } from "react";
import { FaTrashAlt } from "react-icons/fa";

type PaymentMethodProps = {
  paymentMethods: {
    id: number;
    banco: string;
    tarjeta: string;
    titular: string;
  }[];
  onDelete: (id: number) => void;
};

export const PaymentMethod: FC<PaymentMethodProps> = ({
  paymentMethods,
  onDelete,
}) => {
  return (
    <>
      {paymentMethods.map((method) => (
        <ul
          key={method.id}
          className="grid grid-cols-4 gap-8 bg-gray-50 p-4 border border-gray-300"
        >
          <li className="flex justify-center items-center">
            <p className="text-lg font-semibold text-gray-800">
              {method.banco}
            </p>
          </li>
          <li className="flex justify-center items-center">
            <p className="text-lg font-semibold text-gray-800">
              {method.tarjeta}
            </p>
          </li>
          <li className="flex justify-center items-center">
            <p className="text-lg font-semibold text-gray-800">
              {method.titular}
            </p>
          </li>
          <li className="flex justify-center items-center">
            <button
              className="text-lg text-gray-800 hover:text-red-500"
              onClick={() => onDelete(method.id)}
            >
              <FaTrashAlt />
            </button>
          </li>
        </ul>
      ))}
    </>
  );
};
