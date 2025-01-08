"use client";
import { ErrorBanner } from "@/components/ui/ErrorBanner";
import { Order } from "@/types/types/model/orders";
import shopAndGoAPI from "@/utils/axios";
import { isClientErrorHTTPCode } from "@/utils/http";
import { AxiosError, isAxiosError } from "axios";
import { FC, useEffect, useState } from "react";
import { OrderInformation } from "./OrderInformation";
import { AssignOrderSection } from "./AssignOrderSection";
import { OrderInformationSkeleton } from "./OrderInformationSkeleton";

type OrderRecovery = {
  loading: boolean;
  value?: Order;
  error: null | string;
};

type OrderByIdWrapperProps = {
  idOrder: number;
};

export const OrderByIdWrapper: FC<OrderByIdWrapperProps> = ({ idOrder }) => {
  const [order, setOrder] = useState<OrderRecovery>({ loading: true, error: null });

  useEffect(() => {
    const getOrderToAssignById = async (idOrder: number) => {
      try {
        const { data: order } =
          await shopAndGoAPI.get<Order>(
            `/orders/orders-to-assign/${idOrder}`
          );
        setOrder({ loading: false, value: order, error: null });
      } catch(error) {
        let errorMessage = "Estamos teniendo problemas para cargar la información del pedido, por favor intente más tarde.";

        if (isAxiosError(error) && error.code === AxiosError.ERR_NETWORK) {
          errorMessage =
            "No fue posible establecer una conexión para cargar " +
            "la información del pedido. Verifique que su conexión a Internet es estable o intente más tarde.";
        } else if(isAxiosError(error) && isClientErrorHTTPCode(Number(error.response?.status))) {
          errorMessage = "No hemos encontrado ningún pedido que coincida con tu solicitud, lo sentimos.";
        }

        setOrder({ loading: false, error: errorMessage });
      }
    }

    getOrderToAssignById(idOrder);
  }, [idOrder]);

  return (
    order.error
    ? (
      <ErrorBanner
        image={{
          src: "/illustrations/server-error.svg",
          alt: "Imagen representativa de un servidor no disponible",
        }}
        title={"¡Problemas técnicos!"}
        message={order.error}
      />
    )
    : (
      <div className="md:grid md:grid-cols-2 gap-8">
        {
          order.loading
          ? <OrderInformationSkeleton/>
          : <OrderInformation order={order.value!}/>
        }
        <AssignOrderSection idOrder={order.value?.id || 0}/>
      </div>
    )
  );
}
