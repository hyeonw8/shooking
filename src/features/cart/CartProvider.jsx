import { useMemo, useReducer } from 'react';
import { CartDispatchContext, CartStateContext } from './CartContext';
import { cartReducer, initialState } from './cartReducer';

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const stateValue = useMemo(() => {
    const cartSet = new Set(state.cartIds);

    return {
      cartIds: state.cartIds,
      cartSet,
      cartCount: state.cartIds.length,
    };
  }, [state.cartIds]);

  return (
    <CartStateContext.Provider value={stateValue}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}
