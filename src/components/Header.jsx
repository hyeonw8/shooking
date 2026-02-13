import { CartButton } from "../features/cart/CartButton";

export const Header = () => {
  return (
    <header className="flex h-16 items-center justify-between bg-black px-7">
      <div />
      <div className="relative">
        <CartButton />
      </div>
    </header>
  );
};
