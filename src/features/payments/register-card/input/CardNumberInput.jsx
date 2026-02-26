import { useRef } from 'react';

export const CardNumberInput = ({ value, onChange }) => {
  const num1 = value.slice(0, 4);
  const num2 = value.slice(4, 8);
  const num3 = value.slice(8, 12);
  const num4 = value.slice(12, 16);

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  const refs = [ref1, ref2, ref3, ref4];

  const handleChange = (index, e) => {
    const input = e.target.value.replace(/\D/g, '').slice(0, 4);

    const next = [
      value.slice(0, 4),
      value.slice(4, 8),
      value.slice(8, 12),
      value.slice(12, 16),
    ];
    next[index] = input;
    onChange(next.join(''));

    if (input.length === 4 && index < 3) {
      refs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key !== 'Backspace') return;

    const parts = [
      value.slice(0, 4),
      value.slice(4, 8),
      value.slice(8, 12),
      value.slice(12, 16),
    ];

    const current = parts[index];

    if (index === 0) return;

    // 현재 칸이 비어있으면 바로 이전 칸으로 이동
    if (current.length === 0) {
      e.preventDefault();
      const prevEl = refs[index - 1].current;
      prevEl?.focus();
      const len = prevEl?.value?.length ?? 0;
      prevEl?.setSelectionRange?.(len, len);
      return;
    }

    // 현재 칸이 1자리면 직접 비우고 이전 칸으로 이동
    if (current.length === 1) {
      e.preventDefault();
      parts[index] = '';
      onChange(parts.join(''));

      queueMicrotask(() => {
        const prevEl = refs[index - 1].current;
        prevEl?.focus();
        const len = prevEl?.value?.length ?? 0;
        prevEl?.setSelectionRange?.(len, len);
      });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="cardNumber1"
        className="text-sm font-medium text-gray-700"
      >
        카드 번호
      </label>

      <div className="flex h-[55px] items-center justify-center gap-2 rounded-md bg-[#ECEBF1] px-4 transition focus-within:ring-1 focus-within:ring-gray-500">
        <label htmlFor="cardNumber1" className="sr-only">
          첫번째 자리
        </label>
        <input
          id="cardNumber1"
          ref={ref1}
          autoComplete="cc-number"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={4}
          value={num1}
          onChange={(e) => handleChange(0, e)}
          onKeyDown={(e) => handleKeyDown(0, e)}
          className="w-[48px] bg-transparent text-center text-xl outline-none"
        />
        <span className="text-gray-400" aria-hidden="true">
          -
        </span>

        <label htmlFor="cardNumber2" className="sr-only">
          카드번호 두번째 자리
        </label>
        <input
          id="cardNumber2"
          ref={ref2}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={4}
          value={num2}
          onChange={(e) => handleChange(1, e)}
          onKeyDown={(e) => handleKeyDown(1, e)}
          className="w-[48px] bg-transparent text-center text-xl outline-none"
        />
        <span className="text-gray-400" aria-hidden="true">
          -
        </span>

        <label htmlFor="cardNumber3" className="sr-only">
          카드번호 세번째 자리
        </label>
        <input
          id="cardNumber3"
          ref={ref3}
          type="password"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={4}
          value={num3}
          onChange={(e) => handleChange(2, e)}
          onKeyDown={(e) => handleKeyDown(2, e)}
          className="w-[48px] bg-transparent text-center text-xl outline-none"
        />
        <span className="text-gray-400" aria-hidden="true">
          -
        </span>

        <label htmlFor="cardNumber4" className="sr-only">
          카드번호 네번째 자리
        </label>
        <input
          id="cardNumber4"
          ref={ref4}
          type="password"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={4}
          value={num4}
          onChange={(e) => handleChange(3, e)}
          onKeyDown={(e) => handleKeyDown(3, e)}
          className="w-[48px] bg-transparent text-center text-xl outline-none"
        />
      </div>
    </div>
  );
};
