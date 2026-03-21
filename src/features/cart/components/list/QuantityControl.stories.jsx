import { fn } from '@storybook/test';

import { QuantityControl } from './QuantityControl';

export default {
  title: 'features/cart/components/list/QuantityControl',
  component: QuantityControl,
  args: {
    onIncrease: fn(),
    onDecrease: fn(),
  },
};

export const Default = {
  args: {
    quantity: 1,
  },
};

export const HighQuantity = {
  args: {
    quantity: 10,
  },
};

export const Minimum = {
  args: {
    quantity: 1,
    disableDecrease: true,
  },
};

export const Maximum = {
  args: {
    quantity: 99,
    disableIncrease: true,
  },
};
