import { FiPlus } from 'react-icons/fi';

export const AddCardCTA = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-40 w-[280px] cursor-pointer items-center justify-center rounded-lg bg-[#E5E5E5] text-gray-700 transition hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
      aria-label="카드 추가"
    >
      <FiPlus size={32} />
    </button>
  );
};
