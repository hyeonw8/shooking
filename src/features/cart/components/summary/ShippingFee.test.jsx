import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { ShippingFee } from './ShippingFee';

describe('ShippingFee', () => {
  it('배송비를 렌더링한다', () => {
    render(<ShippingFee fee={3000} />);

    expect(screen.getByText('3,000원')).toBeInTheDocument();
  });

  it('툴팁 버튼을 렌더링한다', () => {
    render(<ShippingFee fee={3000} />);

    expect(
      screen.getByRole('button', { name: '배송비 안내' })
    ).toBeInTheDocument();
  });

  it('툴팁 버튼 클릭 시 툴팁이 표시된다', async () => {
    const user = userEvent.setup();
    render(<ShippingFee fee={3000} />);

    await user.click(screen.getByRole('button', { name: '배송비 안내' }));

    expect(screen.getByText('10만 원 이상 구매 시 무료배송')).toBeInTheDocument();
  });

  it('툴팁 버튼 다시 클릭 시 툴팁이 닫힌다', async () => {
    const user = userEvent.setup();
    render(<ShippingFee fee={3000} />);

    await user.click(screen.getByRole('button', { name: '배송비 안내' }));
    await user.click(screen.getByRole('button', { name: '배송비 안내' }));

    expect(
      screen.queryByText('10만 원 이상 구매 시 무료배송')
    ).not.toBeInTheDocument();
  });
});
