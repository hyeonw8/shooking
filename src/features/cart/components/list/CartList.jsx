import { useRecoilValue } from 'recoil';

import { cartItemsState } from '../../state/cartState';
import { CartItem } from './CartItem';

export const CartList = () => {
  const items = useRecoilValue(cartItemsState);

  if (items.length === 0) return null;

  return (
    <section className="flex flex-col">
      {items.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
    </section>
  );
};
