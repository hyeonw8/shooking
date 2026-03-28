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
    <div className="min-h-screen">
      <PaymentsHeader
        title="카드 추가"
        variant="add"
        onClose={handleClose}
        onBack={handleBack}
      />
      <main className="mx-auto w-full max-w-md px-6 pb-6">
        <AddCardForm />
      </main>
    </div>
  );
}

export default AddCardPage;
