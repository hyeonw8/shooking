import { useNavigate } from 'react-router-dom';

import { usePaymentActions } from '../hooks/usePaymentActions';
import { CardPreview } from './CardPreview';
import { useAddCardForm } from './hooks/useAddCardForm';
import { CardNumberInput } from './input/CardNumberInput';
import { CardOwnerInput } from './input/CardOwnerInput';
import { CardPasswordInput } from './input/CardPasswordInput';
import { CvcInput } from './input/CvcInput';
import { ExpiryInput } from './input/ExpiryInput';
import { SubmitButton } from './SubmitButton';

export const AddCardForm = () => {
  const navigate = useNavigate();

  const { form, isSubmitting, isValid, handleChange, setIsSubmitting } =
    useAddCardForm();
  const { handleAddCard } = usePaymentActions();

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (isSubmitting || !isValid) return;

    setIsSubmitting(true);

    try {
      const newCard = {
        id: crypto.randomUUID(),
        cardNumber: form.cardNumber,
        cardOwner: form.cardOwner,
        expiry: form.expiry,
      };

      const isAdded = handleAddCard(newCard);

      if (!isAdded) {
        alert('이미 등록된 카드입니다.');
        return;
      }

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
      <form onSubmit={handleSubmitForm} className="flex flex-col gap-6 px-2">
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
