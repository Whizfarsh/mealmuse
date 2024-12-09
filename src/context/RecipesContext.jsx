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
	recipes: [],
};

function reducer(state, action) {
	switch (action.type) {
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
	const [tabs1, setTabs1] = useState("summary");
	const [tabs2, setTabs2] = useState("similarRecipes");
	const [similar, setSimilar] = useState([]);
	const [error, setError] = useState("");

	const [favorites, setFavorites] = useState(() => {
		try {
			const savedFavorites = localStorage.getItem("favorites");
			return savedFavorites ? JSON.parse(savedFavorites) : [];
		} catch {
			return [];
		}
	});

	useEffect(() => {
		try {
			localStorage.setItem("favorites", JSON.stringify(favorites));
		} catch (error) {
			console.error("Failed to save favorites to localStorage:", error);
		}
	}, [favorites]);

	useEffect(() => {
		function syncFavoritesFromStorage() {
			const savedFavorites = localStorage.getItem("favorites");
			if (savedFavorites) {
				setFavorites(JSON.parse(savedFavorites));
			}
		}

		// Sync on mount
		syncFavoritesFromStorage();

		// Listen for storage changes
		window.addEventListener("storage", syncFavoritesFromStorage);

		// Cleanup
		return () =>
			window.removeEventListener("storage", syncFavoritesFromStorage);
	}, []);

	function addFavorite(recipe) {
		if (!favorites.some((item) => item.id === recipe.id)) {
			const updatedFavorites = [...favorites, recipe];
			setFavorites(updatedFavorites);
		}
	}

	function handleFavoriteDelete(id) {
		const updatedFavorites = favorites.filter((recipe) => recipe.id !== id);
		setFavorites(updatedFavorites);
	}

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

				favorites,
				setFavorites,
				addFavorite,
				handleFavoriteDelete,
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

export { RecipesProvider, useRecipes };
