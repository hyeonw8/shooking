import { memo } from 'react';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import { useCartActions } from '../../hooks/useCartActions';
import { QuantityControl } from './QuantityControl';

export const CartItem = memo(({ id, image, brand, price, quantity }) => {
  const { handleIncrease, handleDecrease, handleRemoveItem } = useCartActions();

  const handleIncreaseClick = () => {
    handleIncrease(id);
  };

  const handleDecreaseClick = () => {
    handleDecrease(id);
  };

  const handleRemoveClick = () => {
    handleRemoveItem(id);
  };

  return (
    <article className="flex min-h-[185px] w-full border-b border-gray-200 py-[22px]">
      <div className="flex flex-1 items-center gap-[50px] lg:gap-[60px]">
        <Link to={`/products/${id}`} className="block shrink-0">
          <img
            src={image}
            alt={`${brand} 상품 이미지`}
            className="h-[138px] w-[146px] rounded-[30px] object-cover lg:h-[158px] lg:w-[166px]"
          />
        </Link>
        <div className="flex w-full min-w-0 flex-col justify-between gap-6">
          <div className="flex min-w-0 items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-lg font-medium lg:max-w-[220px] lg:text-[22px] lg:leading-[1.2]">
                {brand}
              </h3>
              {/* truncate - verflow-hidden text-ellipsis whitespace-nowrap */}
              <p className="mt-1 text-2xl font-bold whitespace-nowrap lg:mt-2 lg:text-[26px] lg:leading-none">
                {price.toLocaleString()}원
              </p>
            </div>
            <button
              type="button"
              onClick={handleRemoveClick}
              aria-label="상품 삭제"
              className="-mt-7 shrink-0 cursor-pointer text-gray-500 transition-colors hover:text-gray-700"
            >
              <IoClose size={22} />
            </button>
          </div>
          <QuantityControl
            quantity={quantity}
            onIncrease={handleIncreaseClick}
            onDecrease={handleDecreaseClick}
            disableDecrease={quantity <= 1}
            disableIncrease={quantity >= 99}
          />
        </div>
      </div>
    </article>
  );
});
