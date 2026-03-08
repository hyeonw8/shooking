import { CardItem } from './CardItem';
import { PayWithThisCardButton } from './PayWithThisCardButton';

export const CardList = ({ cards }) => {
  if (!cards?.length) return null;

  const handleClick = () => {
    alert('결제 요청 완료!');
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center gap-y-3">
        {<CardItem {...cards[0]} />}
        <PayWithThisCardButton onClick={handleClick} />
      </div>
    </div>
  );
};
