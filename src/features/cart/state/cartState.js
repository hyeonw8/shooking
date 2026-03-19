import { atom, selector } from 'recoil';

import {
  calculateShippingFee,
  calculateSubtotal,
  calculateTotal,
} from './cartUtils';

export const cartItemsState = atom({
  key: 'cartItemsState',
  default: [],
});

export const cartCountState = selector({
  key: 'cartCountState',
  get: ({ get }) => {
    const items = get(cartItemsState);
    return items.length;
  },
});

export const isCartEmptyState = selector({
  key: 'isCartEmptyState',
  get: ({ get }) => {
    const items = get(cartItemsState);
    return items.length === 0;
  },
});

export const cartSubtotalState = selector({
  key: 'cartSubtotalState',
  get: ({ get }) => {
    const items = get(cartItemsState);
    return calculateSubtotal(items);
  },
});

export const cartShippingFeeState = selector({
  key: 'cartShippingFeeState',
  get: ({ get }) => {
    const subtotal = get(cartSubtotalState);
    return calculateShippingFee(subtotal);
  },
});

export const cartTotalState = selector({
  key: 'cartTotalState',
  get: ({ get }) => {
    const subtotal = get(cartSubtotalState);
    const shippingFee = get(cartShippingFeeState);
    return calculateTotal(subtotal, shippingFee);
  },
});