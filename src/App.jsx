import { Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import AddCardPage from './pages/AddCardPage';
import CartPage from './pages/CartPage';
import Home from './pages/Home';
import PaymentsPage from './pages/PaymentsPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import ProductDetailPage from './pages/ProductDetailPage';

export default function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/payments/new" element={<AddCardPage />} />
        <Route path="/payments/success" element={<PaymentSuccessPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </RecoilRoot>
  );
}
