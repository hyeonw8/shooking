import Home from "./pages/Home";
import { CartProvider } from "./features/cart/CartProvider";

function App() {
  return (
    <CartProvider>
      <Home />
    </CartProvider>
  );
}

export default App;
