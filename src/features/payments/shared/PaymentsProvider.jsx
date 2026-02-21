import { useMemo, useReducer } from 'react';

import {
  PaymentsDispatchContext,
  PaymentsStateContext,
} from './PaymentsContext';
import { initialState, paymentsReducer } from './PaymentsReducer';

export function PaymentsProvider({ children }) {
  const [state, dispatch] = useReducer(paymentsReducer, initialState);

  const stateValue = useMemo(() => {
    const { cards, selectedCardId } = state;

    const selectedCard =
      cards.find((card) => card.id === selectedCardId) ?? null;

    return {
      cards,
      cardsCount: cards.length,
      selectedCardId,
      selectedCard,
    };
  }, [state]);

  return (
    <PaymentsStateContext.Provider value={stateValue}>
      <PaymentsDispatchContext.Provider value={dispatch}>
        {children}
      </PaymentsDispatchContext.Provider>
    </PaymentsStateContext.Provider>
  );
}
