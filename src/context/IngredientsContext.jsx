/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer, useState } from "react";

const IngredientsContexts = createContext();

const initialState = {
	selectedFilter: "",
	selectedCuisine: "",
	selectedDiet: "",
	selectedType: "",
};

function reducer(state, action) {
	switch (action.type) {
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

				dispatch,
				selectedFilter,
				selectedCuisine,
				selectedDiet,
				selectedType,
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

export { IngredientsProvider, useIngredients };
