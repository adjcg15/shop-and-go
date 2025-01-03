import { Address } from "../model/deliveries";
import { CartItem } from "../model/products";
import { Store } from "../model/stores";
import { Employee, Client } from "../model/users";

export enum AuthActionTypes {
  START_EMPLOYEE_SESSION = "[Auth] Start employee session",
  START_CLIENT_SESSION = "[Auth] Start client session",
  END_SESSION = "[Auth] End session"
};

type AuthActions = 
  { type: AuthActionTypes.START_EMPLOYEE_SESSION, payload: Employee }
  | { type: AuthActionTypes.START_CLIENT_SESSION, payload: Client }
  | { type: AuthActionTypes.END_SESSION };

export enum StoreActionTypes {
  SET_DELIVERY_ADDRESS = "[Store] Changing delivery address",
  START_NEAREST_STORE_CALCULATION = "[Store] Starting client nearest store calculation",
  SET_NEAREST_STORE = "[Store] Changing client nearest store",
  FIRE_ERROR_CALCULATING_NEAREST_STORE = "[Store] Firing error while calculating client nearest store",
  CLEAR_STORE_STATE = "[Store] Clearing store state",
  ADD_PRODUCT_TO_CART = "[Store] Adding product to cart",
  REMOVE_PRODUCT_FROM_CART = "[Store] Removing product from cart",
  CLEAR_CART = "[Store] Clearing cart",
};

type StoreActions = 
  { type: StoreActionTypes.SET_DELIVERY_ADDRESS, payload: Address }
  | { type: StoreActionTypes.SET_NEAREST_STORE, payload: Store }
  | { type: StoreActionTypes.START_NEAREST_STORE_CALCULATION }
  | { type: StoreActionTypes.FIRE_ERROR_CALCULATING_NEAREST_STORE, payload: string }
  | { type: StoreActionTypes.CLEAR_STORE_STATE }
  | { type: StoreActionTypes.ADD_PRODUCT_TO_CART, payload: CartItem }
  | { type: StoreActionTypes.REMOVE_PRODUCT_FROM_CART, payload: number }
  | { type: StoreActionTypes.CLEAR_CART };

export type {
  AuthActions,
  StoreActions
};