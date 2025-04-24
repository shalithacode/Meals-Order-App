import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/Cart";
import CartContextProvider from "./components/store/CartContext";
import UserPrograssContextProvider from "./components/store/UserPrograssContext";
import Checkout from "./components/Checkout";
function App() {
  return (
    <CartContextProvider>
      <UserPrograssContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </UserPrograssContextProvider>
    </CartContextProvider>
  );
}

export default App;
