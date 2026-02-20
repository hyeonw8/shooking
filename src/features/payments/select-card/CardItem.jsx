export const CardItem = ({ id, cardNumber, cardHolderName, expiryDate }) => {
  return (
    <div
      aria-label={`${id} 카드`}
      className="relative flex h-40 w-[280px] flex-col justify-between rounded-lg bg-[#333333] p-5"
    >
      {/* 카드 칩 */}
      <div className="absolute top-[50px] left-5 h-[30px] w-12 rounded-md bg-[#CBBA64]" />

      {/* 카드 번호 */}
      <div className="mt-[70px]">
        <p className="text-md tracking-widest text-white">{cardNumber}</p>
      </div>

      {/* 하단 정보 */}
      <div className="flex justify-between text-sm text-gray-300">
        <p>{cardHolderName}</p>
        <p>{expiryDate}</p>
      </div>
    </div>
  );
};
