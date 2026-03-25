import { CartButton } from '../features/cart/components/shared/CartButton';
import { BackButton } from './BackButton';

export const Header = ({ variant = 'home', title }) => {
  const showBack = variant === 'detail' || variant === 'cart';
  const showCart = variant === 'home' || variant === 'detail';

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center bg-black px-5 text-white">
      <div className="flex w-10 shrink-0">
        {showBack && <BackButton />}
      </div>

      <div className="flex-1 text-center">
        <h1 className="truncate text-lg font-semibold">{title}</h1>
      </div>

      <div className="flex w-10 shrink-0">
        {showCart && <CartButton />}
      </div>
    </header>
  );
};
