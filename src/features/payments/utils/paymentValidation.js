export const validateExpiry = (digits = '') => {
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

export const isValidCardNumber = (digits = '') => /^\d{16}$/.test(digits);

export const isValidCvc = (digits = '') => /^\d{3}$/.test(digits);

export const isValidPasswordPrefix = (digits = '') => /^\d{2}$/.test(digits);

export const isValidCardOwner = (name = '') =>
  name.trim().length > 0 && name.length <= 30;
