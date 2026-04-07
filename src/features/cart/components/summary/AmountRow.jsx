export const AmountRow = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between gap-x-2">
      <span className="shrink-0 text-lg font-semibold whitespace-nowrap lg:text-xl">
        {label}
      </span>
      <span className="text-2xl font-semibold whitespace-nowrap lg:text-[26px]">
        {value.toLocaleString()}원
      </span>
    </div>
  );
};
