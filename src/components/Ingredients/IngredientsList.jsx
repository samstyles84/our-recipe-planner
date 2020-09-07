import React from "react";
import { StyledIngredientCard } from "../../styling/styledIngredients";

const IngredientsList = ({ ingredients }) => {
  return (
    <ul>
      <h3>Ingredients</h3>
      {ingredients.map((ingredient) => {
        return (
          <StyledIngredientCard key={ingredient.ingredient_id}>
            <h3>{ingredient.name}</h3>
            <h4>Type: {ingredient.type}</h4>
            <h4>Units: {ingredient.units}</h4>
          </StyledIngredientCard>
        );
      })}
    </ul>
  );
};

export default IngredientsList;
