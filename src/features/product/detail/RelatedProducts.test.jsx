import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { RelatedProducts } from './RelatedProducts';

const mockRelatedProducts = [
  {
    id: '1',
    image: '/assets/images/products/shoes-a-1.jpg',
    brand: 'Nike',
    description: 'Nike Zoom',
    price: 139000,
  },
  {
    id: '2',
    image: '/assets/images/products/shoes-a-2.jpg',
    brand: 'Nike',
    description: 'Nike Air Max',
    price: 129000,
  },
  {
    id: '3',
    image: '/assets/images/products/shoes-a-3.jpg',
    brand: 'Nike',
    description: 'Nike Zoom',
    price: 139000,
  },
];

const renderRelatedProducts = (props) => {
  return render(
    <MemoryRouter>
      <RelatedProducts {...props} />
    </MemoryRouter>
  );
};

describe('RelatedProducts', () => {
  it('관련 상품 제목과 안내 문구를 렌더링한다', () => {
    renderRelatedProducts({
      brand: 'Nike',
      relatedProducts: mockRelatedProducts,
    });

    expect(screen.getByText('관련 상품')).toBeInTheDocument();
    expect(
      screen.getByText('Nike의 다른 상품을 확인해 보세요.')
    ).toBeInTheDocument();
  });

  it('관련 상품 이미지 목록을 렌더링한다', () => {
    renderRelatedProducts({
      brand: 'Nike',
      relatedProducts: mockRelatedProducts,
    });

    const images = screen.getAllByRole('img', {
      name: 'Nike 관련 상품 이미지',
    });

    expect(images).toHaveLength(3);
  });

  it('관련 상품 이미지가 각 상품 상세 페이지 경로로 연결된다', () => {
    renderRelatedProducts({
      brand: 'Nike',
      relatedProducts: mockRelatedProducts,
    });

    const links = screen.getAllByRole('link');

    expect(links[0]).toHaveAttribute('href', '/products/1');
    expect(links[1]).toHaveAttribute('href', '/products/2');
    expect(links[2]).toHaveAttribute('href', '/products/3');
  });

  it('관련 상품이 없으면 아무것도 렌더링하지 않는다', () => {
    const { container } = renderRelatedProducts({
      brand: 'Nike',
      relatedProducts: [],
    });

    expect(container).toBeEmptyDOMElement();
  });
});