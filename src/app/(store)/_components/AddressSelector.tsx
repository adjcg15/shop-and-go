"use client";

import { useAddresses } from "../_hooks/useAddressList";
import { Addresses } from "./Addresses";
import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "@/contexts/auth/context";
import StoreContext from "@/contexts/store/context";
import { Address } from "@/types/types/model/deliveries";
import { useRouter } from "next/navigation";
import { useParam } from "@/hooks/useParam";
import { notify } from "@/utils/notifications";
import { NotificationTypes } from "@/types/enums/notifications";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { ErrorBanner } from "@/components/ui/ErrorBanner";
import { APIProvider } from "@vis.gl/react-google-maps";
import { AddressForm } from "./AddressForm";

export function AddressSelector() {
  const { clientProfile } = useContext(AuthContext);
  const { deliveryAddress, setDeliveryAddress, clearCart } =
    useContext(StoreContext);
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
        message:
          nearestStore.error || "Debe seleccionar una dirección de entrega",
        type: NotificationTypes.ERROR,
      });
    }
  }, [redirigidoDesde, nearestStore.error]);

  const handleSelect = (address: Address) => {
    if (deliveryAddress && deliveryAddress.id !== address.id) {
      setSelectedAddress(address);
      setIsModalOpen(true);
    } else {
      setDeliveryAddress(address);
      router.push("/catalogo");
    }
  };

  const handleConfirm = () => {
    if (selectedAddress) {
      setDeliveryAddress(selectedAddress);
      clearCart();
      router.push("/catalogo");
    }
    setIsModalOpen(false);
  };

  const handleSelectionCompleted = useCallback(
    (newAddress: Address) => {
      setDeliveryAddress(newAddress);
      router.push("/catalogo");
    },
    [router, setDeliveryAddress]
  );

  if (!clientProfile) {
    return (
      <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY!}>
        <AddressForm onSubmitComplete={handleSelectionCompleted} />
      </APIProvider>
    );
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
        <ErrorBanner
          image={{
            src: "/illustrations/empty-cart.svg",
            alt: "Imagen representativa de un carrito vacío",
          }}
          title={"¡No hay direcciones registradas!"}
          message={"Registra una dirección de entrega para continuar"}
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
}
