"use client";

import { useAddresses } from "../_hooks/useAddressList";
import { Addresses } from "./Addresses";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/contexts/auth/context";
import StoreContext from "@/contexts/store/context";
import { Address } from "@/types/types/model/deliveries";
import { useRouter } from "next/navigation";
import { useParam } from "@/hooks/useParam";
import { notify } from "@/utils/notifications";
import { NotificationTypes } from "@/types/enums/notifications";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

export function AddressSelector() {
  const { clientProfile } = useContext(AuthContext);
  const { deliveryAddress, setDeliveryAddress } = useContext(StoreContext);
  const { addresses } = useAddresses();
  const router = useRouter();
  const { nearestStore } = useContext(StoreContext);
  const { paramValue: redirigidoDesde } = useParam("redirigidoDesde", "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  useEffect(() => {
    if (redirigidoDesde === "/catalogo") {
      notify({
        title: "Error",
        message: nearestStore.error || "Debe seleccionar una dirección de entrega",
        type: NotificationTypes.ERROR,
      });
    }
  }, [redirigidoDesde, nearestStore.error]);

  const handleSelect = (address: Address) => {
    if (deliveryAddress && deliveryAddress.id !== address.id) {
      setSelectedAddress(address);
      setIsModalOpen(true);
    } else if (deliveryAddress === address) {
      router.push("/catalogo");
    } else {
      setDeliveryAddress(address);
      router.push("/catalogo");
    }
  };

  const handleConfirm = () => {
    console.log(selectedAddress);
    if (selectedAddress) {
      setDeliveryAddress(selectedAddress);
      router.push("/catalogo");
    }
    setIsModalOpen(false);
  };

  if (!clientProfile) {
    //TODO: register new delivery address for guest user and client user when registering a new one from this point
    return <h2>Elección de dirección de entrega: Próximamente</h2>;
  }

  return !addresses.error ? (
    !addresses.loading ? (
      addresses.value && addresses.value!.length > 0 ? (
        <>
          <Addresses
            addresses={addresses.value}
            showDelete={false}
            onSelect={handleSelect}
            selectedAddress={deliveryAddress}
          />
          <ConfirmationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirm}
            title="Confirmar cambio de dirección"
            message="¿Está seguro que desea cambiar la dirección de entrega? Se perderá el contenido del carrito de compras"
            primaryButtonText="Confirmar"
            secondaryButtonText="Cancelar"
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
}
