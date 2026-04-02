import { useSetRecoilState } from 'recoil';

import { cartItemsState } from '../state/cartState';
import {
  addCartItem,
  decreaseQuantity,
  increaseQuantity,
  removeCartItem,
  toggleCartItem,
} from '../state/cartUtils';

export const useCartActions = () => {
  const setItems = useSetRecoilState(cartItemsState);

  const handleAddItem = (item) => {
    setItems((prev) => addCartItem(prev, item));
  };

  const handleRemoveItem = (id) => {
    setItems((prev) => removeCartItem(prev, id));
  };

  const handleToggleItem = (item) => {
    setItems((prev) => toggleCartItem(prev, item));
  };

  const handleIncrease = (id) => {
    setItems((prev) => increaseQuantity(prev, id));
  };

  const handleDecrease = (id) => {
    setItems((prev) => decreaseQuantity(prev, id));
  };

  const handleResetCart = () => {
    setItems([]);
  };

  return {
    handleAddItem,
    handleRemoveItem,
    handleToggleItem,
    handleIncrease,
    handleDecrease,
    handleResetCart,
  };
};
