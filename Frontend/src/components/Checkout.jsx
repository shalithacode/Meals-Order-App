import { useContext } from "react";
import { CartContext } from "./store/CartContext";
import { UserPrograssContext } from "./store/UserPrograssContext";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import Input from "./UI/Input";
function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserPrograssContext);
  const totalPrice = cartCtx.items.reduce((acc, item) => acc + item.price * item.qty, 0);

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    fetch("http://localhost:8080/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order: { items: cartCtx.items, customer: customerData } }),
    });
  }
  return (
    <Modal open={userProgressCtx.prograss === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Price: {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(totalPrice)}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleClose}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}

export default Checkout;
