"use client";

import { Address } from "@/types/types/model/deliveries";
import { useCallback, useState } from "react";
import { Addresses } from "./Addresses";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { useAddresses } from "../_hooks/useAddresses";

export const AddressesListWrapper = () => {
  const { addresses, deleteAddress } = useAddresses();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<Address | null>(null);

  const handleDelete = useCallback((address: Address) => {
    setAddressToDelete(address);
    setIsModalOpen(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (addressToDelete !== null) {
      deleteAddress(addressToDelete.id);
      setIsModalOpen(false);
      setAddressToDelete(null);
    }
  }, [deleteAddress, addressToDelete]);

  const cancelDelete = useCallback(() => {
    setIsModalOpen(false);
    setAddressToDelete(null);
  }, []);

  return !addresses.error ? (
    !addresses.loading ? (
      addresses.value && addresses.value!.length > 0 ? (
        <>
          <Addresses
            addresses={addresses.value}
            showDelete
            onDelete={handleDelete}
          />
          <ConfirmationModal
            title="Eliminación de la dirección de entrega"
            message={
              addressToDelete
                ? `¿Estás seguro de que deseas eliminar la dirección de entrega: ${addressToDelete.street} ${addressToDelete.streetNumber} ${addressToDelete.apartmentNumber}?`
                : ""
            }
            primaryButtonText="Eliminar"
            secondaryButtonText="Cancelar"
            isOpen={isModalOpen}
            onClose={cancelDelete}
            onConfirm={confirmDelete}
          />
        </>
      ) : (
        <div className="flex justify-center items-start h-96">
          <p className="text-center mt-36 text-2xl gap-8">
            No hay direcciones de entrega registradas
          </p>
        </div>
      )
    ) : (
      <div className="flex justify-center items-start h-96">
        <p className="text-center mt-36 text-2xl gap-8">
          Cargando direcciones de entrega...
        </p>
      </div>
    )
  ) : (
    <div className="flex justify-center items-start h-96">
      <p className="text-center mt-36 text-2xl gap-8">
        Ocurrió un error al cargar las direcciones de entrega
      </p>
    </div>
  );
};
