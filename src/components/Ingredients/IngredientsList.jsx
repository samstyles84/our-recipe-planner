import React, { Component } from "react";
import { StyledIngredientTable } from "../../styling/styledIngredients";

import * as api from "../../utils/api";

class IngredientsList extends Component {
  state = {
    ingredients: this.props.ingredients,
    newIngredient: {},
  };

  componentDidMount() {
    console.log("mounting");
    console.log(this.state);
    // const { ingredients } = this.props;
    // this.setState({ ingredients: ingredients });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.ingredients !== prevState.ingredients) {
      console.log("updating");
    }
  }

  handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();

    const { loggedInUser } = this.props;
    const newIngredient = {
      name: this.state.newIngredient.name,
      type: this.state.newIngredient.type,
      units: this.state.newIngredient.units,
    };

    api.postIngredient(newIngredient).then((newIngredient) => {
      console.log(newIngredient.data);
      // this.props.addComment(newComment);
    });

    this.setState((currentState) => {
      console.log(this.state.ingredients, "setstate");
      console.log(newIngredient.data);
      return {
        ingredients: [...currentState.ingredients, currentState.newIngredient],
        newIngredient: { name: "", type: "", units: "" },
      };
    });
  };

  handleChange = (changeEvent) => {
    const value = changeEvent.target.value;
    const id = changeEvent.target.id;
    const newIngredient = { ...this.state.newIngredient, [id]: value };
    this.setState(() => {
      return { newIngredient: newIngredient };
    });
  };

  render() {
    console.log("rendering");
    const { ingredients } = this.state;
    console.log(this.state.newIngredient, "new ingredient");
    return (
      <ul>
        <h3>Ingredients</h3>
        <StyledIngredientTable>
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Type</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ingredient) => {
              return (
                <tr key={ingredient.ingredient_id}>
                  <td>{ingredient.name}</td>
                  <td>{ingredient.type}</td>
                  <td>{ingredient.units}</td>
                </tr>
              );
            })}
            <tr>
              <td>
                <input
                  type="text"
                  id="name"
                  name="name"
                  size="20"
                  value={this.state.newIngredient.name}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="type"
                  name="type"
                  size="20"
                  value={this.state.newIngredient.type}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="units"
                  name="units"
                  size="7"
                  value={this.state.newIngredient.units}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
          </tbody>
        </StyledIngredientTable>
        <button onClick={this.handleSubmit}>Add</button>
      </ul>
    );
  }
}

export default IngredientsList;
