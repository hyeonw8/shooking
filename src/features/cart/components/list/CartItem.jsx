import { memo } from 'react';

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
    <article className="relative flex h-[185px] w-full max-w-[430px] border-b border-gray-200 px-[20px] py-[22px]">
      <div className="absolute top-0 right-3">
        <button
          type="button"
          onClick={handleRemoveClick}
          aria-label="상품 삭제"
          className="text-xl text-gray-600"
        >
          x
        </button>
      </div>
      <div className="flex flex-1 items-end gap-[54px]">
        <img
          src={image}
          alt={`${brand} 상품 이미지`}
          className="h-[138px] w-[146px] shrink-0 rounded-[30px] object-cover"
        />
        <div className="flex flex-col gap-6 pb-[20px]">
          <div className="flex flex-col">
            <h3 className="max-w-[180px] truncate text-lg">{brand}</h3>
            {/* truncate - verflow-hidden text-ellipsis whitespace-nowrap */}
            <p className="text-2xl font-bold">{price.toLocaleString()}원</p>
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
