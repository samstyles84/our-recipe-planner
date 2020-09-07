import React, { Component } from "react";
import MealsList from "./MealsList";
import * as api from "../../utils/api";
import Loader from "../Loader";
import ErrorPage from "../ErrorPage";
import { navigate } from "@reach/router";
import { StyledMealsContainer } from "../../styling/styledAllMeals";

class AllMeals extends Component {
  state = {
    meals: [],
    isLoading: true,
    err: null,
  };

  componentDidMount() {
    this.getMeals();
  }

  componentDidUpdate(prevProps, prevState) {
    // this.getMeals();
  }

  getMeals = () => {
    return api
      .fetchMeals()
      .then((meals) => {
        this.setState({
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
          });
        } else {
          navigate(`/error`);
        }
      });
  };

  render() {
    const { meals, err, isLoading } = this.state;
    if (isLoading) return <Loader />;
    if (err) return <ErrorPage {...err} />;
    return (
      <div>
        <StyledMealsContainer>
          <MealsList meals={meals} />
        </StyledMealsContainer>
      </div>
    );
  }
}

export default AllMeals;