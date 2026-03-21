import { describe, expect, it } from 'vitest';

import {
  addCartItem,
  calculateShippingFee,
  calculateSubtotal,
  calculateTotal,
  decreaseQuantity,
  increaseQuantity,
  removeCartItem,
  toggleCartItem,
} from './cartUtils';

const mockItems = [
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
];

describe('addCartItem', () => {
  it('새 상품이면 장바구니에 추가한다', () => {
    const newItem = {
      id: '3',
      image: '/images/shoe-3.png',
      brand: 'New Balance',
      price: 70000,
      quantity: 1,
    };

    const result = addCartItem(mockItems, newItem);

    expect(result).toHaveLength(3);
    expect(result[2]).toEqual(newItem);
  });

  it('기존 상품이면 quantity를 증가시킨다', () => {
    const existingItem = {
      id: '1',
      image: '/images/shoe-1.png',
      brand: 'Nike',
      price: 50000,
      quantity: 1,
    };

    const result = addCartItem(mockItems, existingItem);
    const updatedItem = result.find((item) => item.id === '1');

    expect(updatedItem.quantity).toBe(2);
  });

  it('quantity가 없으면 기본값 1로 추가한다', () => {
    const newItem = {
      id: '3',
      image: '/images/shoe-3.png',
      brand: 'New Balance',
      price: 70000,
    };

    const result = addCartItem(mockItems, newItem);
    const addedItem = result.find((item) => item.id === '3');

    expect(addedItem.quantity).toBe(1);
  });
});

describe('removeCartItem', () => {
  it('해당 id 상품을 제거한다', () => {
    const result = removeCartItem(mockItems, '1');
    const removedItem = result.find((item) => item.id === '1');

    expect(result).toHaveLength(1);
    expect(removedItem).toBeUndefined();
    expect(result[0].id).toBe('2');
  });

  it('원본 배열을 직접 변경하지 않는다', () => {
    const result = removeCartItem(mockItems, '1');

    expect(result).not.toBe(mockItems);
    expect(mockItems).toHaveLength(2);
  });

  it('일치하는 id가 없으면 기존 배열을 유지한다', () => {
    const result = removeCartItem(mockItems, '999');

    expect(result).toEqual(mockItems);
  });
});

describe('toggleCartItem', () => {
  it('장바구니에 없는 상품이면 추가한다', () => {
    const newItem = {
      id: '3',
      image: '/images/shoe-3.png',
      brand: 'New Balance',
      price: 70000,
      quantity: 1,
    };

    const result = toggleCartItem(mockItems, newItem);
    const addedItem = result.find((item) => item.id === '3');

    expect(result).toHaveLength(3);
    expect(addedItem).toBeDefined();
  });

  it('장바구니에 있는 상품이면 제거한다', () => {
    const result = toggleCartItem(mockItems, mockItems[0]);
    const removedItem = result.find((item) => item.id === '1');

    expect(result).toHaveLength(1);
    expect(removedItem).toBeUndefined();
    expect(mockItems).toHaveLength(2);
  });

  it('원본 배열을 직접 변경하지 않는다', () => {
    const result = toggleCartItem(mockItems, mockItems[0]);

    expect(result).not.toBe(mockItems);
    expect(mockItems).toHaveLength(2);
  });
});

describe('increaseQuantity', () => {
  it('해당 상품의 quantity를 1 증가시킨다', () => {
    const result = increaseQuantity(mockItems, '1');
    const updatedItem = result.find((item) => item.id === '1');

    expect(updatedItem.quantity).toBe(2);
  });

  it('quantity가 99이면 더 이상 증가하지 않는다', () => {
    const items = [
      {
        id: '1',
        image: '/images/shoe-1.png',
        brand: 'Nike',
        price: 50000,
        quantity: 99,
      },
    ];

    const result = increaseQuantity(items, '1');
    const updatedItem = result.find((item) => item.id === '1');

    expect(updatedItem.quantity).toBe(99);
  });

  it('원본 배열을 직접 변경하지 않는다', () => {
    const result = increaseQuantity(mockItems, '1');
    const originalItem = mockItems.find((item) => item.id === '1');

    expect(result).not.toBe(mockItems);
    expect(originalItem.quantity).toBe(1);
  });

  it('일치하는 id가 없으면 기존 배열 값을 유지한다', () => {
    const result = increaseQuantity(mockItems, '999');

    expect(result).toEqual(mockItems);
  });
});

describe('decreaseQuantity', () => {
  it('quantity가 2 이상이면 1 감소시킨다', () => {
    const result = decreaseQuantity(mockItems, '2');
    const updatedItem = result.find((item) => item.id === '2');

    expect(updatedItem.quantity).toBe(1);
  });

  it('quantity가 1이면 더 이상 감소하지 않는다', () => {
    const result = decreaseQuantity(mockItems, '1');
    const updatedItem = result.find((item) => item.id === '1');

    expect(updatedItem.quantity).toBe(1);
  });

  it('원본 배열을 직접 변경하지 않는다', () => {
    const result = decreaseQuantity(mockItems, '2');
    const originalItem = mockItems.find((item) => item.id === '2');

    expect(result).not.toBe(mockItems);
    expect(originalItem.quantity).toBe(2);
  });

  it('일치하는 id가 없으면 기존 배열 값을 유지한다', () => {
    const result = decreaseQuantity(mockItems, '999');

    expect(result).toEqual(mockItems);
  });
});

describe('calculateSubtotal', () => {
  it('price와 quantity를 곱한 합계를 반환한다', () => {
    const result = calculateSubtotal(mockItems);

    expect(result).toBe(110000);
  });

  it('빈 배열이면 0을 반환한다', () => {
    expect(calculateSubtotal([])).toBe(0);
  });
});

describe('calculateShippingFee', () => {
  it('subtotal이 0이면 배송비는 0원이다', () => {
    expect(calculateShippingFee(0)).toBe(0);
  });

  it('10만 원 미만이면 배송비 3000원을 반환한다', () => {
    expect(calculateShippingFee(99999)).toBe(3000);
  });

  it('10만 원 이상이면 배송비는 0원이다', () => {
    expect(calculateShippingFee(100000)).toBe(0);
  });
});

describe('calculateTotal', () => {
  it('subtotal과 shippingFee를 더한 값을 반환한다', () => {
    expect(calculateTotal(80000, 3000)).toBe(83000);
  });

  it('배송비가 0원이면 subtotal과 같은 값을 반환한다', () => {
    expect(calculateTotal(100000, 0)).toBe(100000);
  });
});
