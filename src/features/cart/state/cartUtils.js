export const addCartItem = (items, newItem) => {
  const existingItem = items.find((item) => item.id === newItem.id);

  if (!existingItem) {
    // 아이템이 새로 추가되는 거라면
    return [...items, { ...newItem, quantity: newItem.quantity ?? 1 }];
  }

  return items.map((item) =>
    item.id === newItem.id
      ? { ...item, quantity: item.quantity + (newItem.quantity ?? 1) }
      : item
  );
};

export const removeCartItem = (items, id) => {
  return items.filter((item) => item.id !== id);
};

// 장바구니 담기 토글
export const toggleCartItem = (items, product) => {
  const exists = items.some((item) => item.id === product.id);

  if (exists) {
    return removeCartItem(items, product.id);
  }

  return addCartItem(items, product);
};

// 장바구니 수량 관리
export const increaseQuantity = (items, id) => {
  return items.map((item) =>
    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  );
};

export const decreaseQuantity = (items, id) => {
  return items.map((item) =>
    item.id === id
      ? { ...item, quantity: Math.max(1, item.quantity - 1) } // 1이하로 안 떨어지게
      : item
  );
};

// 금액, 배송비 계산
export const calculateSubtotal = (items) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const calculateShippingFee = (subtotal) => {
  if (subtotal === 0) return 0;
  
  return subtotal >= 100000 ? 0 : 3000;
};

export const calculateTotal = (subtotal, shippingFee) => {
  return subtotal + shippingFee;
};
