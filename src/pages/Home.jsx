import { Header } from '../components/Header';
import { PageHeaderInfo } from '../components/PageHeaderInfo';
import { ProductList } from '../features/product/ProductList';
import { mockProducts } from '../mocks/product';

export default function Home() {
  const totalCount = mockProducts.length;

  return (
    <>
      <Header variant="home" />
      <main className="mx-auto max-w-6xl px-5 pt-4 pb-8">
        <PageHeaderInfo
          title="신발 상품 목록"
          description={`현재 ${totalCount}개의 상품이 있습니다.`}
        />
        <ProductList />
      </main>
    </>
  );
}
