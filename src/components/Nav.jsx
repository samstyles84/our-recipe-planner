import React, { Component } from "react";
import { Link } from "@reach/router";
import { StyledNav, StyledNavButton } from "../styling/styledGlobal";

class Nav extends Component {
  state = { err: null };

  render() {
    return (
      <StyledNav>
        <Link to="/">
          <StyledNavButton>Home</StyledNavButton>
        </Link>
        <Link to="/meals">
          <StyledNavButton>Meals</StyledNavButton>
        </Link>
        <Link to="/ingredients">
          <StyledNavButton>Ingredients</StyledNavButton>
        </Link>
        <Link to="/shoppinglist">
          <StyledNavButton>Shopping List</StyledNavButton>
        </Link>
        <br />
      </StyledNav>
    );
  }
}

export default Nav;
