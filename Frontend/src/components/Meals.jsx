import React, { useEffect, useState } from "react";
import MealItem from "./MealItem";

function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8080/meals");

      if (!response.ok) {
        //...
      }
      const data = await response.json();
      setLoadedMeals(data.meals);
    })();
  }, []);

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem
          key={meal._id}
          meal={{ name: meal.name, price: meal.price, image: meal.image, description: meal.description }}
        />
      ))}
    </ul>
  );
}

export default Meals;
