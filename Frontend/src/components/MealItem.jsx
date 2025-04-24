import React from "react";
import Button from "./UI/Button";
import { useContext } from "react";
import { CartContext } from "./store/CartContext";

function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);

  function handleAddToCart() {
    cartCtx.addItem(meal);
  }

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:8080/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name} </h3>
          <p className="meal-item-price">
            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddToCart}>Add to cart</Button>
        </p>
      </article>
    </li>
  );
}

export default MealItem;
