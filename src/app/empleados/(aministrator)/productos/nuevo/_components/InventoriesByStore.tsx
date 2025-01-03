"use client";
import { FC } from "react";

type InventoriesByStoreProps = {
    inventory?: {
        id?: number;
        amount?: number;
        expirationDate?: string;
    };
    store: {
        id: number;
        name: string;
    };
};

export const InventoriesByStore: FC<InventoriesByStoreProps> = ({
    inventory,
    store,
}) => {
    return (
        <ul
            key={inventory ? inventory.id : ""}
            className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 bg-gray-50 p-4 border border-gray-300"
        >
            <li
                key={store.id}
                className="flex justify-center items-center col-span-1 col-start-1"
            >
                <p className="text-xs sm:text-sm lg:text-base font-regular text-gray-800 text-center break-words">
                    {store.name}
                </p>
            </li>
            <li className="flex justify-center items-center col-span-1 col-start-2">
                <input
                    id="expirationDate"
                    type="date"
                    defaultValue={inventory ? inventory.expirationDate : ""}
                />
            </li>
            <li className="flex justify-center items-center col-span-1 col-start-3">
                <input
                    id="amount"
                    type="number"
                    min="1"
                    defaultValue={inventory ? inventory.amount : ""}
                />
            </li>
        </ul>
    );
};
