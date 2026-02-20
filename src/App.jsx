import { Route, Routes } from 'react-router-dom';

import { CartProvider } from './features/cart/CartProvider';
import AddCardPage from './pages/AddCardPage';
import Home from './pages/Home';
import MyCardsPage from './pages/MyCardsPage';

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payments" element={<MyCardsPage />} />
        <Route path="/payments/new" element={<AddCardPage />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
