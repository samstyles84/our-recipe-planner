import Header from "./components/Header";
import { Router } from "@reach/router";
import Homepage from "./components/Homepage";
import Nav from "./components/Nav";
import LoginForm from "./components/LoginForm";
import ErrorPage from "./components/ErrorPage";
import { GlobalStyle } from "./styling/styledGlobal";
import React, { Component } from "react";
import AllMeals from "./components/AllMeals/AllMeals";
import Meal from "./components/Meal/Meal";
import AddMeal from "./components/Meal/AddMeal";
import AllIngredients from "./components/Ingredients/AllIngredients";
import Ingredient from "./components/Ingredients/Ingredient";
import MealBar from "./components/MealBar";
import ShoppingList from "./components/ShoppingList/ShoppingList";

class App extends Component {
  state = {
    loggedInUser: null,
    mealIDs: [],
    mealNames: [],
    mealPortions: [],
  };

  loginUser = (loggedInUser) => {
    this.setState((currentState) => {
      return { loggedInUser: loggedInUser };
    });
  };

  addMealToList = (mealIDs, mealNames, mealPortions) => {
    this.setState((currentState) => {
      return {
        mealIDs: mealIDs,
        mealNames: mealNames,
        mealPortions: mealPortions,
      };
    });
  };

  removeMealFromList = (mealIDs, mealNames, mealPortions) => {
    this.setState((currentState) => {
      return {
        mealIDs: mealIDs,
        mealNames: mealNames,
        mealPortions: mealPortions,
      };
    });
  };

  render() {
    return (
      <div>
        <GlobalStyle />
        <Header />
        <Nav />
        <LoginForm loginUser={this.loginUser} />
        <MealBar
          loggedInUser={this.state.loggedInUser}
          mealBarIDs={this.state.mealIDs}
          mealBarNames={this.state.mealNames}
          mealBarPortions={this.state.mealPortions}
          removeMealFromList={this.removeMealFromList}
        />
        <Router>
          <Homepage path="/" />
          <AllMeals
            path="/meals"
            loggedInUser={this.state.loggedInUser}
            addMealToList={this.addMealToList}
            mealBarIDs={this.state.mealIDs}
            mealBarNames={this.state.mealNames}
            mealBarPortions={this.state.mealPortions}
          />
          <AllIngredients
            path="/ingredients"
            loggedInUser={this.state.loggedInUser}
          />
          <Ingredient
            path="/ingredients/:ingredient_id"
            loggedInUser={this.state.loggedInUser}
          />
          <ShoppingList
            path="/shoppinglist"
            loggedInUser={this.state.loggedInUser}
            mealBarIDs={this.state.mealIDs}
            mealBarNames={this.state.mealNames}
            mealBarPortions={this.state.mealPortions}
          />
          <AddMeal path="/addmeal" />
          <Meal path="/meals/:meal_id" loggedInUser={this.state.loggedInUser} />
          <ErrorPage path="/error" status={408} msg={"Server not responding"} />
          <ErrorPage default status={404} msg={"Path not found"} />
        </Router>
      </div>
    );
  }
}

export default App;
