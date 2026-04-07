import { FiChevronLeft } from 'react-icons/fi';
import { FiX } from 'react-icons/fi';

export const PaymentsHeader = ({ title, variant, onBack, onClose }) => {
  const showBack = variant === 'add' && typeof onBack === 'function';

  return (
    <header className="sticky top-0 z-50 flex h-[69px] items-center justify-between px-5">
      {/* 왼쪽: add면 [뒤로가기 + 제목], list면 [제목만] */}
      <div className="flex min-w-0 flex-1 items-center">
        <div
          className={`flex ${showBack ? 'w-8' : 'w-3'} h-8 shrink-0 items-center justify-center`}
        >
          {showBack && (
            <button
              type="button"
              onClick={onBack}
              className="hover:bg-gray-100 flex h-8 w-8 cursor-pointer items-center justify-center text-gray-600"
              aria-label="뒤로가기"
            >
              <FiChevronLeft size={26} />
            </button>
          )}
        </div>

        <h1 className="truncate pl-2 text-[18px] font-medium text-gray-700">
          {title}
        </h1>
      </div>
      {/* 오른쪽: 닫기 */}
      <button
        type="button"
        onClick={onClose}
        className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full transition hover:bg-gray-100"
        aria-label="닫기"
      >
        <FiX size={22} />
      </button>
    </header>
  );
};
