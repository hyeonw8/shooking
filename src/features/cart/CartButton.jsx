import { CartIcon } from '../../components/icons/CartIcon';
import { CartCountBadge } from './CartCountBadge';

export const CartButton = () => {
  return (
    <button type="button" className="relative" aria-label="장바구니">
      <CartIcon className="h-6 w-6" />
      <CartCountBadge />
    </button>
  );
};
