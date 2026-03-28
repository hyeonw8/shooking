import { useSetRecoilState } from 'recoil';

import {
  cardsState,
  paymentOrderState,
  selectedCardIdState,
} from '../state/paymentState';
import { addCard } from '../utils/paymentUtils';

export const usePaymentActions = () => {
  const setCards = useSetRecoilState(cardsState);
  const setSelectedCardId = useSetRecoilState(selectedCardIdState);
  const setPaymentOrder = useSetRecoilState(paymentOrderState);

  const handleAddCard = (newCard) => {
    let isAdded = false;

    setCards((prev) => {
      const result = addCard(prev, newCard);

      isAdded = result.isAdded;

      return result.cards;
    });

    if (isAdded) {
      setSelectedCardId((prev) => prev ?? newCard.id);
    }

    return isAdded;
  };

  const handleSelectCard = (cardId) => {
    setSelectedCardId(cardId);
  };

  const handleSetPaymentOrder = (order) => {
    setPaymentOrder(order);
  };

  const handleResetPaymentOrder = () => {
    setPaymentOrder(null);
  };

  return {
    handleAddCard,
    handleSelectCard,
    handleSetPaymentOrder,
    handleResetPaymentOrder,
  };
};
