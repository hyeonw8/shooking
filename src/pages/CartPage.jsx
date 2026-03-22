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

      <main className="pb-[260px]">
        {/* OrderSummary 높이만큼 */}
        {isEmpty ? (
          <EmptyCart />
        ) : (
          <>
            <section className="px-[22px] pt-[10px]">
              <PageHeaderInfo
                title="장바구니"
                description={`현재 ${cartCount}개의 상품이 담겨있습니다.`}
              />
            </section>
            <section>
              <CartList />
            </section>
          </>
        )}
      </main>

      {/* 하단 고정 */}
      {!isEmpty && (
        <div className="fixed bottom-0 left-0 w-full rounded-t-[30px] bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
          <OrderSummary />
        </div>
      )}
    </>
  );
}
