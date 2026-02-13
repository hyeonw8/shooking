import { useCart } from "./useCart";

export const CartCountBadge = () => {
  const { cartCount } = useCart();

  return (
    cartCount > 0 && (
      <span className="absolute top-3 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
        {cartCount}
      </span>
    )
  );
};
