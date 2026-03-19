import { Route, Routes } from 'react-router-dom';

import { PaymentsProvider } from './features/payments/shared/PaymentsProvider';
import AddCardPage from './pages/AddCardPage';
import Home from './pages/Home';
import MyCardsPage from './pages/MyCardsPage';
import { RecoilRoot } from 'recoil';
import CartPage from './pages/CartPage';

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
