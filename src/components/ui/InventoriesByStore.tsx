"use client";
import { FC } from "react";

type InventoryField = "stock" | "expirationDate";

type InventoriesByStoreProps = {
    inventory?: {
        id?: number;
        stock?: number;
        expirationDate?: string;
    };
    store: {
        id: number;
        name: string;
    };
    onInventoryChange: (
        storeId: number,
        field: InventoryField,
        value: string | number | undefined
    ) => void;
    isEdition: boolean;
};

export const InventoriesByStore: FC<InventoriesByStoreProps> = ({
    inventory,
    store,
    isEdition,
    onInventoryChange,
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
                    onChange={(e) =>
                        onInventoryChange(
                            store.id,
                            "expirationDate",
                            e.target.value
                        )
                    }
                />
            </li>
            <li className="flex justify-center items-center col-span-1 col-start-3">
                <input
                    id="stock"
                    type="number"
                    min={isEdition ? "0" : "1"}
                    defaultValue={inventory ? inventory.stock : ""}
                    onChange={(e) => {
                        const value = e.target.value;
                        onInventoryChange(
                            store.id,
                            "stock",
                            value === "" ? undefined : Number(value)
                        );
                    }}
                />
            </li>
        </ul>
    );
};
