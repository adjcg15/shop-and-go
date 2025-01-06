import { Order } from "@/types/types/model/orders";
import { AxiosError, isAxiosError } from "axios";
import { useCallback, useState } from "react";

type OrdersToDeliverListState = {
  loading: boolean; 
  value: Order[]; 
  error: null | string;
};

// TODO: remove plain information
const ordersExample: Order[] = [{
  id: 1,
  dateOfPurchase: "2025-01-06T14:54:00.000Z",
  deliveryDate: null,
  idStatus: 2,
  idDeliveryAddress: 1,
  idClient: 1,
  idPaymentMethod: 1,
  idStore: 1,
  idDeliveryMan: 1,
  deliveryAddress: {
    id: 1,
    street: "Mirador",
    streetNumber: "29",
    apartmentNumber: null,
    neighborhood: "Niños Héroes",
    municipality: "Xalapa",
    city: "Xalapa",
    postalCode: "91016",
    state: "Veracruz",
    latitude: 19.541299,
    longitude: -96.925154,
    isActive: true
  },
  client: {
    id: 1,
    birthdate: "2025-01-06T14:54:00.000Z",
    fullName: "Ángel de Jesús De la cruz García",
    phoneNumber: "2281645442"
  }
}];

const INITIAL_ORDERS_LIST_STATE = { loading: true, value: ordersExample, error: null };

export function useOrdersToDeliverList() {
  const [ordersToDeliver, setOrdersToDeliver] = useState<OrdersToDeliverListState>(INITIAL_ORDERS_LIST_STATE);

  const recoverOrdersToDeliver = useCallback(async () => {
    try {
      //TODO: make connection to endpoint
      // const { data: orders } = await shopAndGoAPI.get<Order[]>();
      // setOrdersToDeliver({ loading: false, value: orders, error: null });
      setOrdersToDeliver({ loading: false, value: ordersExample, error: null });
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
    recoverOrdersToDeliver
  };
}