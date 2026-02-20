import { FiChevronLeft } from 'react-icons/fi';
import { FiX } from 'react-icons/fi';

export const PaymentsHeader = ({ title, variant, onBack, onClose }) => {
  const showBack = variant === 'add';

  return (
    <header className="sticky top-0 z-50 flex h-[60px] items-center justify-between bg-white px-6 py-10">
      {/* 왼쪽: add면 [뒤로가기 + 제목], list면 [제목만] */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {showBack && (
          <button
            type="button"
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100"
            aria-label="뒤로가기"
          >
            <FiChevronLeft size={22} />
          </button>
        )}
        <h1 className="truncate text-lg">{title}</h1>
      </div>
      {/* 오른쪽: 닫기 */}
      <button
        type="button"
        onClick={onClose}
        className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100"
        aria-label="닫기"
      >
        <FiX size={22} />
      </button>
    </header>
  );
};
