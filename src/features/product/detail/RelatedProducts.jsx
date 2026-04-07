import { Link } from 'react-router-dom';

export const RelatedProducts = ({ brand, relatedProducts }) => {
  if (relatedProducts.length === 0) return null;

  return (
    <section className="mt-7">
      <p className="text-[20px] font-bold">관련 상품</p>
      <p className="mt-1 text-base text-gray-600">
        {brand}의 다른 상품을 확인해 보세요.
      </p>
      <div className="mt-2 grid grid-cols-3 justify-items-center gap-2">
        {relatedProducts.map((item) => (
          <Link key={item.id} to={`/products/${item.id}`} className="block">
            <img
              src={item.image}
              alt={`${item.brand} 관련 상품 이미지`}
              className="h-[100px] w-[100px] rounded-[20px] object-cover"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};
