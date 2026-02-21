import clsx from "clsx";

export const PayWithThisCardButton = ({ disabled }) => {
  const handleClick = () => {
    alert('결제 요청 완료!');
  };
  
  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={clsx(
        'h-[40px] w-full rounded-full text-sm font-semibold transition',
        disabled
          ? 'cursor-not-allowed bg-gray-200 text-gray-400'
          : 'bg-[#FFEF64] text-black hover:brightness-95'
      )}
    >
      이 카드로 결제하기
    </button>
  );
};
