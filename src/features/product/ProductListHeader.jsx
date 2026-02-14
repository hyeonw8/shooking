export const ProductListHeader = ({totalCount}) => {
  return (
    <div className="flex flex-col gap-y-1 py-5">
      <h1 className="text-3xl font-bold">신발 상품 목록</h1>
      <p className="text-md">현재 {totalCount}개의 상품이 있습니다.</p>
    </div>
  );
};
