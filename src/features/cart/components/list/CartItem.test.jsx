import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { describe, expect, it, vi } from 'vitest';

import * as cartActionsModule from '../../hooks/useCartActions';
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
    <MemoryRouter>
      <RecoilRoot>
        <CartItem {...mockItem} />
      </RecoilRoot>
    </MemoryRouter>
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

  it('삭제 버튼 클릭 시 remove 액션이 호출된다', () => {
    const handleRemoveItem = vi.fn();

    vi.spyOn(cartActionsModule, 'useCartActions').mockReturnValue({
      handleIncrease: vi.fn(),
      handleDecrease: vi.fn(),
      handleRemoveItem,
    });

    renderCartItem();

    const deleteButton = screen.getByRole('button', { name: '상품 삭제' });
    fireEvent.click(deleteButton);

    expect(handleRemoveItem).toHaveBeenCalledWith('1');
  });
});
