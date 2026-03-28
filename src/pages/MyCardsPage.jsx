import { useNavigate } from 'react-router-dom';

import { AddCardCTA } from '../features/payments/select-card/AddCardCTA';
import { CardList } from '../features/payments/select-card/CardList';
import { PaymentsHeader } from '../features/payments/shared/PaymentsHeader';
import { usePaymentsState } from '../features/payments/shared/usePayments';

function MyCardsPage() {
  const navigate = useNavigate();

  const { cards } = usePaymentsState();

  const handleClose = () => {
    navigate('/');
  };

  const handleGoAddCard = () => {
    navigate('/payments/new');
  };

  return (
    <div className="min-h-screen">
      <PaymentsHeader title="보유카드" variant="list" onClose={handleClose} />

      <main className="mx-auto w-full max-w-md px-5">
        {cards.length === 0 ? (
          <section className="flex flex-col items-center pt-6">
            <p className="text-md mb-6 text-center font-medium text-gray-600">
              새로운 카드를 등록해주세요.
            </p>
            <AddCardCTA onClick={handleGoAddCard} />
          </section>
        ) : (
          <section className="pt-6">
            <CardList cards={cards} />
            <div className="mt-[47px] flex justify-center">
              <AddCardCTA onClick={handleGoAddCard} />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default MyCardsPage;
