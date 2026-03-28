import { Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { PaymentsProvider } from './features/payments/shared/PaymentsProvider';
import AddCardPage from './pages/AddCardPage';
import CartPage from './pages/CartPage';
import Home from './pages/Home';
import MyCardsPage from './pages/MyCardsPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import ProductDetailPage from './pages/ProductDetailPage';

export default function App() {
  return (
    <RecoilRoot>
      <PaymentsProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/payments" element={<MyCardsPage />} />
          <Route path="/payments/new" element={<AddCardPage />} />
          <Route path="/payments/success" element={<PaymentSuccessPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
        </Routes>
      </PaymentsProvider>
    </RecoilRoot>
  );
}
