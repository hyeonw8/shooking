import { atom, selector } from 'recoil';

export const cardsState = atom({
  key: 'cardsState',
  default: [],
});

export const selectedCardIdState = atom({
  key: 'selectedCardIdState',
  default: null,
});

export const selectedCardState = selector({
  key: 'selectedCardState',
  get: ({ get }) => {
    const cards = get(cardsState);
    const selectedCardId = get(selectedCardIdState);

    return cards.find((card) => card.id === selectedCardId) ?? null;
  },
});

export const paymentOrderState = atom({
  key: 'paymentOrderState',
  default: null,
  //  {
  //   items: [],
  //   subtotal: 0,
  //   shippingFee: 0,
  //   total: 0,
  // },
});
