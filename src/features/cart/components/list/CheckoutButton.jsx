import { useNavigate } from 'react-router-dom';

export const CheckoutButton = ({ disabled = false }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (disabled) return;

    navigate('/payments');
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleCheckout}
      className="max-w-[385px] h-[58px] w-full rounded-[48px] bg-[#FFEF64] text-xl transition-opacity disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-700 disabled:opacity-60"
    >
      결제하기
    </button>
  );
};
