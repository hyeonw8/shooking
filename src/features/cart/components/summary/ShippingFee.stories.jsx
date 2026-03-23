import { expect, userEvent, within } from '@storybook/test';

import { ShippingFee } from './ShippingFee';

export default {
  title: 'features/cart/components/summary/ShippingFee',
  component: ShippingFee,
};

export const Default = {
  args: { fee: 3000, subtotal: 50000 },
};

export const Free = {
  args: { fee: 0, subtotal: 100000 },
};

export const TooltipOpen = {
  args: { fee: 3000, subtotal: 50000 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: '배송비 안내' }));

    expect(canvas.getByText('10만 원 이상 구매 시 무료배송')).toBeVisible();
  },
};
