import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';

import { CvcInput } from './CvcInput';

const ControlledRender = (args) => {
  const [value, setValue] = useState(args.value ?? '');

  return <CvcInput {...args} value={value} onChange={setValue} />;
};

export default {
  title: 'payments/register-card/input/CvcInput',
  component: CvcInput,
  parameters: {
    layout: 'centered',
  },
  args: {
    value: '',
    onChange: fn(),
  },
  render: (args) => <ControlledRender {...args} />,
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
