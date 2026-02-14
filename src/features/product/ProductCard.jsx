import { ToggleToCartButton } from './ToggleToCartButton';

export const ProductCard = ({ id, image, brand, description, price }) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm hover:bg-gray-50">
      <div className="aspect-3/2 w-full overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={`${brand} 상품 이미지`}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="mt-2 font-semibold">{brand}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="mt-1">{price.toLocaleString()}원</p>
        <ToggleToCartButton id={id} />
      </div>
    </div>
  );
};
