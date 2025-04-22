import React from "react";

function MealItem({ meal }) {
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:8080/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name} </h3>
          <p className="meal-item-price">
            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(meal.price)}{" "}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <button>Add to cart</button>
        </p>
      </article>
    </li>
  );
}

export default MealItem;
