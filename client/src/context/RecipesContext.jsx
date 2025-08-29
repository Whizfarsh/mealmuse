/* eslint-disable react/prop-types */
import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
} from "react";

const RecipeContext = createContext();

const initialState = {
	isLoading: true,
	searchQuery: "",
	filterOptions: "Select option",
	selectedFilter: "",
	intoleranceText: "",
	excludeText: "",
	savedRecipes: [],
	recipes: [],
};

function reducer(state, action) {
	switch (action.type) {
		case "recipes/loaded":
			return { ...state, recipes: action.payload };
		case "data/loading":
			return { ...state, isLoading: true };
		case "data/loaded":
			return { ...state, isLoading: false };
		case "savedRecipes/loaded":
			return { ...state, savedRecipes: action.payload };
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
	const [recipe, setRecipe] = useState(null);
	const [tabs, setTabs] = useState("summary");
	const [tabs2, setTabs2] = useState(null);
	const [tabsIndex, setTabsIndex] = useState(0);
	const [similar, setSimilar] = useState([]);
	const [error, setError] = useState("");

	const [
		{
			filterOptions,
			recipes,
			selectedFilter,
			searchQuery,
			isLoading,
			intoleranceText,
			excludeText,
			savedRecipes,
		},
		dispatch,
	] = useReducer(reducer, initialState);

	// function to handle saving recipes
	async function handleSaveRecipe(recipeId) {
		const res = await fetch("/api/v1/users/savedRecipes", {
			method: "PATCH",
			headers: {
				"content-type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({ savedRecipe: recipeId }),
		});

		if (!res.ok) throw new Error("unable to save your recipe");

		const data = await res.json();
		dispatch({
			type: "savedRecipes/loaded",
			payload: data.data,
		});
		// console.log(data.data);
		// const newItem = [...savedRecipes, recipeId];
		// console.log(newItem);
	}

	//EFFECTS
	// effect for recipes
	useEffect(() => {
		dispatch({ type: "data/loading" });
		async function fetchData() {
			const res = await fetch(`/api/v1/recipes`);
			const data = await res.json();

			dispatch({ type: "recipes/loaded", payload: data.data.data });
		}
		fetchData();
		dispatch({ type: "data/loaded" });
	}, []);

	//for saved recipes
	useEffect(() => {
		async function getSavedRecipes() {
			dispatch({ type: "data/loading" });
			const res = await fetch("/api/v1/users/savedRecipes", {
				method: "GET",
				credentials: "include",
			});

			if (!res.ok) throw new Error("No data is loaded");

			const data = await res.json();
			dispatch({
				type: "savedRecipes/loaded",
				payload: data.data.savedRecipes,
			});
		}
		getSavedRecipes();
		dispatch({ type: "data/loaded" });
		// }
	}, []);

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
				tabs,
				setTabs,
				tabs2,
				setTabs2,
				tabsIndex,
				setTabsIndex,
				similar,
				setSimilar,

				savedRecipes,
				handleSaveRecipe,
				// onAddRecipe,
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
