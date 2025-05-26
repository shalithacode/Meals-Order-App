import { useContext } from "react";
import { CartContext } from "./store/CartContext";
import { UserPrograssContext } from "./store/UserPrograssContext";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import Input from "./UI/Input";
import Error from "../components/Error";
import useHttp from "../hooks/useHttp";

const URL = "http://localhost:8080/orders";

const config = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserPrograssContext);
  const totalPrice = cartCtx.items.reduce((acc, item) => acc + item.price * item.qty, 0);

  const { sendRequest, isLoading, error, data, clearData } = useHttp(URL, config);

  function handleClose() {
    userProgressCtx.hideCheckout();
  }
  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.RemoveAll();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest({ order: { items: cartCtx.items, customer: customerData } });
  }

  if (data && !error) {
    return (
      <Modal open={userProgressCtx.prograss === "checkout"} onClose={handleFinish}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>We will get back to you with more details via email within the next few minutes.</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
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
        {error && <Error title="Failed to send data" message={error} />}
        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleClose} disabled={isLoading}>
            Close
          </Button>
          <Button disabled={isLoading}>{isLoading ? "Submiting..." : "Submit Order"}</Button>
        </p>
      </form>
    </Modal>
  );
}

export default Checkout;
