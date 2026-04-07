import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { usePaymentActions } from '../features/payments/hooks/usePaymentActions';
import { AddCardCTA } from '../features/payments/select-card/AddCardCTA';
import { CardList } from '../features/payments/select-card/CardList';
import { PaymentsHeader } from '../features/payments/shared/PaymentsHeader';
import {
  cardsState,
  paymentOrderState,
  selectedCardIdState,
} from '../features/payments/state/paymentState';

function PaymentsPage() {
  const navigate = useNavigate();

  const myCards = useRecoilValue(cardsState);
  const selectedCardId = useRecoilValue(selectedCardIdState);
  const paymentOrder = useRecoilValue(paymentOrderState);

  const { handleSelectCard } = usePaymentActions();

  const handleClose = () => {
    navigate('/');
  };

  const handleGoAddCard = () => {
    navigate('/payments/new');
  };

  const handleProceedPayment = () => {
    if (!selectedCardId || !paymentOrder) return;

    navigate('/payments/success');
  };

  return (
    <div className="min-h-screen">
      <PaymentsHeader title="보유카드" variant="list" onClose={handleClose} />

      <main className="mx-auto w-full max-w-md px-5">
        {myCards.length === 0 ? (
          <section className="flex flex-col items-center pt-6">
            <p className="text-md mb-6 text-center font-medium text-gray-600">
              새로운 카드를 등록해주세요.
            </p>
            <AddCardCTA onClick={handleGoAddCard} />
          </section>
        ) : (
          <section className="pt-6">
            <CardList
              cards={myCards}
              selectedCardId={selectedCardId}
              onSelectCard={handleSelectCard}
              onProceedPayment={handleProceedPayment}
              hasPaymentOrder={!!paymentOrder}
            />

            <div className="mt-[47px] flex justify-center">
              <AddCardCTA onClick={handleGoAddCard} />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default PaymentsPage;
