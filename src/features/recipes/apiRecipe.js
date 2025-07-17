// import { useGlobal } from "../../context/GlobalContext";

import { API_Key } from "../../context/GlobalContext";

// const { API_Key } = useGlobal();
export const recipeBaseUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_Key}`;

const cuisine = [
	"African",
	"Asian",
	"American",
	"British",
	"Cajun",
	"Caribbean",
	"Chinese",
	"Eastern European",
	"European",
	"French",
	"German",
	"Greek",
	"Indian",
	"Irish",
	"Italian",
	"Japanese",
	"Jewish",
	"Korean",
	"Latin American",
	"Mediterranean",
	"Mexican",
	"Middle Eastern",
	"Nordic",
	"Southern",
	"Spanish",
	"Thai",
	"Vietnamese",
];
const dietsList = [
	"Gluten Free",
	"Ketogenic",
	"Lacto-Vegetarian",
	"Ovo-Vegetarian",
	"Pescetarian",
	"Vegan",
	"Vegetarian",
];
const recipeTypesList = [
	"Main Course",
	"Side Dish",
	"Appetizer",
	"Dessert",
	"Salad",
	"Beverage",
	"Breakfast",
	"Brunch",
	"Sauce",
	"Snack",
];

export { cuisine, dietsList, recipeTypesList };
