import { CartItem } from './CartItem';

export default {
  title: 'features/cart/components/list/CartItem',
  component: CartItem,
};

const baseItem = {
  id: 1,
  image: '/assets/images/products/shoes-a-1.jpg',
  brand: 'Nike',
  price: 120000,
  quantity: 1,
};

export const Default = {
  args: baseItem,
};

export const LongBrandName = {
  args: {
    ...baseItem,
    brand: 'Nike Air Max Super Ultra Hyper Long Brand Name',
  },
};

export const HighPrice = {
  args: {
    ...baseItem,
    price: 999000,
  },
};

export const HighQuantity = {
  args: {
    ...baseItem,
    quantity: 9999,
  },
};

export const Minimum = {
  args: {
    ...baseItem,
    quantity: 1,
  },
};

export const Maximum = {
  args: {
    ...baseItem,
    quantity: 99,
  },
};
