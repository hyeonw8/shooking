import { MemoryRouter } from 'react-router-dom';

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

export default {
  title: 'features/products/detail/RelatedProducts',
  component: RelatedProducts,
  decorators: [
    (storyFn) => (
      <MemoryRouter>
        <div className="min-h-screen bg-white px-5 py-8">{storyFn()}</div>
      </MemoryRouter>
    ),
  ],
};

export const Default = {
  args: {
    brand: 'Nike',
    relatedProducts: mockRelatedProducts,
  },
};

export const Empty = {
  args: {
    brand: 'Nike',
    relatedProducts: [],
  },
  render: (args) => (
    <div>
      <p className="mb-4 text-sm text-gray-500">
        relatedProducts가 비어 있으면 컴포넌트가 렌더링되지 않습니다.
      </p>
      <RelatedProducts {...args} />
    </div>
  ),
};
