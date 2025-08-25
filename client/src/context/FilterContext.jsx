/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const FilterContexts = createContext();

const initialState = {
	selectedFilter: "all",
	selectedCuisine: "all",
	selectedDiet: "all",
	selectedType: "all",
	duration: "all",
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
						duration: "all",
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
		case "updateDuration":
			return { ...state, duration: action.payload };
		default:
			throw new Error(`Unknown action`);
	}
}

function FilterProvider({ children }) {
	const [
		{ selectedFilter, selectedCuisine, selectedDiet, selectedType, duration },
		dispatch,
	] = useReducer(reducer, initialState);

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

	function handleDurationChange(duration) {
		dispatch({ type: "updateDuration", payload: duration });
	}
	return (
		<FilterContexts.Provider
			value={{
				selectedFilter,
				selectedCuisine,
				selectedDiet,
				selectedType,
				handleFilterChange,
				handleCuisineChange,
				handleDietChange,
				handleTypeChange,
				duration,
				handleDurationChange,
			}}
		>
			{children}
		</FilterContexts.Provider>
	);
}

function useFilter() {
	const context = useContext(FilterContexts);

	if (context === "undefined")
		throw new Error("No context provided for your query");

	return context;
}

export { FilterProvider, useFilter };
