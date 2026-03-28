import { Link } from 'react-router-dom';

import { Header } from '../components/Header';

export default function PaymentSuccessPage() {
  return (
    <>
      {/* 임시 하드 코딩 적용 */}
      <Header variant="success" />
      <main className="mx-auto flex min-h-[80vh] flex-col items-center justify-center px-5 pt-4 text-center lg:max-w-6xl">
        <h2 className="text-[30px] font-extrabold">결제 완료!</h2>
        <p className="leading-6 break-keep text-gray-600 lg:text-base">
          {`총 ${2}개의 상품을 구매하셨습니다.`}
        </p>
        <div className="mt-6">
          <p className="font-bold">총 결제 금액</p>
          <p className="mt-1 text-2xl font-bold">98,000원</p>
        </div>
        <Link
          to={`/`}
          className="mt-8 flex h-[58px] w-full max-w-[385px] items-center justify-center rounded-[48px] bg-[#FFEF64] text-xl hover:bg-[#f1e472]"
        >
          상품 목록 보기
        </Link>
      </main>
    </>
  );
}
