export const SubmitButton = ({ disabled = false }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-full rounded-full bg-black py-2 text-lg text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
    >
      작성 완료
    </button>
  );
};
