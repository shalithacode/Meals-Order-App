import { createContext, useState } from "react";

const UserPrograssContext = createContext({
  prograss: "", // cart , checkout
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

function UserPrograssContextProvider({ children }) {
  const [userPrograss, setUserPrograss] = useState();

  function showCart() {
    setUserPrograss("cart");
  }
  function hideCart() {
    setUserPrograss("");
  }
  function showCheckout() {
    setUserPrograss("checkout");
  }
  function hideCheckout() {
    setUserPrograss("");
  }
  const userPrograssContextValue = {
    prograss: userPrograss,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };
  return <UserPrograssContext.Provider value={userPrograssContextValue}> {children}</UserPrograssContext.Provider>;
}

export default UserPrograssContextProvider;
export { UserPrograssContext };
