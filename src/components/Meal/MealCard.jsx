import React from "react";
import {
  StyledMealContainer,
  StyledSingleMeal,
} from "../../styling/styledMeal";
import { navigate, Link } from "@reach/router";

import * as api from "../../utils/api";
import ImageAdder from "./ImageAdder";

const MealCard = (args) => {
  const { meal, loggedInUser } = args;
  const { recipe } = meal;
  console.log(meal);

  return (
    <StyledMealContainer>
      <StyledSingleMeal>
        <h2>{meal.name}</h2>

        {meal.imgURL === "" ? (
          <ImageAdder meal_id={meal.meal_id} loggedInUser={loggedInUser} />
        ) : (
          <img src={meal.imgURL} alt={meal.name} width="128" height="128" />
        )}

        <h4>
          Portions: {meal.portions}{" "}
          {meal.source.slice(0, 4) === "http" ? (
            <span>
              Source:{" "}
              <a href={meal.source} target="_blank" rel="noopener noreferrer">
                Link
              </a>
            </span>
          ) : (
            <span>Source: {meal.source}</span>
          )}
        </h4>

        <ul>
          {recipe.map((ingredient) => {
            return (
              <li key={ingredient.ingredient_id}>
                <Link to={`/ingredients/${ingredient.ingredient_id}`}>
                  {ingredient.name}
                </Link>
                : {ingredient.quantity} {ingredient.units}
              </li>
            );
          })}
        </ul>
        <button disabled={!loggedInUser}>Amend meal</button>
        <button
          disabled={!loggedInUser}
          onClick={() => {
            api.deleteMeal(meal.meal_id).then(() => {
              navigate(`/meals`);
            });
          }}
        >
          Delete meal
        </button>
        {meal.imgURL !== "" ? (
          <button disabled={!loggedInUser}>Remove picture</button>
        ) : null}
      </StyledSingleMeal>
      <br />
    </StyledMealContainer>
  );
};

export default MealCard;
