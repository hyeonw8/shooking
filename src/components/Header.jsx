import { CartButton } from '../features/cart/components/CartButton';
import { BackButton } from './BackButton';

export const Header = ({ variant = '', title }) => {
  const isHome = variant === 'home';

  return (
    <header className="flex h-16 items-center justify-between bg-black px-7 text-white">
      <div>{!isHome && <BackButton />}</div>

      <h1 className="text-lg font-semibold">{title}</h1>

      <div>{isHome && <CartButton />}</div>
    </header>
  );
};
