import React, { Component } from "react";
import { navigate } from "@reach/router";
import Loader from "../Loader";
import ErrorPage from "../ErrorPage";

import * as api from "../../utils/api";

class ShoppingList extends Component {
  state = {
    shoppinglist: [],
    isLoading: true,
    err: null,
  };

  componentDidMount() {
    const { mealBarIDs, mealBarNames, mealBarPortions } = this.props;
    let mealIDString = mealBarIDs.join(",");
    mealIDString = "meals=" + mealIDString;

    console.log("mounting shopping list", mealIDString);
    this.getShoppingList(mealIDString);
  }

  getShoppingList = (mealIDString) => {
    return api
      .fetchShoppingList(mealIDString)
      .then(({ data: { shoppinglist } }) => {
        console.log(shoppinglist);
        this.setState({
          shoppinglist: shoppinglist,
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
    const { shoppinglist, err, isLoading } = this.state;
    if (isLoading) return <Loader />;
    if (err) return <ErrorPage {...err} />;
    return (
      <div>
        <h3>Ingredients</h3>
        <ul>
          {shoppinglist.ingredients.map((item) => {
            return (
              <li key={item.name}>
                {item.name}, {item.type}, {item.quantity},{item.units}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ShoppingList;
