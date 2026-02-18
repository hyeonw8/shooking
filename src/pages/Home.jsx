import { Header } from '../components/Header';
import { ScrollToTop } from '../components/ScrollToTop';
import { ProductList } from '../features/product/ProductList';
import { ProductListHeader } from '../features/product/ProductListHeader';
import { mockProducts } from '../mocks/product';

function Home() {
  const totalCount = mockProducts.length;

  return (
    <>
      <Header />
      <ScrollToTop /> 
      <main className="mx-auto max-w-6xl px-4 pt-4 pb-8">
        <ProductListHeader totalCount={totalCount} />
        <ProductList />
      </main>
    </>
  );
}

export default Home;
