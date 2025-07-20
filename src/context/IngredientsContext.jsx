/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer, useState } from "react";

const IngredientsContexts = createContext();

const initialState = {
	selectedFilter: "all",
	selectedCuisine: "all",
	selectedDiet: "all",
	selectedType: "all",
};

function reducer(state, action) {
	switch (action.type) {
		case "updateSelectedFilter":
			return action.payload === "all"
				? {
						...state,
						selectedFilter: "all",
						selectedCuisine: "all",
						selectedDiet: "all",
						selectedType: "all",
				  }
				: {
						...state,
						selectedFilter: action.payload,
				  };
		case "updateSelectedCuisine":
			return { ...state, selectedCuisine: action.payload };
		case "updateSelectedDiet":
			return { ...state, selectedDiet: action.payload };
		case "updateSelectedType":
			return { ...state, selectedType: action.payload };
		default:
			throw new Error(`Unknown action`);
	}
}

function IngredientsProvider({ children }) {
	const [
		{ selectedFilter, selectedCuisine, selectedDiet, selectedType },
		dispatch,
	] = useReducer(reducer, initialState);
	const [ingredientQuery, setIngredientQuery] = useState("");
	const [ingredientsLists, setIngredientsLists] = useState([]);
	const [addedIng, setAddedIng] = useState([]);
	const [recipeResults, setRecipeResults] = useState([]);

	const [showAdded, setShowAdded] = useState(false);

	const ingredients = addedIng
		.map((ing, index) => (index === 0 ? ing : `+${ing}`))
		.join(", ");

	function handleShowAdded() {
		setShowAdded((show) => !show);

		console.log(showAdded);
	}

	// functions for filters
	function handleFilterChange(filter) {
		dispatch({ type: "updateSelectedFilter", payload: filter });
	}

	function handleCuisineChange(cuisine) {
		dispatch({ type: "updateSelectedCuisine", payload: cuisine });
	}

	function handleDietChange(diet) {
		dispatch({ type: "updateSelectedDiet", payload: diet });
	}

	function handleTypeChange(type) {
		dispatch({ type: "updateSelectedType", payload: type });
	}

	return (
		<IngredientsContexts.Provider
			value={{
				ingredientQuery,
				setIngredientQuery,
				ingredientsLists,
				setIngredientsLists,
				setAddedIng,
				recipeResults,
				setRecipeResults,
				ingredients,
				addedIng,
				showAdded,
				setShowAdded,
				handleShowAdded,

				// dispatch,
				selectedFilter,
				selectedCuisine,
				selectedDiet,
				selectedType,
				handleFilterChange,
				handleCuisineChange,
				handleDietChange,
				handleTypeChange,
			}}
		>
			{children}
		</IngredientsContexts.Provider>
	);
}

function useIngredients() {
	const context = useContext(IngredientsContexts);

	if (context === undefined)
		throw new Error(
			"You are using the ingredients context outside the provider, please check again"
		);

	return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { IngredientsProvider, useIngredients };
