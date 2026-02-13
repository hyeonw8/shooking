import { CartIcon } from "../../components/icons/CartIcon"
import { CartCountBadge } from "./CartCountBadge"

export const CartButton = () => {
  return (
    <>
      <CartIcon className="h-6 w-6" />
      <CartCountBadge />
    </>
  )
}