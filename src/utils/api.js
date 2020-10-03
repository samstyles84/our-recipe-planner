import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://our-recipe-planner.herokuapp.com/api",
  timeout: 10000,
});

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:9090/api",
//   timeout: 10000,
// });

export const fetchMeals = () => {
  return axiosInstance.get("/meals").then((meals) => {
    return meals.data.meals;
  });
};

export const fetchMealsByIngredientId = (ingredient_id) => {
  console.log("fetching meals", ingredient_id);
  return axiosInstance
    .get(`/ingredients/recipes/${ingredient_id}`)
    .then((meals) => {
      console.log(meals, "meals");
      return meals.data.meals;
    });
};

export const fetchMeal = (meal_id) => {
  return axiosInstance.get(`/meals/${meal_id}`).then((meal) => {
    return meal.data.meal;
  });
};

export const fetchIngredients = () => {
  return axiosInstance.get("/ingredients/recipes").then((ingredients) => {
    return ingredients.data.ingredients;
  });
};

export const fetchIngredientById = (ingredient_id) => {
  return axiosInstance
    .get(`/ingredients/${ingredient_id}`)
    .then((ingredients) => {
      return ingredients.data.ingredients;
    });
};

export const fetchUser = (username) => {
  return axiosInstance.get(`/users/${username}`);
};

export const postMeal = (newMeal) => {
  console.log(newMeal, "in the api");

  //return axiosInstance.post(`/meals`, data);

  return axios({
    method: "post",
    url: "https://our-recipe-planner.herokuapp.com/api/meals",
    data: newMeal,
  }).catch((error) =>
    console.log(error.response, error.request, error.message)
  );
};

export const postIngredient = (newIngredient) => {
  return axiosInstance.post(`/ingredients`, newIngredient);
};

export const patchIngredient = (ingredient) => {
  const { ingredient_id } = ingredient;
  delete ingredient.ingredient_id;
  return axiosInstance.patch(`/ingredients/${ingredient_id}`, ingredient);
};

export const deleteIngredient = (ingredient_id) => {
  return axiosInstance.delete(`/ingredients/${ingredient_id}`);
};

export const deleteMeal = (meal_id) => {
  return axiosInstance.delete(`/meals/${meal_id}`);
};

export const addPhoto = (meal_id, photoData) => {
  console.log(meal_id, photoData, "posting");
  return axios({
    method: "post",
    url: `https://our-recipe-planner.herokuapp.com/api/meals/${meal_id}`,
    data: photoData,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const fetchShoppingList = (mealIDs) => {
  return axiosInstance.get(`/ingredients/shoppinglist?${mealIDs}`);
};
