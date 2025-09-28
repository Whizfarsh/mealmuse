/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const FilterContexts = createContext();

const initialState = {
	selectedFilter: "all",
	selectedCuisine: "all",
	selectedDiet: "all",
	selectedType: "all",
	duration: "all",
	sortby: "none",
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
		case "updateSort":
			return { ...state, sortby: action.payload };
		default:
			throw new Error(`Unknown action`);
	}
}

function FilterProvider({ children }) {
	const navigate = useNavigate();
	const [state, dispatch] = useReducer(reducer, initialState);

	const { selectedCuisine, selectedDiet, selectedType, duration, sortby } =
		state;

	useEffect(() => {
		const searchParams = new URLSearchParams();

		if (selectedCuisine && selectedCuisine !== "all")
			searchParams.set("cuisines", selectedCuisine.name);

		if (selectedDiet && selectedDiet !== "all")
			searchParams.set("diets", selectedDiet.name);

		if (selectedType && selectedType !== "all")
			searchParams.set("types", selectedType.name);

		if (duration && duration !== "all")
			searchParams.set("cookingDuration[gte]", duration);

		if (sortby && sortby !== "none") searchParams.set("sort", sortby);

		// Use navigate to update the URL with the new search params
		navigate(`/recipes?${searchParams.toString()}`);
	}, [selectedCuisine, selectedDiet, selectedType, duration, sortby, navigate]);

	return (
		<FilterContexts.Provider
			value={{
				...state,
				dispatch,
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
