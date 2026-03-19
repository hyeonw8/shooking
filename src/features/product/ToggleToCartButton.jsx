import { useRecoilValue } from 'recoil';

import { useCartActions } from '../cart/hooks/useCartActions';
import { cartItemsState } from '../cart/state/cartState';

export const ToggleToCartButton = ({ product }) => {
  const cartItems = useRecoilValue(cartItemsState);
  const { handleToggleItem } = useCartActions();

  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleClick = () => {
    handleToggleItem(product);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`mt-3 inline-flex w-14 cursor-pointer items-center justify-center rounded-full py-1 text-sm font-semibold transition ${
        isInCart ? 'bg-gray-200 text-black' : 'bg-black text-white'
      }`}
    >
      {isInCart ? '담김!' : '담기'}
    </button>
  );
};
