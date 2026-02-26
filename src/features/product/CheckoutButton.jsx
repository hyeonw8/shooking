// 실제 구매로 이어지는 거라면, product 정보도 함께 가지고 넘겨야 함

import { useNavigate } from "react-router-dom";

export const CheckoutButton = () => {
  const navigate = useNavigate();

  const handleProceedToPayment = () => {
    navigate('/payments');
  };

  return (
    <button

      onClick={handleProceedToPayment}
      className="mt-3 inline-flex w-14 items-center justify-center cursor-pointer rounded-full bg-amber-200 py-1 text-sm font-semibold text-black transition"
    >
      구매
    </button>
  );
};
