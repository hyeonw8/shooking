import { useState } from 'react';

export const ShippingFee = ({ fee, subtotal }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold">배송비</span>
        <div className="relative">
          <button
            type="button"
            aria-label="배송비 안내"
            aria-expanded={showTooltip}
            aria-describedby={showTooltip ? 'shipping-tooltip' : undefined}
            onClick={() => setShowTooltip((prev) => !prev)}
            className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-500 text-xs text-gray-500"
          >
            !
          </button>
          {showTooltip && (
            <div
              id="shipping-tooltip"
              className="absolute top-1/2 left-full ml-2 w-44 -translate-y-1/2 rounded-md bg-gray-300 px-3 py-2 text-center text-xs font-semibold text-black shadow-md"
            >
              10만 원 이상 구매 시 무료배송
            </div>
          )}
        </div>
      </div>
      <span className="text-2xl font-semibold">
        {fee === 0 && subtotal > 0 ? '무료배송' : `${fee.toLocaleString()}원`}
      </span>
    </div>
  );
};
