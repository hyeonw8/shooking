import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { paymentOrderState } from '../features/payments/state/paymentState';
import PaymentSuccessPage from './PaymentSuccessPage';

const renderWithPaymentOrder = (paymentOrder) => {
  return (storyFn) => {
    return (
      <MemoryRouter>
        <RecoilRoot
          initializeState={({ set }) => {
            set(paymentOrderState, paymentOrder);
          }}
        >
          <div className="min-h-screen bg-white">{storyFn()}</div>
        </RecoilRoot>
      </MemoryRouter>
    );
  };
};

const defaultPaymentOrder = {
  items: [
    {
      id: '1',
      image: '/assets/images/products/shoes-a-1.jpg',
      brand: 'Nike',
      price: 50000,
      quantity: 1,
    },
    {
      id: '2',
      image: '/assets/images/products/shoes-a-2.jpg',
      brand: 'Adidas',
      price: 30000,
      quantity: 2,
    },
  ],
  subtotal: 110000,
  shippingFee: 0,
  total: 110000,
};

const singleItemPaymentOrder = {
  items: [
    {
      id: '1',
      image: '/assets/images/products/shoes-a-1.jpg',
      brand: 'Nike',
      price: 89000,
      quantity: 1,
    },
  ],
  subtotal: 89000,
  shippingFee: 3000,
  total: 92000,
};

export default {
  title: 'pages/PaymentSuccessPage',
  component: PaymentSuccessPage,
  decorators: [renderWithPaymentOrder(defaultPaymentOrder)],
};

export const Default = {};

export const SingleItem = {
  decorators: [renderWithPaymentOrder(singleItemPaymentOrder)],
};
