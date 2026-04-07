import { fn } from '@storybook/test';
import { MemoryRouter } from 'react-router-dom';

import { PaymentsHeader } from './PaymentsHeader';

export default {
  title: 'payments/shared/PaymentsHeader',
  component: PaymentsHeader,
  decorators: [
    (storyFn) => (
      <MemoryRouter initialEntries={['/payments/add']}>
        <div className="min-h-[120px] bg-white">{storyFn()}</div>
      </MemoryRouter>
    ),
  ],
  args: {
    title: '카드추가',
    variant: 'add',
    onClose: fn(),
    onBack: fn(),
  },
};

export const Add = {};

export const List = {
  args: {
    title: '보유카드',
    variant: 'list', //  add가 아니면 뒤로가기 숨김
  },
};
