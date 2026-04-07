export const BuyNowButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-3 inline-flex w-14 cursor-pointer items-center justify-center rounded-full bg-amber-200 py-1 text-sm font-semibold text-black transition"
    >
      구매
    </button>
  );
};
