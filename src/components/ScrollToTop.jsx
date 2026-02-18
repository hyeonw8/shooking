import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

export const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const checkScrollTop = () => {
    const shouldBeVisible = window.scrollY > 300;
    setVisible(prev => (prev !== shouldBeVisible ? shouldBeVisible : prev));
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleScroll}
      aria-label="맨 위로 이동"
      className={`fixed right-6 bottom-6 z-50 rounded-full bg-black p-3 text-white shadow-lg transition-opacity duration-300 ${visible ? 'opacity-100' : 'pointer-events-none opacity-0'} hover:bg-gray-500`}
    >
      <FaArrowUp size={20} />
    </button>
  );
};
