import React from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="Food logo" />
        <h1>Food Hub</h1>
      </div>
      <nav>
        <Button textOnly>Cart (0)</Button>
      </nav>
    </header>
  );
}

export default Header;
