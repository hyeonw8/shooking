import { Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { PaymentsProvider } from './features/payments/shared/PaymentsProvider';
import AddCardPage from './pages/AddCardPage';
import CartPage from './pages/CartPage';
import Home from './pages/Home';
import MyCardsPage from './pages/MyCardsPage';

export default function App() {
  return (
    <RecoilRoot>
      <PaymentsProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/payments" element={<MyCardsPage />} />
          <Route path="/payments/new" element={<AddCardPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </PaymentsProvider>
    </RecoilRoot>
  );
}
