import { useCart, useCartDispatch } from '../cart/useCart';

export const ToggleToCartButton = ({ id }) => {
  const dispatch = useCartDispatch();
  const { cartSet } = useCart();
  const isInCart = cartSet.has(id);

  const handleToggleCart = () => {
    dispatch({ type: 'toggle', payload: id });
  };

  return (
    <button
      onClick={handleToggleCart}
      className={`mt-3 inline-flex w-14 items-center justify-center rounded-full py-1 text-sm font-semibold transition ${
        isInCart ? 'bg-gray-200 text-black' : 'bg-black text-white'
      }`}
    >
      {isInCart ? '담김!' : '담기'}
    </button>
  );
};
