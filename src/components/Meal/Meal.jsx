import React, { Component } from "react";
import * as api from "../../utils/api";
import Loader from "../Loader";
import MealCard from "./MealCard";
import ErrorPage from "../ErrorPage";

class Meal extends Component {
  state = { meal: [], isLoading: true, err: null };

  componentDidMount() {
    console.log("mounted", this.props.meal_id);
    this.getMeal(this.props.meal_id)
      .then((meal) => {
        this.setState({ meal, isLoading: false });
      })
      .catch(({ response }) => {
        this.setState({
          isLoading: false,
          err: { msg: response.data.msg, status: response.status },
        });
      });
  }

  getMeal = (meal_id) => {
    return api.fetchMeal(meal_id);
  };

  render() {
    const { meal, isLoading, err } = this.state;
    if (isLoading) return <Loader />;
    if (err) return <ErrorPage {...err} />;

    return <MealCard meal={meal} loggedInUser={this.props.loggedInUser} />;
  }
}

export default Meal;
