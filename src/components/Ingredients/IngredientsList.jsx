import React, { Component } from "react";

import { Link } from "@reach/router";
import { StyledIngredientTable } from "../../styling/styledIngredients";

import * as api from "../../utils/api";

class IngredientsList extends Component {
  state = {
    ingredients: this.props.ingredients,
    newIngredient: { name: "", type: "", units: "" },
  };

  componentDidMount() {
    console.log("mounting");
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

    const newIngredient = {
      name: this.state.newIngredient.name,
      type: this.state.newIngredient.type,
      units: this.state.newIngredient.units,
    };

    api.postIngredient(newIngredient).then(() => {
      api.fetchIngredients().then((ingredients) => {
        this.setState((currentState) => {
          return {
            ingredients: ingredients,
            newIngredient: { name: "", type: "", units: "" },
          };
        });
      });
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

  removeIngredient = (target) => {
    const ingredient_id = target.target.id;
    api.deleteIngredient(ingredient_id).then(() => {
      api.fetchIngredients().then((ingredients) => {
        this.setState((currentState) => {
          return { ingredients: ingredients };
        });
      });
    });
  };

  render() {
    console.log("rendering");
    const { ingredients, newIngredient } = this.state;
    const { loggedInUser } = this.props;
    let isNewIngredient = true;
    return (
      <ul>
        <h3>Ingredients</h3>
        <StyledIngredientTable>
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Type</th>
              <th>Units</th>
              <th>Used recipes</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ingredient) => {
              if (ingredient.name === newIngredient.name)
                isNewIngredient = false;
              return (
                <tr key={ingredient.ingredient_id}>
                  <td>
                    <Link to={`/ingredients/${ingredient.ingredient_id}`}>
                      {ingredient.name}
                    </Link>
                  </td>

                  <td>{ingredient.type}</td>
                  <td>{ingredient.units}</td>
                  {ingredient.recipesUsed > 0 ? (
                    <td>{ingredient.recipesUsed}</td>
                  ) : (
                    <td>
                      <button
                        onClick={this.removeIngredient}
                        key={ingredient.ingredient_id}
                        id={ingredient.ingredient_id}
                        disabled={!loggedInUser}
                      >
                        x
                      </button>
                    </td>
                  )}
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
              <td>
                <button
                  onClick={this.handleSubmit}
                  disabled={
                    !(
                      isNewIngredient &&
                      newIngredient.name &&
                      newIngredient.type &&
                      newIngredient.units &&
                      loggedInUser
                    )
                  }
                >
                  +
                </button>
              </td>
            </tr>
          </tbody>
        </StyledIngredientTable>
      </ul>
    );
  }
}

export default IngredientsList;
