import { fireEvent, render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as cartActionsModule from '../features/cart/hooks/useCartActions';
import * as paymentActionsModule from '../features/payments/hooks/usePaymentActions';
import { paymentOrderState } from '../features/payments/state/paymentState';
import PaymentSuccessPage from './PaymentSuccessPage';

const mockNavigate = vi.fn();
const mockHandleResetCart = vi.fn();
const mockHandleResetPaymentOrder = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../features/cart/hooks/useCartActions', () => ({
  useCartActions: vi.fn(),
}));

vi.mock('../features/payments/hooks/usePaymentActions', () => ({
  usePaymentActions: vi.fn(),
}));

const mockPaymentOrder = {
  items: [
    {
      id: '1',
      image: '/assets/images/products/shoes-a-1.jpg',
      brand: 'Nike',
      price: 50000,
      quantity: 1,
    },
    {
      id: '2',
      image: '/assets/images/products/shoes-a-2.jpg',
      brand: 'Adidas',
      price: 30000,
      quantity: 2,
    },
  ],
  subtotal: 110000,
  shippingFee: 0,
  total: 110000,
};

function renderPaymentSuccessPage(paymentOrder = mockPaymentOrder) {
  return render(
    <RecoilRoot
      initializeState={({ set }) => {
        set(paymentOrderState, paymentOrder);
      }}
    >
      <PaymentSuccessPage />
    </RecoilRoot>
  );
}

describe('PaymentSuccessPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    cartActionsModule.useCartActions.mockReturnValue({
      handleResetCart: mockHandleResetCart,
    });

    paymentActionsModule.usePaymentActions.mockReturnValue({
      handleResetPaymentOrder: mockHandleResetPaymentOrder,
    });
  });

  it('결제 완료 문구와 주문 정보를 렌더링한다', () => {
    renderPaymentSuccessPage();

    expect(screen.getByText('결제 완료!')).toBeInTheDocument();
    expect(
      screen.getByText('총 3개의 상품을 구매하셨습니다.')
    ).toBeInTheDocument();
    expect(screen.getByText('총 결제 금액')).toBeInTheDocument();
    expect(screen.getByText('110,000원')).toBeInTheDocument();
  });

  it('상품 목록 보기 버튼 클릭 시 장바구니/결제 상태를 초기화하고 홈으로 이동한다', () => {
    renderPaymentSuccessPage();

    const button = screen.getByRole('button', { name: '상품 목록 보기' });
    fireEvent.click(button);

    expect(mockHandleResetCart).toHaveBeenCalledTimes(1);
    expect(mockHandleResetPaymentOrder).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('paymentOrderState가 없으면 홈으로 리다이렉트된다', () => {
    renderPaymentSuccessPage(null);

    expect(screen.queryByText('결제 완료!')).not.toBeInTheDocument();
  });
});
