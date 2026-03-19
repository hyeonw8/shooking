import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      aria-label="뒤로가기"
      className="flex items-center justify-center text-white"
    >
      <IoChevronBack size={24} />
    </button>
  );
};
