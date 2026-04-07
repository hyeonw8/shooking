import { useRecoilValue } from 'recoil';

import { cartCountState } from '../../state/cartState';

export const CartCountBadge = () => {
  const cartCount = useRecoilValue(cartCountState);

  return (
    cartCount > 0 && (
      <span
        aria-label="cart-count"
        className="absolute top-5 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-black"
      >
        {cartCount}
      </span>
    )
  );
};
