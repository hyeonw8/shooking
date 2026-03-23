import { fn } from '@storybook/test';

import { CheckoutButton } from './CheckoutButton';

export default {
  title: 'features/cart/components/list/CheckoutButton',
  component: CheckoutButton,
  args: {
    onClick: fn(),
  },
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
