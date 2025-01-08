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
    case StoreActionTypes.ADD_PRODUCT_TO_CART:
      const existingCartItem = state.shoppingCart.find(item => item.product.id === action.payload.product.id);
      if (existingCartItem) {
        return {
          ...state,
          shoppingCart: state.shoppingCart.map(item =>
            item.product.id === action.payload.product.id
              ? { ...item, totalProducts: action.payload.totalProducts }
              : item
          )
        };
      } else {
        return {
          ...state,
          shoppingCart: [...state.shoppingCart, action.payload]
        };
      }
    case StoreActionTypes.REMOVE_PRODUCT_FROM_CART:
      return {
        ...state,
        shoppingCart: state.shoppingCart.filter(item => item.product.id !== action.payload)
      };
    case StoreActionTypes.CLEAR_CART:
      return {
        ...state,
        shoppingCart: []
      };
    default:
      return state;
  }
}