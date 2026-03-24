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
      className="relative cursor-pointer"
      aria-label="장바구니"
      onClick={handleMoveCart}
    >
      <CartIcon className="h-6 w-6" />
      <CartCountBadge />
    </button>
  );
};
