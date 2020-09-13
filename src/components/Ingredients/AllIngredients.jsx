import React, { Component } from "react";
import IngredientsList from "./IngredientsList";
import * as api from "../../utils/api";
import Loader from "../Loader";
import ErrorPage from "../ErrorPage";
import { navigate } from "@reach/router";
import { StyledIngredientsContainer } from "../../styling/styledIngredients";

class AllIngredients extends Component {
  state = {
    ingredients: [],
    isLoading: true,
    err: null,
  };

  componentDidMount() {
    this.getIngredients();
  }

  componentDidUpdate(prevProps, prevState) {
    // this.getMeals();
  }

  getIngredients = () => {
    return api
      .fetchIngredients()
      .then((ingredients) => {
        this.setState({
          ingredients,
          isLoading: false,
          err: null,
        });
      })
      .catch(({ response }) => {
        if (response) {
          this.setState({
            isLoading: false,
            err: { msg: response.data.msg, status: response.status },
          });
        } else {
          navigate(`/error`);
        }
      });
  };

  render() {
    const { ingredients, err, isLoading } = this.state;
    if (isLoading) return <Loader />;
    if (err) return <ErrorPage {...err} />;
    return (
      <div>
        <StyledIngredientsContainer>
          <IngredientsList
            ingredients={ingredients}
            loggedInUser={this.props.loggedInUser}
          />
        </StyledIngredientsContainer>
      </div>
    );
  }
}

export default AllIngredients;
