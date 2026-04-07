import { Navigate, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { Header } from '../components/Header';
import { useCartActions } from '../features/cart/hooks/useCartActions';
import { usePaymentActions } from '../features/payments/hooks/usePaymentActions';
import { paymentOrderState } from '../features/payments/state/paymentState';

export default function PaymentSuccessPage() {
  const navigate = useNavigate();

  const paymentOrder = useRecoilValue(paymentOrderState);

  const { handleResetCart } = useCartActions();
  const { handleResetPaymentOrder } = usePaymentActions();

  if (!paymentOrder) {
    return <Navigate to="/" replace />;
  }

  const purchasedCount =
    paymentOrder.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  const totalAmount = paymentOrder.total ?? 0;

  const handleGoHome = () => {
    handleResetCart();
    handleResetPaymentOrder();
    navigate('/');
  };

  return (
    <>
      <Header variant="success" />
      <main className="mx-auto flex min-h-[80vh] flex-col items-center justify-center px-5 pt-4 text-center lg:max-w-6xl">
        <h2 className="text-[30px] font-extrabold">결제 완료!</h2>
        <p className="leading-6 break-keep text-gray-600 lg:text-base">
          {`총 ${purchasedCount}개의 상품을 구매하셨습니다.`}
        </p>
        <div className="mt-6">
          <p className="font-bold">총 결제 금액</p>
          <p className="mt-1 text-2xl font-bold">
            {totalAmount.toLocaleString()}원
          </p>
        </div>
        <button
          type="button"
          onClick={handleGoHome}
          className="mt-8 flex h-[58px] w-full max-w-[385px] items-center justify-center rounded-[48px] bg-[#FFEF64] text-xl hover:bg-[#f1e472]"
        >
          상품 목록 보기
        </button>
      </main>
    </>
  );
}
