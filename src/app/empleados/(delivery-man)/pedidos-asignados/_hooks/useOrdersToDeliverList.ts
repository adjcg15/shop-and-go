import { Order } from "@/types/types/model/orders";
import shopAndGoAPI from "@/utils/axios";
import { AxiosError, isAxiosError } from "axios";
import { useCallback, useState } from "react";

type OrdersToDeliverListState = {
  loading: boolean; 
  value: Order[]; 
  error: null | string;
};

const INITIAL_ORDERS_LIST_STATE = { loading: true, value: [], error: null };

export function useOrdersToDeliverList() {
  const [ordersToDeliver, setOrdersToDeliver] = useState<OrdersToDeliverListState>(INITIAL_ORDERS_LIST_STATE);

  const onOrderCanceled = useCallback((idOrder: number) => {
    setOrdersToDeliver(previousOrders => ({
      ...previousOrders,
      value: previousOrders.value.filter(order => order.id !== idOrder)
    }))
  }, []);

  const recoverOrdersToDeliver = useCallback(async () => {
    try {
      const { data: orders } = await shopAndGoAPI.get<Order[]>("/orders/orders-to-deliver");
      setOrdersToDeliver({ loading: false, value: orders, error: null });
    } catch (error) {
      let errorLoadingStores =
        "Estamos teniendo problemas para cargar los pedidos, por favor intente más tarde.";

      if (isAxiosError(error) && error.code === AxiosError.ERR_NETWORK) {
        errorLoadingStores =
          "No fue posible establecer una conexión para cargar " +
          "la lista de pedidos. Verifique que su conexión a Internet es estable o intente más tarde.";
      }

      setOrdersToDeliver({ loading: false, value: [], error: errorLoadingStores });
    }
  }, []);

  return {
    ordersToDeliver,
    recoverOrdersToDeliver,
    onOrderCanceled
  };
}