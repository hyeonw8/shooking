import { useState } from 'react';
import { IoInformationCircleOutline } from 'react-icons/io5';

export const ShippingFee = ({ fee, subtotal }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="flex justify-between">
      <div className="flex shrink-0 items-center gap-x-2">
        <span className="text-lg font-semibold whitespace-nowrap lg:text-xl">
          배송비
        </span>
        <div className="relative flex items-center">
          <button
            type="button"
            aria-label="배송비 안내"
            aria-expanded={showTooltip}
            aria-describedby={showTooltip ? 'shipping-tooltip' : undefined}
            onClick={() => setShowTooltip((prev) => !prev)}
            className="text-gray-400 transition-colors hover:text-gray-600"
          >
            <IoInformationCircleOutline size={24} />
          </button>
          {showTooltip && (
            <div
              id="shipping-tooltip"
              className="absolute top-1/2 left-full ml-2 w-44 -translate-y-1/2 rounded-md bg-gray-800 px-3 py-2 text-center text-xs font-semibold text-white shadow-md"
            >
              10만 원 이상 구매 시 무료배송
            </div>
          )}
        </div>
      </div>
      <span className="text-2xl font-semibold whitespace-nowrap lg:text-[26px]">
        {fee === 0 && subtotal > 0 ? '무료배송' : `${fee.toLocaleString()}원`}
      </span>
    </div>
  );
};
