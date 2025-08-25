/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const IngredientsContexts = createContext();

function IngredientsProvider({ children }) {
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
