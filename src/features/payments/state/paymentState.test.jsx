import { render, screen } from '@testing-library/react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { describe, expect, it } from 'vitest';

import {
  cardsState,
  selectedCardIdState,
  selectedCardState,
} from './paymentState';

const mockCards = [
  {
    id: 'card-1',
    cardNumber: '1111-2222-3333-4444',
    cardOwner: 'HYEON',
    expiry: '12/27',
  },
  {
    id: 'card-2',
    cardNumber: '5555-6666-7777-8888',
    cardOwner: 'HYEON',
    expiry: '11/28',
  },
];

function TestPaymentState() {
  const selectedCard = useRecoilValue(selectedCardState);

  return (
    <div>{selectedCard ? selectedCard.cardNumber : '선택된 카드 없음'}</div>
  );
}

const renderPaymentState = ({ cards = [], selectedCardId = null } = {}) => {
  render(
    <RecoilRoot
      initializeState={({ set }) => {
        set(cardsState, cards);
        set(selectedCardIdState, selectedCardId);
      }}
    >
      <TestPaymentState />
    </RecoilRoot>
  );
};

describe('paymentState', () => {
  it('선택된 카드 id에 해당하는 카드 정보를 반환한다', () => {
    renderPaymentState({
      cards: mockCards,
      selectedCardId: 'card-2',
    });

    expect(screen.getByText('5555-6666-7777-8888')).toBeInTheDocument();
  });

  it('선택된 카드가 없으면 null 기준으로 처리한다', () => {
    renderPaymentState({
      cards: mockCards,
      selectedCardId: null,
    });

    expect(screen.getByText('선택된 카드 없음')).toBeInTheDocument();
  });

  it('카드 목록에 없는 id면 null을 반환한다', () => {
    renderPaymentState({
      cards: mockCards,
      selectedCardId: 'card-999',
    });

    expect(screen.getByText('선택된 카드 없음')).toBeInTheDocument();
  });
});
