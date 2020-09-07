import React, { Component } from "react";
import * as api from "../../utils/api";
import IngredientsTable from "./IngredientsTable";
import {
  StyledAddMealForm,
  StyledAddMealContainer,
} from "../../styling/styledMeal";

class AddMeal extends Component {
  state = {
    newMeal: {},
    ingredients: [{ ingredient_id: 0, name: "", quantity: 0 }],
  };

  componentDidMount() {
    this.getIngredients().then((ingredients) => {
      this.setState({ ingredients: ingredients });
    });
  }

  getIngredients = () => {
    return api.fetchIngredients();
  };

  handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();

    const { loggedInUser } = this.props;
    const newMeal = {
      name: this.state.newMeal.name,
      portions: this.state.newMeal.portions,
    };

    api.postMeal(newMeal).then((newMeal) => {
      // this.props.addComment(newComment);
    });

    this.setState((currentState) => {
      return {
        body: "",
      };
    });
  };

  handleChange = (changeEvent) => {
    const value = changeEvent.target.value;
    const id = changeEvent.target.id;
    this.setState(() => {
      return { newMeal: { [id]: value } };
    });
  };

  render() {
    console.log("rendering");
    const ingredients = this.state.ingredients;
    console.log(ingredients);
    return (
      <StyledAddMealContainer>
        <StyledAddMealForm onSubmit={this.handleSubmit}>
          <br />
          <label htmlFor="name">Meal name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={this.state.name}
            onChange={this.handleChange}
          ></input>
          <label htmlFor="portions">Portions:</label>
          <input
            type="number"
            name="portions"
            id="portions"
            value={this.state.portions}
            onChange={this.handleChange}
          ></input>
          <br />
          <br />

          {this.state.ingredients.length > 0 && (
            <IngredientsTable ingredientsArray={this.state.ingredients} />
          )}

          <button disabled={!this.props.loggedInUser || !this.state.name}>
            Add new meal
          </button>

          <br />
        </StyledAddMealForm>
      </StyledAddMealContainer>
    );
  }
}

export default AddMeal;
