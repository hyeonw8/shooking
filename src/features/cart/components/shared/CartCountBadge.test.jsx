import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { describe, expect, it } from 'vitest';

import { cartItemsState } from '../../state/cartState';
import { CartCountBadge } from './CartCountBadge';

const renderWithCartItems = (items) => {
  return render(
    <RecoilRoot
      initializeState={({ set }) => {
        set(cartItemsState, items);
      }}
    >
      <CartCountBadge />
    </RecoilRoot>
  );
};

describe('CartCountBadge', () => {
  it('cartCount가 0이면 아무것도 렌더링되지 않는다', () => {
    const { container } = renderWithCartItems([]);

    expect(container).toBeEmptyDOMElement();
  });

  it('cartCount가 1이면 숫자가 렌더링된다', () => {
    renderWithCartItems([
      {
        id: '1',
        image: '/images/shoe-1.png',
        brand: 'Nike',
        price: 50000,
        quantity: 1,
      },
    ]);
    const badge = screen.getByLabelText('cart-count');
    expect(badge).toHaveTextContent('1');
  });

  it('cartCount가 2이면 숫자가 렌더링된다', () => {
    renderWithCartItems([
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
    ]);

    const badge = screen.getByLabelText('cart-count');
    expect(badge).toHaveTextContent('2');
  });
});
