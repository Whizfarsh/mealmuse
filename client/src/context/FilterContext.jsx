/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FilterContexts = createContext();

const initialState = {
	selectedFilter: "all",
	selectedCuisine: "all",
	selectedDiet: "all",
	selectedType: "all",
	duration: "all",
	sortby: "none",
	exclude: "",
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
		case "exclude/updated":
			return { ...state, exclude: action.payload };
		default:
			throw new Error(`Unknown action`);
	}
}

function FilterProvider({ children }) {
	const navigate = useNavigate();
	const gtetUrlLocation = useLocation();
	const [state, dispatch] = useReducer(reducer, initialState);

	const {
		selectedCuisine,
		selectedDiet,
		selectedType,
		duration,
		exclude,
		sortby,
	} = state;

	useEffect(() => {
		if (gtetUrlLocation.pathname != "/recipes") return;

		const searchParams = new URLSearchParams();

		if (selectedCuisine && selectedCuisine !== "all")
			searchParams.set("cuisines", selectedCuisine.name);

		if (selectedDiet && selectedDiet !== "all")
			searchParams.set("diets", selectedDiet.name);

		if (selectedType && selectedType !== "all")
			searchParams.set("type", selectedType);

		if (duration && duration !== "all") {
			const operator = duration === "60" ? "[gte]" : "[lte]";
			searchParams.set(`cookingDuration${operator}`, duration);
		}
		if (exclude.length > 3 && exclude.length !== "") {
			searchParams.set("exclude", exclude);
		}
		if (sortby && sortby !== "none") searchParams.set("sort", sortby);

		navigate(`/recipes?${searchParams.toString()}`);
	}, [
		selectedCuisine,
		selectedDiet,
		selectedType,
		duration,
		exclude,
		sortby,
		navigate,
		gtetUrlLocation.pathname,
	]);

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
