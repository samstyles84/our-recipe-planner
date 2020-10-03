import React, { Component } from "react";
import * as api from "../utils/api";
import { StyledMealBar } from "../styling/styledGlobal";

class MealBar extends Component {
  state = {
    meals: [],
    mealNames: [],
    mealPortions: [],
    isLoading: true,
    err: null,
  };

  componentDidMount() {
    console.log("mealbar mounting");

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
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("mealbar updating");

    if (this.props.mealBarIDs.length !== prevProps.mealBarIDs.length) {
      //the update has been triggered from elsewhere
      if (this.props.mealBarIDs.length > this.state.meals.length) {
        //a meal has been added
        this.setState({
          isLoading: false,
          meals: [...this.props.mealBarIDs],
          mealNames: [...this.props.mealBarNames],
          mealPortions: [...this.props.mealBarPortions],
        });
      }
    } else {
      //the update has been triggered here
      if (this.state.meals !== prevState.meals) {
        this.props.removeMealFromList(
          this.state.meals,
          this.state.mealNames,
          this.state.mealPortions
        );
      }
    }
  }

  render() {
    const { loggedInUser } = this.props;
    const mealIDs = this.state.meals;
    const mealBarNames = this.state.mealNames;
    const mealBarPortions = this.state.mealPortions;
    console.log(this.state, "mealbar render");

    return (
      <StyledMealBar>
        {loggedInUser ? (
          <section>
            Meal planner:
            {mealBarNames && (
              <ul>
                {mealBarNames.map((mealBarName, index) => {
                  return (
                    <li key={mealBarName + index}>
                      {" "}
                      {mealBarName} ({mealBarPortions[index]})
                      <button
                        onClick={() => {
                          const revisedIDs = [...mealIDs];
                          const revisedNames = [...mealBarNames];
                          const revisedPortions = [...mealBarPortions];
                          revisedIDs.splice(index, 1);
                          revisedNames.splice(index, 1);
                          revisedPortions.splice(index, 1);

                          this.setState({
                            meals: revisedIDs,
                            mealNames: revisedNames,
                            mealPortions: revisedPortions,
                          });
                        }}
                      >
                        Remove
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        ) : (
          <section>Please log in</section>
        )}
      </StyledMealBar>
    );
  }
}

export default MealBar;
