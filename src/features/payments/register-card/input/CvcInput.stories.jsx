import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';

import { CvcInput } from './CvcInput';

function ControlledCvc() {
  const [value, setValue] = useState('');
  return <CvcInput value={value} onChange={setValue} />;
}

export default {
  title: 'Payments/RegisterCard/Input/CvcInput',
  component: ControlledCvc,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {};

export const TooltipOpen = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(
      canvas.getByRole('button', { name: 'CVC 안내 보기' })
    );

    expect(
      canvas.getByText('카드 뒷면 서명란 옆 3자리 숫자입니다.')
    ).toBeInTheDocument();
  },
};
