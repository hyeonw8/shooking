export const ProductDetailInfo = ({ brand, description, price}) => {
  return (
    <div>
      <p className="text-2xl font-bold">{brand}</p>
      <p className="mt-1 text-base text-gray-600">{description}</p>
      <p className="mt-1 text-lg">{price.toLocaleString()}원</p>
    </div>
  );
};
