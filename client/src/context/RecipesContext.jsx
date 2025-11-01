/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useReducer,
	useState,
} from "react";
import { useUser } from "./UserContext";
import { useFilter } from "./FilterContext";
import { useGlobal } from "./GlobalContext";

const RecipeContext = createContext();

const initialState = {
	errMsg: "",
	isLoading: true,
	searchQuery: "",
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
		case "data/error":
			return { ...state, errMsg: action.payload };
		case "savedRecipes/loaded":
			return { ...state, savedRecipes: action.payload };
		case "searchUpdate":
			return { ...state, searchQuery: action.payload };
		case "dataFetched":
			return {
				...state,
				recipes: action.payload,
				isLoading: false,
			};
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
	const [status, setStatus] = useState("");

	const { isAuthenticated } = useUser();

	const { selectedCuisine, selectedDiet, selectedType, duration, sortby } =
		useFilter();
	const { allDiets, allCusines, allTypes } = useGlobal();

	const fetchData = useCallback(
		async function fetchData() {
			dispatch({ type: "data/loading" });

			const params = new URLSearchParams();

			if (selectedCuisine !== "all") {
				const cuisineValue = allCusines.find(
					(c) => c.name === selectedCuisine.name
				);
				params.append("cuisines", cuisineValue._id);
			}
			if (selectedDiet !== "all") {
				const dietValue = allDiets.find((c) => c.name === selectedDiet.name);
				params.append("diets", dietValue._id);
			}
			if (selectedType !== "all") {
				const typeValue = allTypes.find((c) => c.name == selectedType);
				params.append("types", typeValue._id);
			}
			if (duration !== "all") {
				params.append("cookingDuration[gte]", duration);
			}
			if (sortby !== "none") {
				params.append("sortBy", sortby);
			}

			const urlToUse = `/api/v1/recipes?${params.toString()}`;
			console.log(urlToUse);
			try {
				const res = await fetch(urlToUse);

				if (!res.ok) throw new Error("Unable to fetch new data");
				const data = await res.json();

				dispatch({ type: "recipes/loaded", payload: data.data.data });
				dispatch({ type: "data/loaded" });
			} catch (err) {
				dispatch({ type: "data/error", payload: err.messge });
				console.log(err.messge);
			}
		},
		[
			allCusines,
			allDiets,
			allTypes,
			duration,
			selectedCuisine,
			selectedDiet,
			selectedType,
			sortby,
		]
	);

	const [
		{
			filterOptions,
			recipes,
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
	}

	//
	async function handleSavedRecipeDelete(id) {
		const res = await fetch("/api/v1/users/savedRecipes", {
			method: "DELETE",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ id }),
			credentials: "include",
		});

		const data = (await res.json()) || [];
		dispatch({
			type: "savedRecipes/loaded",
			payload: data.data,
		});
	}

	async function handleAddToRecipes(item) {
		const res = await fetch("/api/v1/recipes", {
			method: "POST",
			credentials: "include",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(item),
		});

		if (!res.ok) setStatus("error");

		const data = await res.json();

		if (data.status === "success") {
			dispatch({ type: "recipes/loaded", payload: [...recipes, data.data] });
			await fetchData();
		}
	}

	//EFFECTS
	// effect for recipes
	useEffect(() => {
		fetchData();
	}, [fetchData]);

	//for saved recipes
	useEffect(() => {
		if (isAuthenticated) {
			async function getSavedRecipes() {
				dispatch({ type: "data/loading" });
				try {
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
				} catch (err) {
					if (err) {
						dispatch({
							type: "savedRecipes/loaded",
							payload: [],
						});
					}
				}
			}
			getSavedRecipes();
			dispatch({ type: "data/loaded" });
		}

		// }
	}, [isAuthenticated]);

	return (
		<RecipeContext.Provider
			value={{
				filterOptions,
				recipes,
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
				status,
				setStatus,

				savedRecipes,
				handleSaveRecipe,
				handleSavedRecipeDelete,
				// onAddRecipe,

				handleAddToRecipes,
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
