import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { QuantityControl } from './QuantityControl';

describe('QuantityControl', () => {
  it('수량 증가 버튼, 수량 감소 버튼, 현재 수량을 렌더링한다', () => {
    render(
      <QuantityControl quantity={3} onIncrease={vi.fn()} onDecrease={vi.fn()} />
    );

    expect(
      screen.getByRole('button', { name: '수량 증가' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '수량 감소' })
    ).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('수량 증가 버튼 클릭 시 onIncrease를 호출한다', async () => {
    const user = userEvent.setup();
    const onIncrease = vi.fn();

    render(
      <QuantityControl
        quantity={1}
        onIncrease={onIncrease}
        onDecrease={vi.fn()}
      />
    );

    await user.click(screen.getByRole('button', { name: '수량 증가' }));

    expect(onIncrease).toHaveBeenCalledTimes(1);
  });

  it('수량 감소 버튼 클릭 시 onDecrease를 호출한다', async () => {
    const user = userEvent.setup();
    const onDecrease = vi.fn();

    render(
      <QuantityControl
        quantity={1}
        onIncrease={vi.fn()}
        onDecrease={onDecrease}
      />
    );

    await user.click(screen.getByRole('button', { name: '수량 감소' }));

    expect(onDecrease).toHaveBeenCalledTimes(1);
  });
});
