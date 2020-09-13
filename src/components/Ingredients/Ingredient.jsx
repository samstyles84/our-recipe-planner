import React, { Component } from "react";
import * as api from "../../utils/api";

import { navigate, Link } from "@reach/router";

class Ingredient extends Component {
  state = {
    ingredient: { ingredient_id: "", name: "", type: "", units: "" },
    meals: [],
    isLoading: true,
    err: null,
  };

  componentDidMount() {
    this.fetchIngredientById();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.ingredient_id !== this.props.ingredient_id) {
      this.fetchIngredientById();
    }
  }

  fetchIngredientById = () => {
    const ingredient_id = parseInt(this.props.ingredient_id);
    console.log(this.props, ingredient_id);

    return Promise.all([
      api.fetchIngredientById(ingredient_id),
      api.fetchMealsByIngredientId(ingredient_id),
    ])
      .then((promiseArr) => {
        const ingredient = promiseArr[0];
        const meals = promiseArr[1];
        this.setState({
          ingredient,
          meals,
          isLoading: false,
          err: null,
        });
      })
      .catch(({ response }) => {
        if (response) {
          this.setState({
            isLoading: false,
            err: { msg: response.data.msg, status: response.status },
            ingredient: {
              ingredient_id: ingredient_id,
              name: "",
              type: "",
              units: "",
            },
            meals: [],
          });
        } else {
          navigate(`/error`);
        }
      });
  };

  handleChange = (changeEvent) => {
    const value = changeEvent.target.value;
    const id = changeEvent.target.id;
    const ingredient = { ...this.state.ingredient, [id]: value };
    this.setState(() => {
      return { ingredient: ingredient };
    });
  };

  handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();

    const { loggedInUser } = this.props;
    const { ingredient } = this.state;

    api.patchIngredient(ingredient).then(() => {
      this.setState((currentState) => {});
    });
  };

  render() {
    const { ingredient, meals, err } = this.state;
    console.log(this.state);
    return (
      <div>
        <h4>
          Ingredient: {ingredient.ingredient_id}{" "}
          <Link to={`/ingredients/${ingredient.ingredient_id - 1}`}>
            <button disabled={ingredient.ingredient_id === 1}>-</button>
          </Link>{" "}
          /{" "}
          <Link to={`/ingredients/${ingredient.ingredient_id + 1}`}>
            <button> + </button>
          </Link>
        </h4>
        <h3>
          Name:{" "}
          <input
            type="text"
            id="name"
            defaultValue={ingredient.name}
            onChange={this.handleChange}
            disabled={err}
          />
        </h3>

        <h4>
          Type:{" "}
          <input
            type="text"
            id="type"
            defaultValue={ingredient.type}
            onChange={this.handleChange}
            disabled={err}
          />
        </h4>
        <h4>
          Units:{" "}
          <input
            type="text"
            id="units"
            defaultValue={ingredient.units}
            onChange={this.handleChange}
            disabled={err}
          />
        </h4>
        <h4>
          Used in:{" "}
          {meals.map((meal, index) => {
            return (
              <li key={index}>
                <Link to={`/meals/${meal.meal_id}`}>{meal.name}</Link>
              </li>
            );
          })}
        </h4>

        <button
          onClick={this.handleSubmit}
          disabled={
            ingredient.name === "" ||
            ingredient.type === "" ||
            ingredient.units === "" ||
            !this.props.loggedInUser
          }
        >
          Update ingredient
        </button>
      </div>
    );
  }
}

export default Ingredient;
