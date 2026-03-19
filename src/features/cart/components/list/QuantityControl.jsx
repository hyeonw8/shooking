export const QuantityControl = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <div
      role="group"
      aria-label="수량 조절"
      className="flex items-center gap-[17px]"
    >
      <button
        type="button"
        aria-label="수량 감소"
        onClick={onDecrease}
        className="flex h-6 w-6 items-center justify-center rounded-[10px] bg-[#838383]/20 pb-0.5 leading-none text-[#363636]"
      >
        -
      </button>
      <span className="text-sm font-bold">{quantity}</span>
      <button
        type="button"
        aria-label="수량 증가"
        onClick={onIncrease}
        className="flex h-6 w-6 items-center justify-center rounded-[10px] bg-[#838383]/20 pb-0.5 leading-none text-[#363636]"
      >
        +
      </button>
    </div>
  );
};
