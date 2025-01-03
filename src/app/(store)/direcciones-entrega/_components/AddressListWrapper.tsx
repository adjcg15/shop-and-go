"use client";

import { Address } from "@/types/types/model/deliveries";
import { useCallback, useState } from "react";
import { Addresses } from "../../_components/Addresses";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { useAddresses } from "../../_hooks/useAddressList";
import { ErrorBanner } from "@/components/ui/ErrorBanner";

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
        <ErrorBanner
          image={{
            src: "/illustrations/empty-cart.svg",
            alt: "Imagen representativa de un carrito vacío",
          }}
          title={"¡No hay direcciones registradas!"}
          message={"No existen direcciones de entrega registradas deberá registrar una nueva dirección"}
        />
      )
    ) : (
      <div className="flex justify-center items-start h-96">
        <p className="text-center mt-36 text-2xl gap-8">
          Cargando direcciones de entrega...
        </p>
      </div>
    )
  ) : (
    <ErrorBanner
      image={{
        src: "/illustrations/server-error.svg",
        alt: "Imagen representativa de un servidor no disponible",
      }}
      title={"¡Problemas técnicos!"}
      message={"Ocurrió un error al cargar las direcciones de entrega"}
    />
  );
};
