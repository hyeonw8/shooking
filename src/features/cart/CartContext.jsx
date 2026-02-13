import { createContext } from "react";

export const CartStateContext = createContext(null);
export const CartDispatchContext = createContext(null);

export const initialState = {
  cartIds: [],
};

export const cartReducer = (state, action) => {
  const id = action.payload;
  const exists = state.cartIds.includes(id);

  if (action.type === "toggle") {
    return {
      ...state,
      cartIds: exists
        ? state.cartIds.filter((x) => x !== id)
        : [...state.cartIds, id],
    };
  }

  return state;
};
