import { CardPreview } from './CardPreview';

export default {
  title: 'Payments/RegisterCard/CardPreview',
  component: CardPreview,
};

export const Empty = {
  args: {
    cardNumber: '',
    cardOwner: '',
    expiry: '',
  },
};

export const Partial = {
  args: {
    cardNumber: '12345678',
    cardOwner: 'HONG',
    expiry: '123',
  },
};

export const Filled = {
  args: {
    cardNumber: '1234567812345678',
    cardOwner: 'HONG GILDONG',
    expiry: '1230',
  },
};

export const LongName = {
  args: {
    cardNumber: '1234567812345678',
    cardOwner: 'HONG GILDONG HONG GILDONG HONG GILDONG',
    expiry: '1230',
  },
};
