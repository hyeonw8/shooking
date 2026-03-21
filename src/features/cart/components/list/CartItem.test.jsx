import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { describe, expect, it } from 'vitest';

import { CartItem } from './CartItem';

const mockItem = {
  id: '1',
  image: '/images/shoe-1.png',
  brand: 'Nike',
  price: 129000,
  quantity: 1,
};

const renderCartItem = () => {
  return render(
    <RecoilRoot>
      <CartItem {...mockItem} />
    </RecoilRoot>
  );
};

describe('CartItem', () => {
  it('상품 이미지, 브랜드명, 가격을 렌더링한다', () => {
    renderCartItem();

    expect(
      screen.getByRole('img', { name: 'Nike 상품 이미지' })
    ).toBeInTheDocument();
    expect(screen.getByText('Nike')).toBeInTheDocument();
    expect(screen.getByText('129,000원')).toBeInTheDocument();
  });

  it('QuantityControl을 렌더링한다', () => {
    renderCartItem();

    expect(
      screen.getByRole('group', { name: '수량 조절' })
    ).toBeInTheDocument();
  });
});
