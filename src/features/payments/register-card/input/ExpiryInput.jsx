export const ExpiryInput = ({ value, onChange }) => {
  const getDisplayValue = (digits) => {
    const onlyDigits = String(digits ?? '')
      .replace(/\D/g, '')
      .slice(0, 4);

    const mm = onlyDigits.slice(0, 2);
    const yy = onlyDigits.slice(2, 4);

    // 0~2자리: 그대로, 3~4자리: "MM / YY"
    if (onlyDigits.length <= 2) return mm;
    return `${mm} / ${yy}`;
  };

  const handleChange = (e) => {
    const raw = e.target.value;

    const digits = raw.replace(/\D/g, '').slice(0, 4);

    onChange(digits);
  };

  const displayValue = getDisplayValue(value);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="expiry" className="text-sm font-medium text-gray-700">
        만료일
      </label>

      <input
        id="expiry"
        name="cc-exp"
        type="text"
        inputMode="numeric"
        placeholder="MM / YY"
        maxLength={7}
        value={displayValue}
        onChange={handleChange}
        className="h-[55px] w-[150px] rounded-md bg-[#ECEBF1] px-4 py-2 text-xl text-center transition outline-none focus:ring-1 focus:ring-gray-500"
      />
    </div>
  );
};
