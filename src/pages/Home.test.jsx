import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Home from './Home';
import { RecoilRoot } from 'recoil';

const renderHome = () => {
  return render(
    <MemoryRouter>
      <RecoilRoot>
        <Home />
      </RecoilRoot>
    </MemoryRouter>
  );
};

describe('Home 통합', () => {
  it("상품 '담기' 클릭 시 헤더 장바구니 뱃지에 수량이 표시된다", async () => {
    const user = userEvent.setup();

    renderHome();

    expect(screen.queryByLabelText('cart-count')).not.toBeInTheDocument();

    const addButton = screen.getAllByRole('button', { name: '담기' })[0];
    await user.click(addButton);

    expect(screen.getByLabelText('cart-count')).toHaveTextContent('1');
  });

  it('같은 상품을 다시 클릭하면 뱃지가 사라진다(0이면 미노출)', async () => {
    const user = userEvent.setup();

    renderHome();

    const addButton = screen.getAllByRole('button', { name: '담기' })[0];

    await user.click(addButton);
    expect(screen.getByLabelText('cart-count')).toHaveTextContent('1');

    await user.click(screen.getByRole('button', { name: '담김!' })); // 다시 클릭(해제) -> 뱃지 사라져야 함
    expect(screen.queryByLabelText('cart-count')).not.toBeInTheDocument();
  });
});
