import { fireEvent, render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as paymentActionsModule from '../../../payments/hooks/usePaymentActions';
import {
  cartItemsState,
} from '../../state/cartState';
import { OrderSummary } from './OrderSummary';

const mockNavigate = vi.fn();
const mockHandleSetPaymentOrder = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockCartItems = [
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
];

const renderOrderSummary = ({
  cartItems = mockCartItems,
} = {}) => {
  return render(
    <RecoilRoot
      initializeState={({ set }) => {
        set(cartItemsState, cartItems);
      }}
    >
      <OrderSummary />
    </RecoilRoot>
  );
};

describe('OrderSummary', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(paymentActionsModule, 'usePaymentActions').mockReturnValue({
      handleAddCard: vi.fn(),
      handleSelectCard: vi.fn(), // 검증 안 할 함수
      handleSetPaymentOrder: mockHandleSetPaymentOrder, // 호출 여부, 인자 검증을 위해 변수로
      handleResetPaymentOrder: vi.fn(),
    });
  });

  it('상품 금액, 배송비, 총 금액을 렌더링한다', () => {
    renderOrderSummary();

    expect(screen.getByText('상품 금액')).toBeInTheDocument();
    expect(screen.getByText('총 금액')).toBeInTheDocument();
    expect(screen.getAllByText('110,000원')).toHaveLength(2);
  });

  it('결제하기 버튼 클릭 시 주문 정보를 저장하고 /payments로 이동한다', () => {
    renderOrderSummary();

    const button = screen.getByRole('button', { name: '결제하기' });
    fireEvent.click(button);

    expect(mockHandleSetPaymentOrder).toHaveBeenCalledWith({
      items: mockCartItems,
      subtotal: 110000,
      shippingFee: 0,
      total: 110000,
    });
    expect(mockNavigate).toHaveBeenCalledWith('/payments');
  });

  it('상품 금액이 0원이면 결제 버튼이 비활성화된다', () => {
    renderOrderSummary({
      cartItems: [],
    });

    const button = screen.getByRole('button', { name: '결제하기' });
    expect(button).toBeDisabled();
  });

  it('상품 금액이 0원이면 클릭 시 아무 동작도 하지 않는다', () => {
    renderOrderSummary({
      cartItems: [],
    });

    const button = screen.getByRole('button', { name: '결제하기' });
    fireEvent.click(button);

    expect(mockHandleSetPaymentOrder).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});