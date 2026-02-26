import { useRef } from 'react';

export const CardPasswordInput = ({ value, onChange }) => {
  const first = value?.[0] ?? '';
  const second = value?.[1] ?? '';

  const firstRef = useRef(null);
  const secondRef = useRef(null);

  const handleFirstChange = (e) => {
    const digit = e.target.value.replace(/\D/g, '').slice(0, 1);
    onChange(digit + second);

    // 입력이 들어오면 다음 칸으로
    if (digit) secondRef.current?.focus();
  };

  const handleSecondChange = (e) => {
    const digit = e.target.value.replace(/\D/g, '').slice(0, 1);
    onChange(first + digit);

    // 값이 없어졌으면 바로 첫 번째로 이동
    if (!digit) {
      firstRef.current?.focus();
    }
  };

  const handleSecondKeyDown = (e) => {
    if (e.key === 'Backspace' && !second) {
      e.preventDefault();
      firstRef.current?.focus();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="password-1" className="text-sm font-medium text-gray-700">
        카드 비밀번호
      </label>

      <div className="flex items-center gap-3">
        <input
          ref={firstRef}
          id="password-1"
          type="password"
          inputMode="numeric"
          autoComplete="off"
          pattern="[0-9]*"
          maxLength={1}
          value={first}
          onChange={handleFirstChange}
          className="h-[55px] w-[53px] rounded-md bg-[#ECEBF1] px-4 text-center text-3xl transition outline-none focus:ring-1 focus:ring-gray-500"
        />
        <label htmlFor="password-2" className="sr-only">
          카드 비밀번호 두 번째 자리
        </label>
        <input
          ref={secondRef}
          id="password-2"
          type="password"
          inputMode="numeric"
          autoComplete="off"
          pattern="[0-9]*"
          maxLength={1}
          value={second}
          onChange={handleSecondChange}
          onKeyDown={handleSecondKeyDown}
          className="h-[55px] w-[53px] rounded-md bg-[#ECEBF1] px-4 text-center text-3xl transition outline-none focus:ring-1 focus:ring-gray-500"
        />

        <div className="flex h-[55px] w-[53px] items-center justify-center text-3xl">
          •
        </div>
        <div className="flex h-[55px] w-[53px] items-center justify-center text-3xl">
          •
        </div>
      </div>
    </div>
  );
};
