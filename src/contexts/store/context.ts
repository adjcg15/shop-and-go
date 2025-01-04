import { StoreState } from "@/types/types/contexts/states";
import { Address } from "@/types/types/model/deliveries";
import { CartItem } from "@/types/types/model/products";
import { Store } from "@/types/types/model/stores";
import { createContext } from "react";

type StoreContext = StoreState & {
  setDeliveryAddress: (address: Address) => void;
  setNearestStore: (store: Store) => void;
  clearStore: () => void;

  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
};

const StoreContext = createContext({} as StoreContext);

export default StoreContext;