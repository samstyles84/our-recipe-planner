import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://our-recipe-planner.herokuapp.com/api",
  timeout: 3000,
});

export const fetchMeals = () => {
  return axiosInstance.get("/meals").then((meals) => {
    return meals.data.meals;
  });
};

export const fetchMeal = (meal_id) => {
  console.log(meal_id);
  return axiosInstance.get(`/meals/${meal_id}`).then((meal) => {
    console.log(meal);
    return meal.data.meal;
  });
};

export const fetchUser = (username) => {
  return axiosInstance.get(`/users/${username}`);
};
