import React from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import { useContext } from "react";
import { CartContext } from "./store/CartContext";
import { UserPrograssContext } from "./store/UserPrograssContext";

function Header() {
  const cartCtx = useContext(CartContext);
  const userPrograssCtx = useContext(UserPrograssContext);

  function handleShowCart() {
    userPrograssCtx.showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="Food logo" />
        <h1>Food Hub</h1>
      </div>
      <nav>
        <Button onClick={handleShowCart} textOnly>
          Cart ({cartCtx.items.reduce((acc, item) => acc + item.qty, 0)})
        </Button>
      </nav>
    </header>
  );
}

export default Header;
