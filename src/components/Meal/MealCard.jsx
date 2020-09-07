import React from "react";
import {
  StyledMealContainer,
  StyledSingleMeal,
} from "../../styling/styledMeal";

const MealCard = (args) => {
  const { meal } = args;
  const { recipe } = meal;
  console.log(args);

  return (
    <StyledMealContainer>
      <StyledSingleMeal>
        <h2>{meal.name}</h2>
        <h4>Portions: {meal.portions}</h4>
        <ul>
          {recipe.map((ingredient) => {
            return (
              <li key={ingredient.ingredient_id}>
                {ingredient.name}: {ingredient.quantity} {ingredient.units}
              </li>
            );
          })}
        </ul>
      </StyledSingleMeal>
      <br />
    </StyledMealContainer>
  );
};

export default MealCard;
