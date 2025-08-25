/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
} from "react";
// import { useGlobal } from "./GlobalContext";

const RecipeContext = createContext();

const initialState = {
	isLoading: true,
	searchQuery: "",
	filterOptions: "Select option",
	selectedFilter: "",
	intoleranceText: "",
	excludeText: "",
	recipes: [],
};

function reducer(state, action) {
	switch (action.type) {
		case "data/loaded":
			return { ...state, recipe: action.payload };
		case "searchUpdate":
			return { ...state, searchQuery: action.payload };
		case "filterOptionUpdate":
			return { ...state, filterOptions: action.payload };
		case "dataFetched":
			return {
				...state,
				recipes: action.payload,
				isLoading: false,
			};
		case "updateElectedFilter":
			return { ...state, selectedFilter: action.payload };
		default:
			throw new Error("No action found");
	}
}

function RecipesProvider({ children }) {
	// const { API_Key } = useGlobal();

	const [recipe, setRecipe] = useState(null);
	const [tabs1, setTabs1] = useState("summary");
	const [tabs2, setTabs2] = useState("similarRecipes");
	const [similar, setSimilar] = useState([]);
	const [error, setError] = useState("");

	// const [favorites, setFavorites] = useState(() => {
	// 	try {
	// 		const savedFavorites = localStorage.getItem("favorites");
	// 		return savedFavorites ? JSON.parse(savedFavorites) : [];
	// 	} catch {
	// 		return [];
	// 	}
	// });
	// const [localRecipes, setLocalRecipes] = useState(() => {
	// 	try {
	// 		const savedRecipes = localStorage.getItem("recipes");
	// 		return savedRecipes ? JSON.parse(savedRecipes) : [];
	// 	} catch {
	// 		return [];
	// 	}
	// });

	// effect for recipes
	useEffect(() => {
		fetch(`/api/v1/recipes`)
			.then((res) => res.json())
			// .then((data) => setLocalRecipes(data.results));
			.then((data) => dispatch({ type: "data/loaded", payload: data }));
	}, []);
	// useEffect(() => {
	// 	if (!localRecipes || localRecipes.length === 0) {
	// 		// fetch(
	// 		// 	`https://api.spoonacular.com/recipes/complexSearch?number=50&addRecipeInformation=true&apiKey=${API_Key}`
	// 		// )
	// 		fetch(`/api/v1/recipes`)
	// 			.then((res) => res.json())
	// 			// .then((data) => setLocalRecipes(data.results));
	// 			.then((data) => dispatch({ type: "data/loaded", payload: data }));
	// 	}
	// }, [API_Key]);

	// useEffect(() => {
	// 	localStorage.setItem("localRecipes", JSON.stringify(localRecipes));
	// }, [localRecipes]);

	// effect for favorites
	// useEffect(() => {
	// 	try {
	// 		localStorage.setItem("favorites", JSON.stringify(favorites));
	// 	} catch (error) {
	// 		console.error("Failed to save favorites to localStorage:", error);
	// 	}
	// }, [favorites]);

	// useEffect(() => {
	// 	function syncFavoritesFromStorage() {
	// 		const savedFavorites = localStorage.getItem("favorites");
	// 		if (savedFavorites) {
	// 			setFavorites(JSON.parse(savedFavorites));
	// 		}
	// 	}

	// 	// Sync on mount
	// 	syncFavoritesFromStorage();

	// 	// Listen for storage changes
	// 	window.addEventListener("storage", syncFavoritesFromStorage);

	// 	// Cleanup
	// 	return () =>
	// 		window.removeEventListener("storage", syncFavoritesFromStorage);
	// }, []);

	// function addFavorite(recipe) {
	// 	if (!favorites.some((item) => item.id === recipe.id)) {
	// 		const updatedFavorites = [...favorites, recipe];
	// 		setFavorites(updatedFavorites);
	// 	}
	// }

	// function handleFavoriteDelete(id) {
	// 	const updatedFavorites = favorites.filter((recipe) => recipe.id !== id);
	// 	setFavorites(updatedFavorites);
	// }

	const [
		{
			filterOptions,
			recipes,
			selectedFilter,
			searchQuery,
			isLoading,
			intoleranceText,
			excludeText,
		},
		dispatch,
	] = useReducer(reducer, initialState);

	return (
		<RecipeContext.Provider
			value={{
				filterOptions,
				recipes,
				selectedFilter,
				searchQuery,
				isLoading,
				intoleranceText,
				excludeText,
				dispatch,

				recipe,
				setRecipe,
				error,
				setError,
				tabs1,
				setTabs1,
				tabs2,
				setTabs2,
				similar,
				setSimilar,

				// favorites,
				// setFavorites,
				// addFavorite,
				// handleFavoriteDelete,

				// localRecipes,
			}}
		>
			{children}
		</RecipeContext.Provider>
	);
}

function useRecipes() {
	const context = useContext(RecipeContext);
	if (context === undefined) {
		throw new Error(
			"Recipe context is being used outside of the provider, please take a look at it"
		);
	}
	return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { RecipesProvider, useRecipes };
