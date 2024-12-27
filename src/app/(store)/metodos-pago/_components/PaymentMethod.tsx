"use client";
import { PaymentMethod } from "@/types/types/model/payment_methods";
import { FC } from "react";
import { FaTrashAlt } from "react-icons/fa";

type PaymentMethodsProps = {
  paymentMethods: {
    id: number;
    bankIssuer: string;
    endCardNumber: string;
    cardholderName: string;
  }[];
  onDelete: (paymentMethod: PaymentMethod) => void;
};

export const PaymentMethods: FC<PaymentMethodsProps> = ({
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
            <p className="text-lg font-regular text-gray-800">
              {method.bankIssuer}
            </p>
          </li>
          <li className="flex justify-center items-center">
            <p className="text-lg font-regular text-gray-800">
              {"XXXX XXXX XXXX " + method.endCardNumber}
            </p>
          </li>
          <li className="flex justify-center items-center">
            <p className="text-lg font-regular text-gray-800">
              {method.cardholderName}
            </p>
          </li>
          <li className="flex justify-center items-center">
            <button
              className="text-lg text-gray-800 hover:text-red-500"
              onClick={() => onDelete(method)}
            >
              <FaTrashAlt />
            </button>
          </li>
        </ul>
      ))}
    </>
  );
};
