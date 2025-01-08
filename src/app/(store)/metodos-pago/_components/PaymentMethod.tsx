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
                    className="grid grid-cols-4 gap-4 sm:gap-6 lg:gap-8 bg-gray-50 p-4 border border-gray-300"
                >
                    <li className="flex justify-center items-center">
                        <p className="text-xs sm:text-sm lg:text-base font-regular text-gray-800 text-center break-words">
                            {method.bankIssuer}
                        </p>
                    </li>
                    <li className="flex justify-center items-center">
                        <p className="text-xs sm:text-sm lg:text-base font-regular text-gray-800 text-center break-words">
                            <span className="hidden sm:inline">**** </span>
                            {method.endCardNumber}
                        </p>
                    </li>
                    <li className="flex justify-center items-center">
                        <p className="text-xs sm:text-sm lg:text-base font-regular text-gray-800 text-center break-words">
                            {method.cardholderName}
                        </p>
                    </li>
                    <li className="flex justify-center items-center">
                        <button
                            className="flex items-center justify-center text-gray-800 hover:text-red-500"
                            onClick={() => onDelete(method)}
                            aria-describedby="deletePaymentMethodButton"
                        >
                            <FaTrashAlt />
                        </button>
                        <p className="sr-only" id="deletePaymentMethodButton">
                            Mostrar modal de confirmación para eliminar método de pago con terminación {method.endCardNumber}
                        </p>
                    </li>
                </ul>
            ))}
        </>
    );
};
