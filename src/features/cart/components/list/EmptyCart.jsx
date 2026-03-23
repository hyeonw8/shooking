import { useNavigate } from 'react-router-dom';

export const EmptyCart = () => {
  const navigate = useNavigate();

  const handleMoveToProducts = () => {
    navigate('/');
  };

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="py-3">
        <span className="text-4xl">🛒</span>
      </div>

      <h2 className="text-lg font-semibold text-black">장바구니가 비었어요!</h2>

      <p className="mt-1 text-sm leading-6 text-gray-600">
        원하는 상품을 장바구니에 담아 보세요.
      </p>

      <button
        type="button"
        onClick={handleMoveToProducts}
        className="mt-14 rounded-full bg-black px-7 py-3 text-sm font-semibold text-white transition hover:opacity-80"
      >
        상품 보러가기
      </button>
    </section>
  );
};
