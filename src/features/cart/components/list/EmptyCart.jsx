import { useNavigate } from "react-router-dom";

export const EmptyCart = () => {
  const navigate = useNavigate();

  const handleMoveToProducts = () => {
    navigate('/');
  };

  return (
    <section>
      <div className="">
        <span className="text-3xl">🛒</span>
      </div>

      <h2 className="text-lg font-semibold text-black">장바구니가 비었어요!</h2>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        원하는 상품을 장바구니에 담아 보세요.
      </p>

      <button
        type="button"
        onClick={handleMoveToProducts}
        className="mt-8 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition"
      >
        상품 보러가기
      </button>
    </section>
  );
};
