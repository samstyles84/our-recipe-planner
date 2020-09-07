import React, { Component } from "react";
import { StyledIngredientTable } from "../../styling/styledIngredients";

import * as api from "../../utils/api";

class IngredientsList extends Component {
  state = {
    ingredients: [],
    newIngredient: {},
  };

  componentDidMount() {
    const { ingredients } = this.props;
    this.setState({ ingredients: ingredients });
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
      console.log(newIngredient);
      // this.props.addComment(newComment);
    });

    this.setState((currentState) => {
      return {
        newIngredient: "",
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
    const { ingredients } = this.props;
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
                  onChange={this.handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="type"
                  name="type"
                  size="20"
                  onChange={this.handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="units"
                  name="units"
                  size="7"
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
