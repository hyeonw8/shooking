import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PageHeaderInfo } from './PageHeaderInfo';

describe('PageHeaderInfo', () => {
  it('페이지별 Info title과 description을 렌더링한다', () => {
    render(
      <PageHeaderInfo
        title="장바구니"
        description="현재 0개의 상품이 담겨있습니다."
      />
    );

    expect(
      screen.getByRole('heading', { name: '장바구니' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('현재 0개의 상품이 담겨있습니다.')
    ).toBeInTheDocument();
  });

  it('description이 없으면 제목만 렌더링한다', () => {
    render(<PageHeaderInfo title="장바구니" />);

    expect(
      screen.getByRole('heading', { name: '장바구니' })
    ).toBeInTheDocument();
  });
});
