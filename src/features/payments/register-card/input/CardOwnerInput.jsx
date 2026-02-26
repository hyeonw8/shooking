export const CardOwnerInput = ({ value, onChange }) => {
  const handleChange = (e) => {
    const raw = e.target.value;

    const lenthLimited = raw.slice(0, 30);
    const upperCased = lenthLimited.toUpperCase();

    const normalized = upperCased.trimStart().replace(/[^A-Z가-힣ㄱ-ㅎㅏ-ㅣ\s]/g, '');

    onChange(normalized);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-sm font-medium text-gray-700">
        <label htmlFor="cardOwner">카드 소유자 이름</label>
        <p>{`${value.length}/30`}</p>
      </div>

      <input
        id="cardOwner"
        autoComplete="cc-name"
        type="text"
        maxLength={30}
        value={value}
        placeholder="카드에 표시된 이름과 동일하게 입력하세요."
        onChange={handleChange}
        className="h-[55px] rounded-md bg-[#ECEBF1] px-4 py-2 text-xl transition outline-none focus:ring-1 focus:ring-gray-500"
      />
    </div>
  );
};
