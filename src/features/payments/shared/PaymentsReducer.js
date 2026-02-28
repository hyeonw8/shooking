export const initialState = {
  cards: [],            // 카드 데이터 목록(객체 배열)
  selectedCardId: null  // 결제에 사용할 카드 선택 상태
};

export const PAYMENTS_ACTIONS = {
  ADD_CARD: 'ADD_CARD',
  SELECT_CARD: 'SELECT_CARD',
};

export const paymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENTS_ACTIONS.ADD_CARD: {
      // { id, cardNumber, cardOwner, expiry, cvc, passwordPrefix }
      const newCard = action.payload; 

      // exists 체크: 객체 배열이므로 some/find로 확인
      const exists = state.cards.some((card) => card.id === newCard.id);
      if (exists) return state; // 중복 id 방지 (원하면 덮어쓰기 로직으로 변경 가능)

      const nextCards = [...state.cards, newCard];

      return {
        ...state,
        cards: nextCards,
        // 첫 카드 등록이면 자동 선택
        selectedCardId: state.selectedCardId ?? newCard.id,
      };
    }
    case PAYMENTS_ACTIONS.SELECT_CARD: {
      const nextId = action.payload; // cardId
      return {
        ...state,
        selectedCardId: nextId,
      }
    }

    default:
      return state;
  }
};
