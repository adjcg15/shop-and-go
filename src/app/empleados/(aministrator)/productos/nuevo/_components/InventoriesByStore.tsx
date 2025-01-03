"use client";
import { FC } from "react";

type InventoriesByStoreProps = {
    inventory: {
        idInventory?: number;
        idStore: number;
        storeName: string;
        amount?: number;
        expirationDate?: string;
    };
};

export const InventoriesByStore: FC<InventoriesByStoreProps> = ({
    inventory,
}) => {
    return (
        <ul
            key={inventory.idInventory}
            className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 bg-gray-50 p-4 border border-gray-300"
        >
            <li
                key={inventory.idStore}
                className="flex justify-center items-center col-span-1 col-start-1"
            >
                <p className="text-xs sm:text-sm lg:text-base font-regular text-gray-800 text-center break-words">
                    {inventory.storeName}
                </p>
            </li>
            <li className="flex justify-center items-center col-span-1 col-start-2">
                <input
                    id="expirationDate"
                    type="date"
                    defaultValue={inventory.expirationDate || ""}
                />
            </li>
            <li className="flex justify-center items-center col-span-1 col-start-3">
                <input
                    id="amount"
                    type="number"
                    min="0"
                    defaultValue={
                        inventory.amount !== undefined ? inventory.amount : ""
                    }
                />
            </li>
        </ul>
    );
};
