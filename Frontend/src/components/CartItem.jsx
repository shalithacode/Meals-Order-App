import React, { useContext } from "react";
import { CartContext } from "./store/CartContext";

function CartItem({ item }) {
  const cartCtx = useContext(CartContext);

  return (
    <li className="cart-item">
      <p>
        {item.name} -{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item.price)} x{" "}
        {item.qty}
      </p>
      <p className="cart-item-actions">
        <button onClick={() => cartCtx.removeItem(item.id)}>-</button>
        <span>{item.qty}</span>
        <button onClick={() => cartCtx.addItem(item)}>+</button>
      </p>
    </li>
  );
}

export default CartItem;
