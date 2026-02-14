import cartSvg from '/assets/icons/svg/cart.svg';

export const CartIcon = ({ className = '' }) => (
  <img src={cartSvg} alt="장바구니" className={className} />
);
