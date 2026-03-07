import {
  formatExpiryPreview,
  formatMaskedCardNumber,
} from '../utils/cardFormat';

export const CardPreview = ({ cardNumber, cardOwner, expiry }) => {
  return (
    <div
      role="region"
      aria-label="카드 등록 미리보기"
      className="relative mx-auto flex h-40 w-[280px] flex-col justify-between rounded-lg bg-[#333333] p-5"
    >
      <div className="absolute top-[50px] left-5 h-[30px] w-12 rounded-md bg-[#CBBA64]" />

      <div className="mt-[70px]">
        <p className="text-md tracking-widest text-white">
          {formatMaskedCardNumber(cardNumber)}
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 text-sm text-gray-300">
        <p className="min-w-0 flex-1 truncate">
          {cardOwner?.trim() ? cardOwner : 'NAME'}
        </p>
        <p className="shrink-0">{formatExpiryPreview(expiry)}</p>
      </div>
    </div>
  );
};
