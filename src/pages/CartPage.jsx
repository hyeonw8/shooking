import { useRecoilValue } from 'recoil';

import { Header } from '../components/Header';
import { PageHeaderInfo } from '../components/PageHeaderInfo';
import { CartList } from '../features/cart/components/list/CartList';
import { EmptyCart } from '../features/cart/components/list/EmptyCart';
import { OrderSummary } from '../features/cart/components/summary/OrderSummary';
import {
  cartCountState,
  isCartEmptyState,
} from '../features/cart/state/cartState';

export default function CartPage() {
  const isEmpty = useRecoilValue(isCartEmptyState);
  const cartCount = useRecoilValue(cartCountState);

  return (
    <>
      <Header variant="cart" />

      <main className="pb-6">
        {isEmpty ? (
          <EmptyCart />
        ) : (
          <>
            <section>
              <PageHeaderInfo
                title="장바구니"
                description={`현재 ${cartCount}개의 상품이 담겨있습니다.`}
              />
            </section>
            <section>
              <CartList />
            </section>
            <section>
              <OrderSummary />
            </section>
          </>
        )}
      </main>
    </>
  );
}
