import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PAYMENTS_ACTIONS } from '../shared/PaymentsReducer';
import { usePaymentsDispatch } from '../shared/usePayments';
import { CardPreview } from './CardPreview';
import { CardNumberInput } from './input/CardNumberInput';
import { CardOwnerInput } from './input/CardOwnerInput';
import { CardPasswordInput } from './input/CardPasswordInput';
import { CvcInput } from './input/CvcInput';
import { ExpiryInput } from './input/ExpiryInput';
import { SubmitButton } from './SubmitButton';

export const AddCardForm = () => {
  const dispatch = usePaymentsDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    cardNumber: '',
    cardOwner: '',
    expiry: '',
    cvc: '',
    passwordPrefix: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateExpiry = (digits) => {
    if (digits.length !== 4) return false;

    const mm = Number(digits.slice(0, 2));
    const yy = Number(digits.slice(2, 4));

    if (Number.isNaN(mm) || Number.isNaN(yy)) return false;
    if (mm < 1 || mm > 12) return false;

    // 과거 만료 체크
    const now = new Date();
    const currentYY = now.getFullYear() % 100;
    const currentMM = now.getMonth() + 1;

    if (yy < currentYY) return false;
    if (yy === currentYY && mm < currentMM) return false;

    return true;
  };

  const isCardNumberValid = /^\d{16}$/.test(form.cardNumber);
  const isCvcValid = /^\d{3}$/.test(form.cvc);
  const isPasswordPrefixValid = /^\d{2}$/.test(form.passwordPrefix);
  const isOwnerValid =
    form.cardOwner.trim().length > 0 && form.cardOwner.length <= 30;

  const isValid =
    isCardNumberValid &&
    validateExpiry(form.expiry) &&
    isOwnerValid &&
    isCvcValid &&
    isPasswordPrefixValid;

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    if (!isValid) return;

    setIsSubmitting(true);

    try {
      const newCard = {
        id: crypto.randomUUID(),
        cardNumber: form.cardNumber,
        cardOwner: form.cardOwner,
        expiry: form.expiry,
        cvc: form.cvc,
        passwordPrefix: form.passwordPrefix,
      };

      dispatch({ type: PAYMENTS_ACTIONS.ADD_CARD, payload: newCard });
      navigate('/payments');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 pt-2">
      <CardPreview
        cardNumber={form.cardNumber}
        cardOwner={form.cardOwner}
        expiry={form.expiry}
      />
      <form onSubmit={handleSubmitForm} className="flex flex-col gap-6 px-7">
        <div className="flex flex-col gap-5">
          <CardNumberInput
            value={form.cardNumber}
            onChange={(value) => handleChange('cardNumber', value)}
          />
          <ExpiryInput
            value={form.expiry}
            onChange={(value) => handleChange('expiry', value)}
          />
          <CardOwnerInput
            value={form.cardOwner}
            onChange={(value) => handleChange('cardOwner', value)}
          />
          <CvcInput
            value={form.cvc}
            onChange={(value) => handleChange('cvc', value)}
          />
          <CardPasswordInput
            value={form.passwordPrefix}
            onChange={(value) => handleChange('passwordPrefix', value)}
          />
        </div>
        <SubmitButton disabled={!isValid || isSubmitting} />
      </form>
    </div>
  );
};
