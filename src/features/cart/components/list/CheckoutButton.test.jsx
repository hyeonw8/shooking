import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { CheckoutButton } from './CheckoutButton';

describe('CheckoutButton', () => {
  it('결제하기 버튼을 렌더링한다', () => {
    render(<CheckoutButton onClick={vi.fn()} />);

    expect(
      screen.getByRole('button', { name: '결제하기' })
    ).toBeInTheDocument();
  });

  it('disabled를 전달하지 않으면 기본적으로 버튼이 활성화된다', () => {
    render(<CheckoutButton onClick={vi.fn()} />);

    expect(screen.getByRole('button', { name: '결제하기' })).toBeEnabled();
  });

  it('disabled가 true이면 버튼이 비활성화된다', () => {
    render(<CheckoutButton disabled={true} onClick={vi.fn()} />);

    expect(screen.getByRole('button', { name: '결제하기' })).toBeDisabled();
  });

  it('disabled가 false이면 버튼이 활성화된다', () => {
    render(<CheckoutButton disabled={false} onClick={vi.fn()} />);

    expect(screen.getByRole('button', { name: '결제하기' })).toBeEnabled();
  });

  it('활성화 상태에서 클릭하면 onClick을 호출한다', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<CheckoutButton disabled={false} onClick={onClick} />);

    await user.click(screen.getByRole('button', { name: '결제하기' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('비활성화 상태에서는 클릭해도 onClick을 호출하지 않는다', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<CheckoutButton disabled={true} onClick={onClick} />);

    await user.click(screen.getByRole('button', { name: '결제하기' }));

    expect(onClick).not.toHaveBeenCalled();
  });
});
