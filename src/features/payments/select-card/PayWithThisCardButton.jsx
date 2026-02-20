export const PayWithThisCardButton = () => {
  const handleClick = () => {
    alert('결제 요청 완료!')
  }
  return (
    <button onClick={handleClick} className="bg-[#FFEF64] h-[40px] w-[280px] text-black text-center text-sm  font-semibold rounded-full">이 카드로 결제하기</button>
  )
}