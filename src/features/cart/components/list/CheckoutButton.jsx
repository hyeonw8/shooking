export const CheckoutButton = ({ disabled = false, onClick }) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="h-[58px] w-full max-w-[385px] rounded-[48px] bg-[#FFEF64] text-xl transition-opacity disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-700 disabled:opacity-60"
    >
      결제하기
    </button>
  );
};
