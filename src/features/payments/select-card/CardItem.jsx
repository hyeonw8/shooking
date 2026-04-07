import clsx from 'clsx';

import {
  formatExpiryPreview,
  formatMaskedCardNumber,
} from '../utils/cardFormat';
import { PayWithThisCardButton } from './PayWithThisCardButton';

export const CardItem = ({
  cardNumber,
  cardOwner,
  expiry,
  isSelected,
  onClick,
  showPayButton,
  onProceedPayment,
  disabled,
}) => {
  return (
    <div className="flex w-[280px] flex-col items-center gap-y-2">
      <button
        type="button"
        onClick={onClick}
        aria-label={`${cardOwner ?? '등록된'} 카드 선택`}
        className={clsx(
          'relative flex h-40 w-[280px] cursor-pointer flex-col justify-between rounded-lg p-5 text-left transition',
          isSelected
            ? 'bg-[#333333] ring-5 ring-[#ffe601]'
            : 'bg-[#333333] hover:brightness-110'
        )}
      >
        <div className="absolute top-[50px] left-5 h-[30px] w-12 rounded-md bg-[#CBBA64]" />

        <div className="mt-[70px]">
          <p className="text-md tracking-widest text-white">
            {formatMaskedCardNumber(cardNumber)}
          </p>
        </div>

        <div className="flex justify-between text-sm text-gray-300">
          <p>{cardOwner ?? ''}</p>
          <p>{formatExpiryPreview(expiry)}</p>
        </div>
      </button>

      {showPayButton && (
        <PayWithThisCardButton disabled={disabled} onClick={onProceedPayment} />
      )}
    </div>
  );
};
