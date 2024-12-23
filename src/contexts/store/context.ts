import { StoreState } from "@/types/types/contexts/states";
import { Address } from "@/types/types/model/deliveries";
import { Store } from "@/types/types/model/stores";
import { createContext } from "react";

type StoreContext = StoreState & {
  setDeliveryAddress: (address: Address) => void;
  setNearestStore: (store: Store) => void;
  clearStore: () => void;
  //TODO: define actions for shopping cart
};

const StoreContext = createContext({} as StoreContext);

export default StoreContext;