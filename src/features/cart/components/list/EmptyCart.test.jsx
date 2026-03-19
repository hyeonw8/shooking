import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, vi } from 'vitest';

import { EmptyCart } from './EmptyCart';

// rotuer 테스트를 위한 처리, 실제 navigate → 테스트용 mock 함수
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('EmptyCart', () => {
  it('안내 문구와 상품 보러가기 버튼을 렌더링한다', () => {
    render(<EmptyCart />);

    expect(
      screen.getByRole('heading', { name: '장바구니가 비었어요!' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('원하는 상품을 장바구니에 담아 보세요.')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '상품 보러가기' })
    ).toBeInTheDocument();
  });

  it('상품 보러가기 버튼 클릭 시 상품 페이지(' / ')로 이동한다', async () => {
    const user = userEvent.setup();

    render(<EmptyCart />);

    await user.click(screen.getByRole('button', { name: '상품 보러가기' }));

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
