export const CardItem = ({ id, cardNumber, cardOwner, expiry }) => {
  const getDisplayCardNumber = (cardNumber) => {
    const head = cardNumber.slice(0, 8);
    const tail = cardNumber.slice(8);
    const masked = head + '*'.repeat(tail.length);

    // 4자리 단위로 공백 삽입
    return masked.match(/.{1,4}/g)?.join(' ') ?? '';
  };

  return (
    <div
      aria-label={`${id} 카드`}
      className="relative flex h-40 w-[280px] flex-col justify-between rounded-lg bg-[#333333] p-5"
    >
      {/* 카드 칩 */}
      <div className="absolute top-[50px] left-5 h-[30px] w-12 rounded-md bg-[#CBBA64]" />

      {/* 카드 번호 */}
      <div className="mt-[70px]">
        <p className="text-md tracking-widest text-white">
          {getDisplayCardNumber(cardNumber)}
        </p>
      </div>

      {/* 하단 정보 */}
      <div className="flex justify-between text-sm text-gray-300">
        <p>{cardOwner}</p>
        <p>{`${expiry.slice(0, 2)}/${expiry.slice(2)}`}</p>
      </div>
    </div>
  );
};
