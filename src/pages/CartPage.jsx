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

      <main
        className={`mx-auto px-5 ${!isEmpty ? 'pb-[260px] lg:pb-0' : ''} pt-4 lg:max-w-6xl lg:pb-8`}
      >
        {isEmpty ? (
          <EmptyCart />
        ) : (
          <div className="lg:grid lg:gap-8 lg:grid-cols-[minmax(0,1fr)_450px]">
            {/* 왼쪽 */}
            <section className="min-w-0">
              <PageHeaderInfo
                title="장바구니"
                description={`현재 ${cartCount}개의 상품이 담겨있습니다.`}
              />

              <div>
                <CartList />
              </div>
            </section>

            {/* 오른쪽: md 이상에서만 노출 */}
            <aside className="hidden self-start lg:block">
              <div className="sticky top-20">
                <div className="rounded-t-[30px] rounded-b-[30px] bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
                  <OrderSummary />
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>

      {/* 모바일 / md 미만: 하단 플로팅 고정 */}
      {!isEmpty && (
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] lg:hidden">
          <OrderSummary />
        </div>
      )}
    </>
  );
}
