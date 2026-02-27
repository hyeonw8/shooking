import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { CartProvider } from '../features/cart/CartProvider';
import Home from './Home';

describe('Home 통합', () => {
  it("상품 '담기' 클릭 시 헤더 장바구니 뱃지에 수량이 표시된다", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CartProvider>
          <Home />
        </CartProvider>
      </MemoryRouter>
    );

    expect(screen.queryByLabelText('cart-count')).not.toBeInTheDocument();

    const addButton = screen.getAllByRole('button', { name: '담기' })[0];
    await user.click(addButton);

    expect(screen.getByLabelText('cart-count')).toHaveTextContent('1');
  });

  it('같은 상품을 다시 클릭하면 뱃지가 사라진다(0이면 미노출)', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CartProvider>
          <Home />
        </CartProvider>
      </MemoryRouter>
    );

    const addButton = screen.getAllByRole('button', { name: '담기' })[0];

    await user.click(addButton); // 담김 -> 1
    expect(screen.getByText('1')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '담김!' })); // 다시 클릭(해제) -> 뱃지 사라져야 함
    expect(screen.queryByText('1')).not.toBeInTheDocument();
  });
});
