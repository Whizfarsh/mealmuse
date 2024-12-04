// import { useGlobal } from "../../context/GlobalContext";

import { API_Key } from "../../context/GlobalContext";

// const { API_Key } = useGlobal();
export const recipeBaseUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_Key}`;
