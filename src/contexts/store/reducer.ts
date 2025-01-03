import { StoreActions, StoreActionTypes } from "@/types/types/contexts/actions";
import { StoreState } from "@/types/types/contexts/states";

export function storeReducer(state: StoreState, action: StoreActions): StoreState {
  switch(action.type) {
    case StoreActionTypes.START_NEAREST_STORE_CALCULATION:
      return {
        ...state,
        nearestStore: {
          isBeingCalculated: true,
          value: null,
          error: null
        }
      };
    case StoreActionTypes.SET_NEAREST_STORE:
      return {
        ...state,
        nearestStore: {
          isBeingCalculated: false,
          value: action.payload,
          error: null
        }
      };
    case StoreActionTypes.FIRE_ERROR_CALCULATING_NEAREST_STORE:
      return {
        ...state,
        nearestStore: {
          isBeingCalculated: false,
          value: null,
          error: action.payload
        }
      };
    case StoreActionTypes.SET_DELIVERY_ADDRESS:
      return {
        ...state,
        deliveryAddress: action.payload,
      };
    case StoreActionTypes.CLEAR_STORE_STATE:
      return {
        deliveryAddress: null,
        nearestStore: {
          isBeingCalculated: false,
          value: null,
          error: null
        },
        shoppingCart: []
      };
    default:
      return state;
  }
}