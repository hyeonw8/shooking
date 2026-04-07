import { CardItem } from './CardItem';

export const CardList = ({
  cards,
  selectedCardId,
  onSelectCard,
  onProceedPayment,
  hasPaymentOrder,
}) => {
  if (!cards?.length) return null;

  return (
    <div className="mx-auto h-64 w-[310px] overflow-x-auto p-3">
      <div className="flex w-max gap-x-4 px-1">
        {cards.map((card) => (
          <CardItem
            key={card.id}
            {...card}
            isSelected={selectedCardId === card.id}
            onClick={() => onSelectCard(card.id)}
            onProceedPayment={onProceedPayment}
            showPayButton={selectedCardId === card.id}
            disabled={!hasPaymentOrder}
          />
        ))}
      </div>
    </div>
  );
};
