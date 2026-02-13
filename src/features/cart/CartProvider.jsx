import { useMemo, useReducer } from "react";
import {
  CartDispatchContext,
  cartReducer,
  CartStateContext,
  initialState,
} from "./CartContext";

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const stateValue = useMemo(
    () => ({
      cartIds: state.cartIds,
      cartCount: state.cartIds.length,
    }),
    [state.cartIds]
  );

  return (
    <CartStateContext.Provider value={stateValue}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}
