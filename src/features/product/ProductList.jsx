import { mockProducts } from '../../mocks/product';
import { ProductCard } from './ProductCard';

export const ProductList = () => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {mockProducts.map((item) => (
        <ProductCard {...item} key={item.id} />
      ))}
    </div>
  );
};
