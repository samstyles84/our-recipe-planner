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

class App extends Component {
  state = {
    loggedInUser: null,
  };

  loginUser = (loggedInUser) => {
    this.setState((currentState) => {
      return { loggedInUser: loggedInUser };
    });
  };

  render() {
    return (
      <div>
        <GlobalStyle />
        <Header />
        <Nav />
        <LoginForm loginUser={this.loginUser} />
        <Router>
          <Homepage path="/" />
          <AllMeals path="/meals" />
          <Meal path="/meals/:meal_id" loggedInUser={this.state.loggedInUser} />
          <ErrorPage path="/error" status={408} msg={"Server not responding"} />
          <ErrorPage default status={404} msg={"Path not found"} />
        </Router>
      </div>
    );
  }
}

export default App;
