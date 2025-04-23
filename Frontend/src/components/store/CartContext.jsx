/* eslint-disable no-unused-vars */
import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});
function cartReducer(state, action) {
  if (action.type === "ADD") {
    const exsistingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
    const updatedItems = [...state.items];

    if (exsistingCartItemIndex > -1) {
      updatedItems[exsistingCartItemIndex].qty++;
      console.log(exsistingCartItemIndex);
    } else {
      updatedItems.push({ ...action.item, qty: 1 });
      console.log("new");
    }
    return { ...state, items: updatedItems };
  }
  if (action.type === "REMOVE") {
    const exsistingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
    const updatedItems = [...state.items];

    if (exsistingCartItemIndex > -1) {
      if (state.items[exsistingCartItemIndex].qty > 1) {
        updatedItems[exsistingCartItemIndex].qty--;
      } else if (state.items[exsistingCartItemIndex].qty === 1) {
        updatedItems.splice(exsistingCartItemIndex, 1);
      }
    } else {
      return state;
    }
    return { ...state, items: updatedItems };
  }
  return state;
}
function CartContextProvider({ children }) {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: "ADD", item });
  }
  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE", id });
  }

  const cartContextValue = { items: cartState.items, addItem, removeItem };

  return <CartContext.Provider value={cartContextValue}>{children}</CartContext.Provider>;
}
export { CartContext };
export default CartContextProvider;
