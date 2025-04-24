import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/Cart";
import CartContextProvider from "./components/store/CartContext";
import UserPrograssContextProvider from "./components/store/UserPrograssContext";
function App() {
  return (
    <CartContextProvider>
      <UserPrograssContextProvider>
        <Header />
        <Meals />
        <Cart />
      </UserPrograssContextProvider>
    </CartContextProvider>
  );
}

export default App;
