export const formatExpiryInput = (digits = '') => {
  const raw = String(digits).replace(/\D/g, '').slice(0, 4);

  const mm = raw.slice(0, 2);
  const yy = raw.slice(2, 4);

  if (raw.length <= 2) return mm;
  return `${mm} / ${yy}`;
};

export const formatExpiryPreview = (digits = '') => {
  const raw = String(digits).replace(/\D/g, '').slice(0, 4);

  const mm = raw.slice(0, 2) || 'MM';
  const yy = raw.slice(2, 4) || 'YY';

  return `${mm} / ${yy}`;
};

export const formatMaskedCardNumber = (digits = '') => {
  const raw = String(digits).replace(/\D/g, '').slice(0, 16);

  if (!raw) return '';

  const head = raw.slice(0, 8);
  const tail = raw.slice(8);
  const masked = head + '*'.repeat(tail.length);

  return masked.match(/.{1,4}/g)?.join(' ') ?? ''; // 4자리 단위로 공백 삽입
};
