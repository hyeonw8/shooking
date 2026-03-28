import { Link, useNavigate } from 'react-router-dom';

import { BuyNowButton } from './BuyNowButton';
import { ToggleToCartButton } from './ToggleToCartButton';

export const ProductCard = ({ id, image, brand, description, price }) => {
  const navigate = useNavigate();

  const handleProceedToPayment = () => {
    navigate('/payments');
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm hover:bg-gray-50">
      <Link to={`/products/${id}`} className="block">
        <div className="aspect-3/2 w-full overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={`${brand} 상품 이미지`}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="px-4 pt-4">
          <h3 className="mt-2 font-semibold">{brand}</h3>
          <p className="text-sm text-gray-600">{description}</p>
          <p className="mt-1">{price.toLocaleString()}원</p>
        </div>
      </Link>
      <div className="flex gap-x-3 px-4 pb-4">
        <ToggleToCartButton
          product={{
            id,
            image,
            brand,
            price,
            quantity: 1,
          }}
        />
        <BuyNowButton onClick={handleProceedToPayment} />
      </div>
    </div>
  );
};
