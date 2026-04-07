import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { describe, expect, it } from 'vitest';

import {
  cardsState,
  paymentOrderState,
  selectedCardIdState,
} from '../state/paymentState';
import { usePaymentActions } from './usePaymentActions';

const mockCard = {
  id: 'card-1',
  cardNumber: '1111-2222-3333-4444',
  cardOwner: 'HYEON',
  expiry: '12/27',
};

const duplicatedCard = {
  id: 'card-2',
  cardNumber: '1111-2222-3333-4444',
  cardOwner: 'HYEON',
  expiry: '11/28',
};

const mockOrder = {
  items: [
    {
      id: '1',
      image: '/images/shoe-1.png',
      brand: 'Nike',
      price: 50000,
      quantity: 1,
    },
  ],
  subtotal: 50000,
  shippingFee: 3000,
  total: 53000,
};

function PaymentActionsTest() {
  const {
    handleAddCard,
    handleSelectCard,
    handleSetPaymentOrder,
    handleResetPaymentOrder,
  } = usePaymentActions();

  const cards = useRecoilValue(cardsState);
  const selectedCardId = useRecoilValue(selectedCardIdState);
  const paymentOrder = useRecoilValue(paymentOrderState);

  return (
    <>
      <button type="button" onClick={() => handleAddCard(mockCard)}>
        카드 추가
      </button>

      <button type="button" onClick={() => handleAddCard(duplicatedCard)}>
        중복 카드 추가
      </button>

      <button type="button" onClick={() => handleSelectCard('card-1')}>
        카드 선택
      </button>

      <button type="button" onClick={() => handleSetPaymentOrder(mockOrder)}>
        주문 저장
      </button>

      <button type="button" onClick={handleResetPaymentOrder}>
        주문 초기화
      </button>

      <div>cardsCount:{cards.length}</div>
      <div>selectedCardId:{selectedCardId ?? 'null'}</div>
      <div>paymentOrder:{paymentOrder ? paymentOrder.total : 'null'}</div>
    </>
  );
}

const renderPaymentActions = (initializeState) => {
  render(
    <RecoilRoot initializeState={initializeState}>
      <PaymentActionsTest />
    </RecoilRoot>
  );
};

describe('usePaymentActions', () => {
  it('새 카드를 추가하면 cardsState에 반영된다', async () => {
    const user = userEvent.setup();

    renderPaymentActions();

    const addButton = screen.getByRole('button', { name: '카드 추가' });

    await user.click(addButton);

    expect(screen.getByText('cardsCount:1')).toBeInTheDocument();
  });

  it('첫 카드 추가 시 selectedCardId가 자동 설정된다', async () => {
    const user = userEvent.setup();

    renderPaymentActions();

    const addButton = screen.getByRole('button', { name: '카드 추가' });

    await user.click(addButton);

    expect(screen.getByText('selectedCardId:card-1')).toBeInTheDocument();
  });

  it('중복 카드번호면 카드 목록이 유지된다', async () => {
    const user = userEvent.setup();

    renderPaymentActions();

    await user.click(screen.getByRole('button', { name: '카드 추가' }));
    await user.click(screen.getByRole('button', { name: '중복 카드 추가' }));

    expect(screen.getByText('cardsCount:1')).toBeInTheDocument();
    expect(screen.getByText('selectedCardId:card-1')).toBeInTheDocument();
  });

  it('카드 선택 시 selectedCardId가 변경된다', async () => {
    const user = userEvent.setup();

    renderPaymentActions(({ set }) => {
      set(cardsState, [mockCard]);
      set(selectedCardIdState, null);
    });

    await user.click(screen.getByRole('button', { name: '카드 선택' }));

    expect(screen.getByText('selectedCardId:card-1')).toBeInTheDocument();
  });

  it('주문 객체를 paymentOrderState에 저장한다', async () => {
    const user = userEvent.setup();

    renderPaymentActions();

    await user.click(screen.getByRole('button', { name: '주문 저장' }));

    expect(screen.getByText('paymentOrder:53000')).toBeInTheDocument();
  });

  it('주문 초기화 시 paymentOrderState를 null로 만든다', async () => {
    const user = userEvent.setup();

    renderPaymentActions(({ set }) => {
      set(paymentOrderState, mockOrder);
    });

    await user.click(screen.getByRole('button', { name: '주문 초기화' }));

    expect(screen.getByText('paymentOrder:null')).toBeInTheDocument();
  });
});
