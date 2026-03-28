export const AddToCartButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-7 h-[60px] w-full rounded-[30px] bg-black px-3 text-center text-xl font-bold text-white"
    >
      장바구니 담기
    </button>
  );
};
