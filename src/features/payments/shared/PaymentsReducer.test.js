import { describe, expect, it } from 'vitest';

import {
  initialState,
  PAYMENTS_ACTIONS,
  paymentsReducer,
} from './PaymentsReducer';

describe('paymentsReducer', () => {
  it('초기 상태를 반환한다', () => {
    const state = paymentsReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  it('ADD_CARD: 카드를 추가하고 불변성을 유지한다', () => {
    const prev = {
      cards: [],
      selectedCardId: null,
    };
    const newCard = {
      id: '1',
      cardNumber: '1234',
      cardOwner: 'NAME',
      expiry: '1229',
    };

    const next = paymentsReducer(prev, {
      type: PAYMENTS_ACTIONS.ADD_CARD,
      payload: newCard,
    });

    expect(next.cards).toHaveLength(1);
    expect(next.cards[0]).toEqual(newCard);
    expect(next.selectedCardId).toBe('1'); // 카드 자동 선택

    expect(next).not.toBe(prev); // 불변성(참조가 바뀌었는지)
    expect(next.cards).not.toBe(prev.cards);
  });

  it('ADD_CARD: 중복 id면 state를 그대로 반환한다', () => {
    const prev = {
      cards: [{ id: '1', cardNumber: '1111', cardOwner: 'A', expiry: '0129' }],
      selectedCardId: '1',
    };

    const next = paymentsReducer(prev, {
      type: PAYMENTS_ACTIONS.ADD_CARD,
      payload: { id: '1', cardNumber: '9999', cardOwner: 'X', expiry: '0129' },
    });

    expect(next).toBe(prev);
  });

  it('SELECT_CARD: selectedCardId를 변경한다', () => {
    const prev = {
      cards: [
        { id: '1', cardNumber: '1111', cardOwner: 'A', expiry: '0129' },
        { id: '2', cardNumber: '2222', cardOwner: 'B', expiry: '0229' },
      ],
      selectedCardId: '1',
    };

    const next = paymentsReducer(prev, {
      type: PAYMENTS_ACTIONS.SELECT_CARD,
      payload: '2',
    });

    expect(next.selectedCardId).toBe('2');
    expect(next.cards).toEqual(prev.cards); // cards는 그대로
    expect(next).not.toBe(prev); // state는 새 객체
  });

  it('알 수 없는 action이면 state를 그대로 반환한다', () => {
    const prev = {
      ...initialState,
      cards: [{ id: '1', cardNumber: '1111', cardOwner: 'A', expiry: '0129' }],
    };

    const next = paymentsReducer(prev, { type: 'UNKNOWN' });

    expect(next).toBe(prev); // “그대로”를 의도했다면 참조 동일도 기대 가능
  });
});
