import { useState } from 'react';
import {
  isValidCardNumber,
  isValidCardOwner,
  isValidCvc,
  isValidPasswordPrefix,
  validateExpiry,
} from '../../utils/paymentValidation';

const initialForm = {
  cardNumber: '',
  cardOwner: '',
  expiry: '',
  cvc: '',
  passwordPrefix: '',
};

export const useAddCardForm = () => {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isCardNumberValid = isValidCardNumber(form.cardNumber);
  const isCvcValid = isValidCvc(form.cvc);
  const isPasswordPrefixValid = isValidPasswordPrefix(form.passwordPrefix);
  const isOwnerValid = isValidCardOwner(form.cardOwner);
  const isExpiryValid = validateExpiry(form.expiry);

  const isValid =
    isCardNumberValid &&
    isExpiryValid &&
    isOwnerValid &&
    isCvcValid &&
    isPasswordPrefixValid;

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return {
    form,
    isSubmitting,
    isValid,

    handleChange,
    setIsSubmitting,
  };
};
