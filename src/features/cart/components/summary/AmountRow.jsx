export const AmountRow = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-lg font-semibold">{label}</span>
      <span className="text-2xl font-semibold">{value.toLocaleString()}원</span>
    </div>
  );
};
