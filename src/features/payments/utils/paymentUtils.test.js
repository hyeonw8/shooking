import { describe, expect, it } from 'vitest';

import {
  addCard,
  createCartPaymentOrder,
  createSingleProductPaymentOrder,
} from './paymentUtils';

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

const newCard = {
  id: 'card-3',
  cardNumber: '7777-8888-9999-0000',
  cardOwner: 'HYEON',
  expiry: '11/27',
};

describe('addCard', () => {
  it('새로운 카드를 추가하면 목록에 반영된다', () => {
    const result = addCard(mockCards, newCard);

    expect(result.isAdded).toBe(true);
    expect(result.cards).toHaveLength(3);
    expect(result.cards[2]).toEqual(newCard);
  });

  it('중복된 카드번호면 기존 목록을 유지한다.', () => {
    const duplicatedCard = {
      id: 'card-4',
      cardNumber: '1111-2222-3333-4444',
      cardOwner: 'HYEON',
      expiry: '10/29',
    };

    const result = addCard(mockCards, duplicatedCard); // 이미 있는 카드 번호값을 넣어서 체크

    expect(result.isAdded).toBe(false);
    expect(result.cards).toEqual(mockCards);
  });
});

describe('createCartPaymentOrder', () => {
  it('장바구니 주문 객체를 생성한다', () => {
    const newOrder = {
      items: [
        {
          id: '1',
          image: '/images/shoe-1.png',
          brand: 'Nike',
          price: 50000,
          quantity: 1,
        },
        {
          id: '2',
          image: '/images/shoe-2.png',
          brand: 'Adidas',
          price: 30000,
          quantity: 2,
        },
      ],
      subtotal: 80000,
      shippingFee: 3000,
      total: 83000,
    };

    const result = createCartPaymentOrder(newOrder);

    expect(result).toEqual(newOrder);
  });
});

describe('createSingleProductPaymentOrder', () => {
  it('단일 상품 주문 객체를 생성한다', () => {
    const product = {
      id: '1',
      image: '/images/shoe-1.png',
      brand: 'Nike',
      price: 50000,
    };

    const result = createSingleProductPaymentOrder({
      product,
      quantity: 1,
    });

    expect(result).toEqual({
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
    });
  });

  it('10만 원 이상이면 배송비 0원이다', () => {
    const product = {
      id: '1',
      image: '/images/shoe-1.png',
      brand: 'Nike',
      price: 50000,
    };

    const result = createSingleProductPaymentOrder({
      product,
      quantity: 2,
    });

    expect(result.subtotal).toBe(100000);
    expect(result.shippingFee).toBe(0);
    expect(result.total).toBe(100000);
  });
});
