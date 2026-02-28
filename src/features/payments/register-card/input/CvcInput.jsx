import { useState } from 'react';

export const CvcInput = ({ value, onChange }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleChange = (e) => {
    const raw = e.target.value;
    const digits = raw.replace(/\D/g, '').slice(0, 3);

    onChange(digits);
  };

  return (
    <div className="relative flex flex-col gap-2">
      <label htmlFor="cvc" className="text-sm font-medium text-gray-700">
        보안 코드(CVC/CVV)
      </label>

      <div className="flex items-center gap-3">
        <input
          id="cvc"
          name="cc-csc"
          autoComplete="cc-csc"
          type="password"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={3}
          value={value}
          onChange={handleChange}
          className="h-[55px] w-[110px] rounded-md bg-[#ECEBF1] px-4 py-2 text-xl transition outline-none focus:ring-1 focus:ring-gray-500"
        />
        {/* ? 버튼 */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowTooltip((prev) => !prev)}
            aria-label="CVC 안내 보기"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-500 text-sm font-semibold"
          >
            ?
          </button>

          {/* Tooltip */}
          {showTooltip && (
            <div className="absolute top-1/2 left-full ml-2 w-56 -translate-y-1/2 rounded-md bg-black px-3 py-2 text-xs text-white shadow-lg">
              카드 뒷면 서명란 옆 3자리 숫자입니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
