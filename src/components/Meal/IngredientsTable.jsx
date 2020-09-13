import React, { Component } from "react";
import { StyledIngredientsTable } from "../../styling/styledMeal";

//Change var to const!

class Ingredients extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.filterText = "";
    this.state.ingredientsArray = this.props.ingredientsArray;
    this.state.ingredients = [];
  }
  handleUserInput(filterText) {
    this.setState({ filterText: filterText });
  }
  handleRowDel(ingredient) {
    var index = this.state.ingredients.indexOf(ingredient);
    this.state.ingredients.splice(index, 1);
    this.setState(this.state.ingredients);
  }

  handleAddEvent(evt) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var ingredient = {
      id: id,
      name: "",
      qty: 0,
    };
    this.state.ingredients.push(ingredient);
    this.setState(this.state.ingredients);
  }

  handleIngredientTable(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value,
    };
    var ingredients = this.state.ingredients.slice();
    var newIngredients = ingredients.map(function (ingredient) {
      for (var key in ingredient) {
        if (key === item.name && ingredient.id === item.id) {
          ingredient[key] = item.value;
        }
      }
      return ingredient;
    });
    this.props.returnRecipe(newIngredients);
    this.setState({ ingredients: newIngredients });
  }
  render() {
    return (
      <div>
        <IngredientTable
          ingredientsArray={this.props.ingredientsArray}
          onIngredientTableUpdate={this.handleIngredientTable.bind(this)}
          onRowAdd={this.handleAddEvent.bind(this)}
          onRowDel={this.handleRowDel.bind(this)}
          ingredients={this.state.ingredients}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
}

class IngredientTable extends Component {
  render() {
    const ingredientsArray = this.props.ingredientsArray;
    var onIngredientTableUpdate = this.props.onIngredientTableUpdate;
    var rowDel = this.props.onRowDel;
    var filterText = this.props.filterText;
    var ingredient = this.props.ingredients.map(function (ingredient) {
      if (ingredient.name.indexOf(filterText) === -1) {
        return null;
      }
      return (
        <IngredientRow
          ingredientsArray={ingredientsArray}
          onIngredientTableUpdate={onIngredientTableUpdate}
          ingredient={ingredient}
          onDelEvent={rowDel.bind(this)}
          key={ingredient.id}
        />
      );
    });
    return (
      <div>
        {this.props.ingredients.length > 0 && (
          <StyledIngredientsTable>
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Quantity</th>
              </tr>
            </thead>

            <tbody>{ingredient}</tbody>
          </StyledIngredientsTable>
        )}
        <button
          type="button"
          onClick={this.props.onRowAdd}
          className="btn btn-success pull-right"
        >
          + add ingredient
        </button>
      </div>
    );
  }
}

class IngredientRow extends Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.ingredient);
  }
  render() {
    return (
      <tr className="eachRow">
        <IngredientNames
          ingredientsArray={this.props.ingredientsArray}
          onIngredientTableUpdate={this.props.onIngredientTableUpdate}
          cellData={{
            type: "name",
            value: this.props.ingredient.name,
            id: this.props.ingredient.id,
          }}
        />
        <EditableCell
          onIngredientTableUpdate={this.props.onIngredientTableUpdate}
          cellData={{
            type: "qty",
            value: this.props.ingredient.qty,
            id: this.props.ingredient.id,
          }}
        />
        <td className="del-cell">
          <input
            type="button"
            onClick={this.onDelEvent.bind(this)}
            value="X"
            className="del-btn"
          />
        </td>
      </tr>
    );
  }
}
class EditableCell extends Component {
  render() {
    return (
      <td>
        <input
          type="text"
          name={this.props.cellData.type}
          id={this.props.cellData.id}
          value={this.props.cellData.value}
          onChange={this.props.onIngredientTableUpdate}
        />
      </td>
    );
  }
}

class IngredientNames extends Component {
  render() {
    const ingredients = this.props.ingredientsArray;
    return (
      <td>
        <select
          name={this.props.cellData.type}
          id={this.props.cellData.id}
          value={this.props.cellData.value}
          onChange={this.props.onIngredientTableUpdate}
        >
          {ingredients.map((ingredient, index) => {
            if (index === 0) {
              return (
                <option key={ingredient.ingredient_id}>
                  {ingredient.name}
                </option>
              );
            } else {
              return (
                <option key={ingredient.ingredient_id}>
                  {ingredient.name} [{ingredient.units}]
                </option>
              );
            }
          })}
        </select>
      </td>
    );
  }
}

export default Ingredients;

//See https://codepen.io/Shamiul_Hoque/pen/LNavdZ/
