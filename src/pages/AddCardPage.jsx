import { useNavigate } from 'react-router-dom';

import { AddCardForm } from '../features/payments/register-card/AddCardForm';
import { PaymentsHeader } from '../features/payments/shared/PaymentsHeader';

function AddCardPage() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  const handleBack = () => {
    navigate('/payments');
  };

  return (
    <>
      <main className="min-h-screen">
        <PaymentsHeader
          title="카드추가"
          variant="add"
          onClose={handleClose}
          onBack={handleBack}
        />
        <AddCardForm />
      </main>
    </>
  );
}

export default AddCardPage;
