import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { usePaymentActions } from '../../../payments/hooks/usePaymentActions';
import { createCartPaymentOrder } from '../../../payments/utils/paymentUtils';
import {
  cartItemsState,
  cartShippingFeeState,
  cartSubtotalState,
  cartTotalState,
} from '../../state/cartState';
import { CheckoutButton } from '../list/CheckoutButton';
import { AmountRow } from './AmountRow';
import { ShippingFee } from './ShippingFee';

export const OrderSummary = () => {
  const navigate = useNavigate();

  const subtotal = useRecoilValue(cartSubtotalState);
  const shipping = useRecoilValue(cartShippingFeeState);
  const total = useRecoilValue(cartTotalState);

  const cartItems = useRecoilValue(cartItemsState);

  const { handleSetPaymentOrder } = usePaymentActions();

  const handleProceedToPayment = () => {
    if (subtotal === 0) return;

    const newPaymentOrder = createCartPaymentOrder({
      items: cartItems,
      subtotal,
      shippingFee: shipping,
      total,
    });

    handleSetPaymentOrder(newPaymentOrder);
    navigate('/payments');
  };

  return (
    <section className="flex flex-col gap-2 p-[22px]">
      <AmountRow label="상품 금액" value={subtotal} />
      <ShippingFee fee={shipping} subtotal={subtotal} />
      <hr className="border-gray-300" />
      <AmountRow label="총 금액" value={total} />
      <div className="mt-6 flex justify-center">
        <CheckoutButton
          disabled={subtotal === 0}
          onClick={handleProceedToPayment}
        />
      </div>
    </section>
  );
};
