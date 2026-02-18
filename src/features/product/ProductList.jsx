import { useCallback, useEffect, useRef, useState } from 'react';
import { mockProducts } from '../../mocks/product';
import { ProductCard } from './ProductCard';

const PER_PAGE = 10;

const Spinner = () => (
  <div className="flex justify-center py-4">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
  </div>
);

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  // 무한스크롤 제어용 ref
  const loaderRef = useRef(null);
  const pageRef = useRef(1);
  const loadingRef = useRef(false); // 동기 중복 차단용

  const fetchMoreProduct = useCallback(async () => {
    // 중복 호출/종료 조건 방어
    if (loadingRef.current || !hasMore || error) return;

    const page = pageRef.current;
    const start = (page - 1) * PER_PAGE;
    const end = page * PER_PAGE;

    // 데이터 끝
    if (start >= mockProducts.length) {
      setHasMore(false);
      return;
    }

    loadingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      // 나중에 API로 바꿀 걸 대비해서 async 구조
      await new Promise((res) => setTimeout(res, 300));

      const nextProducts = mockProducts.slice(start, end);

      setProducts((prev) => [...prev, ...nextProducts]);
      pageRef.current = page + 1;

      // 다음 페이지가 없으면 종료
      if (end >= mockProducts.length) {
        setHasMore(false);
      }
    } catch (e) {
      console.error('상품 로딩 실패:', e);
      setError('상품을 불러오지 못했어요. 다시 시도해주세요.');
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [hasMore, error]);

  useEffect(() => {
    fetchMoreProduct();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = loaderRef.current; // 관찰 대상 고정
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchMoreProduct();
        }
      },
      {
        root: null,
        rootMargin: '0px 0px 300px 0px',
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchMoreProduct]);

  const handleRetry = () => {
    fetchMoreProduct();
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((item) => (
          <ProductCard {...item} key={item.id} />
        ))}
      </div>

      {/* 더 불러올 게 있을 때만 관찰 타겟 유지 */}
      {hasMore && !error && (
        <div ref={loaderRef} className="h-10" aria-hidden="true" />
      )}

      {loading && <Spinner />}

      {error && (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-lg border p-4 text-sm">
          <p className="text-red-600">{error}</p>
          <button
            onClick={handleRetry}
            className="rounded-md bg-black px-4 py-2 text-white"
          >
            다시 시도
          </button>
        </div>
      )}
    </>
  );
};
