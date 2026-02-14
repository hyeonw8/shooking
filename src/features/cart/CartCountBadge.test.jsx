import { render, screen } from '@testing-library/react';
import { CartStateContext } from './CartContext';
import { CartCountBadge } from './CartCountBadge';
import { describe, expect, it } from 'vitest';

describe('CartCountBadge', () => {
  it('cartCount가 0이면 아무것도 렌더링되지 않는다', () => {
    const { container } = render(
      <CartStateContext.Provider value={{ cartCount: 0 }}>
        <CartCountBadge />
      </CartStateContext.Provider>
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('cartCount가 1이면 숫자가 렌더링된다', () => {
    render(
      <CartStateContext.Provider value={{ cartCount: 1 }}>
        <CartCountBadge />
      </CartStateContext.Provider>
    );

    const badge = screen.getByLabelText('cart-count');
    expect(badge).toHaveTextContent('1');
  });

  it('cartCount가 2이면 숫자가 렌더링된다', () => {
    render(
      <CartStateContext.Provider value={{ cartCount: 2 }}>
        <CartCountBadge />
      </CartStateContext.Provider>
    );

    const badge = screen.getByLabelText('cart-count');
    expect(badge).toHaveTextContent('2');
  });
});
