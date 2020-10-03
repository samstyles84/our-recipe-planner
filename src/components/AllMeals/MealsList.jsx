import { Link } from "@reach/router";
import { StyledMealCard } from "../../styling/styledAllMeals";

import React, { Component } from "react";

class MealsList extends Component {
  state = {
    meals: [],
    mealNames: [],
    mealPortions: [],
    isLoading: true,
    err: null,
  };

  componentDidMount() {
    console.log("meallist mounting");

    if (sessionStorage.getItem("mealIDs")) {
      this.setState({
        isLoading: false,
        meals: JSON.parse(sessionStorage.getItem("mealIDs")),
        mealNames: JSON.parse(sessionStorage.getItem("mealNames")),
        mealPortions: JSON.parse(sessionStorage.getItem("mealPortions")),
      });
    } else {
      this.setState({
        isLoading: false,
      });
    }
    console.log(this.state, "mealslist mounting");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.mealPortions, "this.state.mealPortions");
    if (this.props.mealBarIDs.length === prevProps.mealBarIDs.length) {
      //the update hasn;t been triggered from elsewhere
      if (this.state.meals.length > prevState.meals.length) {
        // A meal has been added in the meals list
        console.log("A meal has been added");
        this.props.addMealToList(
          this.state.meals,
          this.state.mealNames,
          this.state.mealPortions
        );
      }
    } else {
      //the update has been triggered from elsewhere
      if (this.props.mealBarIDs.length < this.state.meals.length) {
        //a meal has been removed
        console.log("A meal has been removed");
        this.setState({
          isLoading: false,
          meals: this.props.mealBarIDs,
          mealNames: this.props.mealBarNames,
          mealPortions: this.props.mealBarPortions,
        });
      }
    }
  }

  render() {
    const { meals, loggedInUser } = this.props;
    return (
      <ul>
        {meals.map((meal) => {
          return (
            <StyledMealCard key={meal.meal_id}>
              <Link to={`/meals/${meal.meal_id}`}>
                <h3>{meal.name}</h3>
              </Link>
              <h4>Portions: {meal.portions}</h4>
              <button
                disabled={!loggedInUser}
                onClick={() => {
                  this.setState({
                    meals: [...this.state.meals, meal.meal_id],
                    mealNames: [...this.state.mealNames, meal.name],
                    mealPortions: [...this.state.mealPortions, meal.portions],
                  });
                  console.log(this.state);
                }}
              >
                Add to meal list
              </button>
            </StyledMealCard>
          );
        })}
      </ul>
    );
  }
}

export default MealsList;
