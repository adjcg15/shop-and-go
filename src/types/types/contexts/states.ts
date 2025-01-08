import UserRoles from "@/types/enums/user_roles";
import { Client, Employee } from "../model/users";
import { Address } from "../model/deliveries";
import { Store } from "../model/stores";
import { CartItem } from "../model/products";

type AuthState = {
  role: UserRoles,
  clientProfile: Client| null,
  employeeProfile: Employee | null
};

type StoreState = {
  deliveryAddress: Address | null;
  nearestStore: {
    isBeingCalculated: boolean,
    value: Store | null,
    error: string | null
  };
  shoppingCart: CartItem[];
};

export type {
  AuthState,
  StoreState
};