import { fn } from '@storybook/test';
import { MemoryRouter } from 'react-router-dom';

import { PaymentsHeader } from './PaymentsHeader';

export default {
  title: 'Payments/Shared/PaymentsHeader',
  component: PaymentsHeader,
  decorators: [
    (story) => (
      <MemoryRouter initialEntries={['/payments/add']}>
        <div className="min-h-[120px] bg-white">{story()}</div>
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

export const AddVariant = {};

export const List = {
  args: {
    title: '보유카드',
    variant: 'list', //  add가 아니면 뒤로가기 숨김
  },
};
