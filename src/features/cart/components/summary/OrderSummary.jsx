import { useRecoilValue } from 'recoil';

import {
  cartShippingFeeState,
  cartSubtotalState,
  cartTotalState,
} from '../../state/cartState';
import { CheckoutButton } from '../list/CheckoutButton';
import { AmountRow } from './AmountRow';
import { ShippingFee } from './ShippingFee';

export const OrderSummary = () => {
  const subtotal = useRecoilValue(cartSubtotalState);
  const shipping = useRecoilValue(cartShippingFeeState);
  const total = useRecoilValue(cartTotalState);

  return (
    <section className="flex flex-col gap-2 p-[22px]">
      <AmountRow label="상품 금액" value={subtotal} />
      <ShippingFee fee={shipping} />
      <hr className="border-gray-300" />
      <AmountRow label="총 금액" value={total} />
      <div className="mt-6">
        <CheckoutButton disabled={subtotal === 0} />
      </div>
    </section>
  );
};
