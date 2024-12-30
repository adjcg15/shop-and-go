"use client";

import { Address } from "@/types/types/model/deliveries";
import { FC } from "react";
import { IconType } from "react-icons"; 
import { FaMapMarkerAlt, FaTrashAlt } from "react-icons/fa"; 

type AddressesProps = {
  addresses: Address[];
  onSelect?: (address: Address) => void;
  onDelete?: (address: Address) => void;
  showDelete: boolean;
  LocationIcon?: IconType;
};

export const Addresses: FC<AddressesProps> = ({
  addresses,
  onSelect,
  onDelete,
  showDelete,
  LocationIcon = FaMapMarkerAlt,
}) => {
  return (
    <>
      {addresses.map((address, index) => (
        <ul
          key={address.id}
          className={`space-y-4 ${
            (index + 1) % 2 === 0 ? "bg-gray-50" : "bg-white"
          } border-b border-gray-400 p-4`}
        >
          <li className="flex items-center space-x-4">
            <div className="hidden md:block flex-shrink-0">
              <LocationIcon size={24} />
            </div>
            <div className="flex-grow">
              <p className="text-gray-800 font-semibold">
                {address.street} {address.streetNumber}
                {address.apartmentNumber ? `${address.apartmentNumber}` : ""}
              </p>
              <p className="text-gray-600 text-sm">
                {address.neighborhood}, {address.municipality}, {address.state}
              </p>
            </div>
            {showDelete && (
              <button
                onClick={() => onDelete && onDelete(address)}
                className="ml-auto p-2"
              >
                <FaTrashAlt
                  className="flex items-center justify-center text-xs sm:text-sm lg:text-base text-gray-800 hover:text-red-500 transition-opacity"
                  size={24}
                />
              </button>
            )}
          </li>
          {onSelect && (
            <li className="flex justify-end">
              <button
                onClick={() => onSelect(address)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Seleccionar
              </button>
            </li>
          )}
        </ul>
      ))}
    </>
  );
};
