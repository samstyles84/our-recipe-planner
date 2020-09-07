import React from "react";
import { Link } from "@reach/router";
import { StyledMealCard } from "../../styling/styledAllMeals";

const MealsList = ({ meals }) => {
  console.log(meals);
  return (
    <ul>
      {meals.map((meal) => {
        return (
          <StyledMealCard key={meal.meal_id}>
            <Link to={`/meals/${meal.meal_id}`}>
              <h3>{meal.name}</h3>
            </Link>
            <h4>Portions: {meal.portions}</h4>
          </StyledMealCard>
        );
      })}
    </ul>
  );
};

export default MealsList;
