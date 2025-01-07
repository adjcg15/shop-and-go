"use client";
import { ErrorBanner } from "@/components/ui/ErrorBanner";
import { OrdersTable } from "./OrdersTable";
import { Order } from "@/types/types/model/orders";
import { useEffect, useState } from "react";
import shopAndGoAPI from "@/utils/axios";
import { AxiosError, isAxiosError } from "axios";
import { OrdersTableSkeleton } from "./OrdersTableSkeleton";

type OrdersList = {
  loading: boolean;
  value: Order[];
  error: string | null;
};

export const OrdersWrapper = () => {
  const [ordersList, setOrdersList] = useState<OrdersList>({ loading: true, value: [], error: null });

  useEffect(() => {
    const getOrdersToAssign = async () => {
      try {
        const { data: orders } = await shopAndGoAPI.get<Order[]>(
          "/orders/orders-to-assign"
        );

        setOrdersList({ loading: false, value: orders, error: null });
      } catch (error) {
        let errorLoadingOrders =
          "Estamos teniendo problemas para cargar los pedidos, por favor intente más tarde.";
  
        if(isAxiosError(error) && error.code === AxiosError.ERR_NETWORK) {
          errorLoadingOrders =
            "No fue posible establecer una conexión para cargar " +
            "la lista de pedidos. Verifique que su conexión a Internet es estable o intente más tarde.";
        }
        setOrdersList({ loading: false, value: [], error: errorLoadingOrders });
      }
    }

    getOrdersToAssign();
  }, []);

  return (
    ordersList.error 
    ? (
      <ErrorBanner
        image={{
          src: "/illustrations/server-error.svg",
          alt: "Imagen representativa de un servidor no disponible",
        }}
        title={"¡Problemas técnicos!"}
        message={ordersList.error}
      />
    )
    : (
      ordersList.loading
      ? (
        <OrdersTableSkeleton/>
      )
      : (
        ordersList.value.length === 0
        ? (
          <ErrorBanner
            image={{
              src: "/illustrations/empty-cart.svg",
              alt: "Imagen representativa de un carrito vacío",
            }}
            title={"¡No hay pedidos!"}
            message={"Espera a que un nuevo pedido llegue a la tienda"}
          />
        )
        : <OrdersTable orders={ordersList.value}/>
      )
    )
  )
}
