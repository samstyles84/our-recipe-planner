import React, { Component } from "react";
import * as api from "../../utils/api";
import IngredientsTable from "./IngredientsTable";
import {
  StyledAddMealForm,
  StyledAddMealContainer,
} from "../../styling/styledMeal";

import { Link } from "@reach/router";

class AddMeal extends Component {
  state = {
    newMeal: { name: "", portions: 0, source: "", votes: 0 },
    possibleIngredients: [
      { ingredient_id: 0, name: "", recipesUsed: 0, type: "", units: "" },
    ],
    recipe: [],
    mealAdded: 0,
  };

  componentDidMount() {
    this.getIngredients().then((ingredients) => {
      ingredients.unshift({
        ingredient_id: 0,
        name: "",
        recipesUsed: 0,
        type: "",
        units: "",
      });
      this.setState({ possibleIngredients: ingredients });
    });
  }

  getIngredients = () => {
    return api.fetchIngredients();
  };

  handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();

    const untangledRecipes = this.untangleRecipe(this.state.recipe);

    const newMeal = {
      name: this.state.newMeal.name,
      portions: parseInt(this.state.newMeal.portions),
      votes: 0,
      source: this.state.newMeal.source,
      recipe: untangledRecipes,
    };

    api.postMeal(newMeal).then((meal) => {
      console.log("meal added", meal.data.meal);
      this.setState((currentState) => {
        console.log("meal added", meal.data.meal.meal_id);
        return {
          mealAdded: meal.data.meal.meal_id,
        };
      });

      // this.props.addComment(newComment);
    });
  };

  untangleRecipe = (tangledRecipe) => {
    const { possibleIngredients } = this.state;
    const recipeArr = [];
    tangledRecipe.forEach((item) => {
      const itemNameLong = item.name;
      const itemName = itemNameLong.slice(0, itemNameLong.indexOf("[") - 1);

      const ingredient = possibleIngredients.filter((ingredient) => {
        return ingredient.name === itemName;
      });

      const returnObj = {
        ingredient_id: ingredient[0].ingredient_id,
        quantity: parseInt(item.qty),
      };

      recipeArr.push(returnObj);
    });
    return recipeArr;
  };

  handleChange = (changeEvent) => {
    const value = changeEvent.target.value;
    const id = changeEvent.target.id;
    this.setState(() => {
      return { newMeal: { ...this.state.newMeal, [id]: value } };
    });
  };

  updateIngredients = (newIngredients) => {
    this.setState(() => {
      return { recipe: newIngredients };
    });
  };

  render() {
    console.log("rendering");
    const possibleIngredients = this.state.possibleIngredients;

    const { loggedInUser } = this.props;
    return (
      <StyledAddMealContainer>
        <StyledAddMealForm onSubmit={this.handleSubmit}>
          <br />
          <label htmlFor="name">Meal name:</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={this.handleChange}
          ></input>
          <br />
          <label htmlFor="portions">Portions:</label>
          <input
            type="number"
            name="portions"
            id="portions"
            onChange={this.handleChange}
          ></input>
          <br />
          <label htmlFor="source">Recipe source:</label>
          <input
            type="text"
            name="source"
            id="source"
            onChange={this.handleChange}
          ></input>
          <br />
          <br />
          <IngredientsTable
            ingredientsArray={this.state.possibleIngredients}
            returnRecipe={this.updateIngredients}
          />

          <button
            disabled={
              !loggedInUser ||
              !this.state.newMeal.name ||
              !this.state.newMeal.portions
            }
          >
            Add new meal
          </button>

          <br />
          {this.state.mealAdded > 0 && (
            <Link to={`/meals/${this.state.mealAdded}`}>
              <p>{`Meal ${this.state.mealAdded} added`}</p>
            </Link>
          )}
        </StyledAddMealForm>
      </StyledAddMealContainer>
    );
  }
}

export default AddMeal;
