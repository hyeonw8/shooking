export const CardPreview = ({ cardNumber, cardOwner, expiry }) => {
  const formatExpiry = (digits) => {
    const raw = String(digits ?? '')
      .replace(/\D/g, '')
      .slice(0, 4);

    const mm = raw.slice(0, 2) || 'MM';
    const yy = raw.slice(2, 4) || 'YY';

    return `${mm} / ${yy}`;
  };

  const maskCardNumberForPreview = (digits) => {
    const raw = String(digits ?? '')
      .replace(/\D/g, '')
      .slice(0, 16);

    if (!raw) return '';

    const head = raw.slice(0, 8);
    const tail = raw.slice(8);
    const masked = head + '*'.repeat(tail.length);

    return masked.match(/.{1,4}/g)?.join(' ')
  };

  return (
    <div
      aria-label="카드 등록 미리보기"
      className="relative mx-auto flex h-40 w-[280px] flex-col justify-between rounded-lg bg-[#333333] p-5"
    >
      <div className="absolute top-[50px] left-5 h-[30px] w-12 rounded-md bg-[#CBBA64]" />

      <div className="mt-[70px]">
        <p className="text-md tracking-widest text-white">
          {maskCardNumberForPreview(cardNumber)}
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 text-sm text-gray-300">
        <p className="min-w-0 flex-1 truncate">
          {cardOwner?.trim() ? cardOwner : 'NAME'}
        </p>
        <p className="shrink-0">{formatExpiry(expiry)}</p>
      </div>
    </div>
  );
};
