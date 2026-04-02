import clsx from 'clsx';

export const PayWithThisCardButton = ({ disabled, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'mt-2 h-[40px] w-full rounded-full text-sm font-semibold transition',
        disabled
          ? 'cursor-not-allowed bg-gray-200 text-gray-400'
          : 'bg-[#FFEF64] text-black hover:brightness-95'
      )}
    >
      이 카드로 결제하기
    </button>
  );
};
