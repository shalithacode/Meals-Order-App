import Modal from "./UI/Modal";
import Button from "./UI/Button";
import CartItem from "./CartItem";
import { useContext } from "react";
import { CartContext } from "./store/CartContext";
import { UserPrograssContext } from "./store/UserPrograssContext";

function Cart() {
  const cartCtx = useContext(CartContext);
  const userPrograssCtx = useContext(UserPrograssContext);

  function handleHideCart() {
    userPrograssCtx.hideCart();
  }
  function handleShowCheckout() {
    userPrograssCtx.showCheckout();
  }
  const totalPrice = cartCtx.items.reduce((acc, item) => acc + item.price * item.qty, 0);
  return (
    <Modal
      className="cart"
      open={userPrograssCtx.prograss === "cart"}
      onClose={userPrograssCtx.prograss === "cart" ? handleHideCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <p className="cart-total">
        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(totalPrice)}
      </p>
      <p className="modal-actions">
        <Button onClick={handleHideCart}>Close</Button>
        {cartCtx.items.length > 0 && <Button onClick={handleShowCheckout}>Checkout</Button>}
      </p>
    </Modal>
  );
}

export default Cart;
