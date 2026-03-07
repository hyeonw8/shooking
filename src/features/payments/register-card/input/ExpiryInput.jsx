import { formatExpiryInput } from '../../utils/cardFormat';

export const ExpiryInput = ({ value, onChange }) => {
  const handleChange = (e) => {
    const raw = e.target.value;

    const digits = raw.replace(/\D/g, '').slice(0, 4);

    onChange(digits);
  };

  const displayValue = formatExpiryInput(value);

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
        className="h-[55px] w-[150px] rounded-md bg-[#ECEBF1] px-4 py-2 text-center text-xl transition outline-none focus:ring-1 focus:ring-gray-500"
      />
    </div>
  );
};
