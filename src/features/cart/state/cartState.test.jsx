import { render, screen } from '@testing-library/react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { describe, expect, it } from 'vitest';

import {
  cartCountState,
  cartItemsState,
  cartShippingFeeState,
  cartSubtotalState,
  cartTotalState,
  isCartEmptyState,
} from './cartState';

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

const lowPriceItems = [
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
    quantity: 1,
  },
];

function TestCartState() {
  const count = useRecoilValue(cartCountState);
  const isEmpty = useRecoilValue(isCartEmptyState);
  const subtotal = useRecoilValue(cartSubtotalState);
  const shippingFee = useRecoilValue(cartShippingFeeState);
  const total = useRecoilValue(cartTotalState);

  return (
    <>
      <div>count:{count}</div>
      <div>empty:{String(isEmpty)}</div>
      <div>subtotal:{subtotal}</div>
      <div>shipping:{shippingFee}</div>
      <div>total:{total}</div>
    </>
  );
}

const renderCartState = (items) => {
  render(
    <RecoilRoot
      initializeState={({ set }) => {
        set(cartItemsState, items);
      }}
    >
      <TestCartState />
    </RecoilRoot>
  );
};

describe('cartState', () => {
  it('기본 상태에서는 장바구니가 비어 있다', () => {
    render(
      <RecoilRoot>
        <TestCartState />
      </RecoilRoot>
    );

    expect(screen.getByText('count:0')).toBeInTheDocument();
    expect(screen.getByText('empty:true')).toBeInTheDocument();
    expect(screen.getByText('subtotal:0')).toBeInTheDocument();
    expect(screen.getByText('shipping:0')).toBeInTheDocument();
    expect(screen.getByText('total:0')).toBeInTheDocument();
  });

  it('장바구니 개수를 계산한다', () => {
    renderCartState(mockItems);

    expect(screen.getByText('count:2')).toBeInTheDocument();
  });

  it('장바구니가 비어 있지 않으면 false를 반환한다', () => {
    renderCartState(mockItems);

    expect(screen.getByText('empty:false')).toBeInTheDocument();
  });

  it('상품 금액을 계산한다', () => {
    renderCartState(mockItems);

    expect(screen.getByText('subtotal:110000')).toBeInTheDocument();
  });

  it('무료배송 기준 이상이면 배송비는 0원이다', () => {
    renderCartState(mockItems);

    expect(screen.getByText('shipping:0')).toBeInTheDocument();
  });

  it('무료배송 기준 미만이면 배송비는 3000원이다', () => {
    renderCartState(lowPriceItems);

    expect(screen.getByText('subtotal:80000')).toBeInTheDocument();
    expect(screen.getByText('shipping:3000')).toBeInTheDocument();
    expect(screen.getByText('total:83000')).toBeInTheDocument();
  });

  it('총 금액을 계산한다', () => {
    renderCartState(mockItems);

    expect(screen.getByText('total:110000')).toBeInTheDocument();
  });
});
