import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CheckoutButton } from './CheckoutButton';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('CheckoutButton', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('결제하기 버튼을 렌더링한다', () => {
    render(<CheckoutButton />);

    expect(
      screen.getByRole('button', { name: '결제하기' })
    ).toBeInTheDocument();
  });

  it('disabled를 전달하지 않으면 기본적으로 버튼이 활성화된다', () => {
    render(<CheckoutButton />);

    expect(screen.getByRole('button', { name: '결제하기' })).toBeEnabled();
  });

  it('disabled가 true이면 버튼이 비활성화된다', () => {
    render(<CheckoutButton disabled={true} />);

    expect(screen.getByRole('button', { name: '결제하기' })).toBeDisabled();
  });

  it('disabled가 false이면 버튼이 활성화된다', () => {
    render(<CheckoutButton disabled={false} />);

    expect(screen.getByRole('button', { name: '결제하기' })).toBeEnabled();
  });
  
  it('활성화 상태에서 클릭하면 /payments로 이동한다', async () => {
    const user = userEvent.setup();

    render(<CheckoutButton disabled={false} />);

    await user.click(screen.getByRole('button', { name: '결제하기' }));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/payments');
  });

  it('비활성화 상태에서는 클릭해도 이동하지 않는다', async () => {
    const user = userEvent.setup();

    render(<CheckoutButton disabled={true} />);

    await user.click(screen.getByRole('button', { name: '결제하기' }));

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
