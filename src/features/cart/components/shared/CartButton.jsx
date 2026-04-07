import { useNavigate } from 'react-router-dom';

import { CartIcon } from '../../../../components/icons/CartIcon';
import { CartCountBadge } from './CartCountBadge';

export const CartButton = () => {
  const navigate = useNavigate();

  const handleMoveCart = () => {
    navigate('/cart');
  };

  return (
    <button
      type="button"
      className="relative flex h-10 w-10 cursor-pointer items-center justify-end"
      aria-label="장바구니"
      onClick={handleMoveCart}
    >
      <CartIcon className="h-6 w-6" />
      <CartCountBadge />
    </button>
  );
};
