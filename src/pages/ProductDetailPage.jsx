import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Header } from '../components/Header';
import { QuantityControl } from '../features/cart/components/list/QuantityControl';
import { useCartActions } from '../features/cart/hooks/useCartActions';
import { AddToCartButton } from '../features/product/detail/AddToCartButton';
import { ProductDetailInfo } from '../features/product/detail/ProductDetailInfo';
import { RelatedProducts } from '../features/product/detail/RelatedProducts';
import { mockProducts } from '../mocks/product';

export default function ProductDetailPage() {
  const { id } = useParams();

  const { handleAddItem } = useCartActions();
  const [quantity, setQuantity] = useState(1);

  const product = mockProducts.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <>
        <Header variant="detail" title="상품 상세" />
        <main className="px-4 py-8">
          <p>존재하지 않는 상품입니다.</p>
        </main>
      </>
    );
  }

  const handleAddToCart = () => {
    const newItem = {
      id: product.id,
      image: product.image,
      brand: product.brand,
      price: product.price,
      quantity,
    };

    handleAddItem(newItem);
    alert('장바구니에 상품이 추가되었습니다.');
  };

  const handleIncreaseClick = () => {
    setQuantity((prev) => Math.min(prev + 1, 99));
  };

  const handleDecreaseClick = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const relatedProducts = mockProducts.filter(
    (item) => item.brand === product.brand && item.id !== product.id
  );

  return (
    <>
      <Header variant="detail" />
      <main className="mx-auto flex flex-col px-5 pt-7 pb-6 lg:max-w-6xl">
        <img
          src={product.image}
          alt={`${product.brand} 상품 이미지`}
          className="mx-auto h-[400px] w-full max-w-[381px] shrink-0 rounded-[20px] object-cover"
        />
        <div className="mt-7 flex items-center justify-between px-3">
          <ProductDetailInfo {...product} />
          <QuantityControl
            quantity={quantity}
            onIncrease={handleIncreaseClick}
            onDecrease={handleDecreaseClick}
            disableDecrease={quantity <= 1}
            disableIncrease={quantity >= 99}
          />
        </div>
        <AddToCartButton onClick={handleAddToCart} />
        <RelatedProducts
          brand={product.brand}
          relatedProducts={relatedProducts}
        />
      </main>
    </>
  );
}
