import { fn } from '@storybook/test';

import { AddToCartButton } from './AddToCartButton';

export default {
  title: 'features/products/detail/AddToCartButton',
  component: AddToCartButton,
};

export const Default = {
  args: {
    onClick: fn(),
  },
};
