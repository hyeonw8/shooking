import { MemoryRouter } from 'react-router-dom';

import { EmptyCart } from './EmptyCart';

export default {
  title: 'features/cart/components/list/EmptyCart',
  component: EmptyCart,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="min-h-screen bg-white px-7 py-10">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export const Default = {};
