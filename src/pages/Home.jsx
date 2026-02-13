import { Header } from "../components/Header";
import { ProductList } from "../features/product/ProductList";
import { ProductListHeader } from "../features/product/ProductListHeader";

function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 pt-4 pb-8">
        <ProductListHeader />
        <ProductList />
      </main>
    </>
  );
}

export default Home;
