import { MemoryRouter } from 'react-router-dom';

import { CheckoutButton } from './CheckoutButton';

export default {
  title: 'features/cart/components/list/CheckoutButton',
  component: CheckoutButton,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const Enabled = {
  args: {
    disabled: false,
  },
};

export const Disabled = {
  args: {
    disabled: true,
  },
};
