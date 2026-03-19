import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RecoilRoot } from 'recoil';
import { describe, expect,it } from 'vitest';

import { cartItemsState } from '../cart/state/cartState';
import { ToggleToCartButton } from './ToggleToCartButton';

const mockProduct = {
  id: '1',
  image: '/images/shoe-1.png',
  brand: 'Nike',
  price: 50000,
  quantity: 1,
};

const renderToggleButton = (initialItems = []) => {
  return render(
    <RecoilRoot
      initializeState={({ set }) => {
        set(cartItemsState, initialItems);
      }}
    >
      <ToggleToCartButton product={mockProduct} />
    </RecoilRoot>
  );
};

describe('ToggleToCartButton', () => {
  it("초기에는 '담기' 버튼이 보인다", () => {
    renderToggleButton();

    expect(screen.getByRole('button', { name: '담기' })).toBeInTheDocument();
  });

  it("클릭하면 '담김!'으로 바뀐다", async () => {
    const user = userEvent.setup();

    renderToggleButton();

    await user.click(screen.getByRole('button', { name: '담기' }));

    expect(screen.getByRole('button', { name: '담김!' })).toBeInTheDocument();
  });

  it("다시 클릭하면 '담기'로 돌아온다", async () => {
    const user = userEvent.setup();

    renderToggleButton();

    const button = screen.getByRole('button', { name: '담기' });

    await user.click(button); // 담김!
    await user.click(screen.getByRole('button', { name: '담김!' })); // 다시 담기

    expect(screen.getByRole('button', { name: '담기' })).toBeInTheDocument();
  });

  it("이미 담긴 상품이면 처음부터 '담김!' 버튼이 보인다", () => {
    renderToggleButton([mockProduct]);

    expect(screen.getByRole('button', { name: '담김!' })).toBeInTheDocument();
  });
});
