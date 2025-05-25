import React, { useEffect, useState, useMemo } from "react";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
const URL = "http://localhost:8080/meals";
function Meals() {
  const config = useMemo(() => ({ method: "GET" }), []);
  const { data: loadedMeals, isLoading, error } = useHttp(URL, config);

  if (isLoading) return <p className="center">Loading Meals...</p>;
  if (error) return <Error title="Failed to fetch meals." message={error} />;
  return (
    <ul id="meals">
      {loadedMeals &&
        loadedMeals.meals.map((meal) => (
          <MealItem
            key={meal._id}
            meal={{
              id: meal._id,
              name: meal.name,
              price: meal.price,
              image: meal.image,
              description: meal.description,
            }}
          />
        ))}
    </ul>
  );
}

export default Meals;
