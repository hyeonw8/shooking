import { CardItem } from './CardItem';
import { PayWithThisCardButton } from './PayWithThisCardButton';

export const CardList = ({ cards }) => {
  return (
    <div className="flex justify-center">
      {/* {cards.map((card) => (
        <CardItem {...card} />
      ))} */}
      <div className="flex flex-col justify-center gap-y-3">
        {<CardItem {...cards[0]} />}
        <PayWithThisCardButton />
      </div>
    </div>
  );
};
