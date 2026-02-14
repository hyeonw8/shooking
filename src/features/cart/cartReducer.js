export const initialState = {
  cartIds: [],
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'toggle': {
      const id = action.payload;
      const exists = state.cartIds.includes(id);

      return {
        ...state,
        cartIds: exists
          ? state.cartIds.filter((x) => x !== id)
          : [...state.cartIds, id],
      };
    }

    default:
      return state;
  }
};
