export const addCard = (cards, newCard) => {
  const isExists = cards.some((card) => card.cardNumber === newCard.cardNumber);

  if (isExists) {
    return {
      cards,
      isAdded: false,
    };
  }

  return {
    cards: [...cards, newCard],
    isAdded: true,
  };
};

export const createCartPaymentOrder = ({
  items,
  subtotal,
  shippingFee,
  total,
}) => {
  return {
    items,
    subtotal,
    shippingFee,
    total,
  };
};

export const createSingleProductPaymentOrder = ({ product, quantity }) => {
  const subtotal = product.price * quantity;
  const shippingFee = subtotal >= 100000 ? 0 : 3000;
  const total = subtotal + shippingFee;

  return {
    items: [
      {
        id: product.id,
        image: product.image,
        brand: product.brand,
        price: product.price,
        quantity,
      },
    ],
    subtotal,
    shippingFee,
    total,
  };
};
