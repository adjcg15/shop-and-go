import { useContext, useMemo, useCallback } from "react";
import StoreContext from "@/contexts/store/context";
import { CartItem } from "@/types/types/model/products";

export const useCart = () => {
  const Store = useContext(StoreContext);

  const { shoppingCart, addToCart, removeFromCart } = Store;

  const total = useMemo(
    () =>
      shoppingCart.reduce(
        (sum, item) => sum + item.product.salePrice * item.totalProducts,
        0
      ),
    [shoppingCart]
  );

  const updateQuantity = useCallback(
    (cartItem: CartItem, quantity: number) => {
      const updatedItem = { ...cartItem, totalProducts: quantity };
      addToCart(updatedItem);
    },
    [addToCart]
  );

  const handleRemoveFromCart = useCallback(
    (id: number) => {
      removeFromCart(id);
    },
    [removeFromCart]
  );

  return {
    items: shoppingCart,
    total,
    updateQuantity,
    addToCart,
    handleRemoveFromCart,
  };
};
