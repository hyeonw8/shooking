import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      aria-label="뒤로가기"
      className="flex h-10 w-10 cursor-pointer items-center justify-start text-white"
    >
      <IoArrowBack size={28} />
    </button>
  );
};
