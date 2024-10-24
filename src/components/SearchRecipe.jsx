import { useState } from "react";
import { useRecipes } from "../context/RecipesContext";
import FilterOptions from "./FilterOptions";
import Searchform from "./Searchform";
import styles from "./SearchRecipe.module.css";

const filterObj = [
	{
		Name: "diet",
		options: [
			"Whole30",
			"Low FODMAP",
			"Primal",
			"Paleo",
			"Pescetarian",
			"Vegan",
			"Ovo-Vegetarian",
			"Lacto-Vegetarian",
			"Vegetarian",
			"Ketogenic",
			"Gluten Free",
		],
	},
	{
		Name: "Cuisine",
		options: [
			"African",
			"Asian",
			"American",
			"British",
			"Cajun",
			"Caribbean",
			"Chinese",
			"Eastern European",
			"European",
			"French",
			"German",
			"Greek",
			"Indian",
			"Irish",
			"Italian",
			"Japanese",
			"Jewish",
			"Korean",
			"Latin American",
			"Mediterranean",
			"Mexican",
			"Middle Eastern",
			"Nordic",
			"Southern",
			"Spanish",
			"Thai",
			"Vietnamese",
		],
	},
	{
		Name: "Meal types",
		options: [
			"main course",
			"side dish",
			"dessert",
			"appetizer",
			"salad",
			"bread",
			"breakfast",
			"soup",
			"beverage",
			"sauce",
			"marinade",
			"fingerfood",
			"snack",
			"drink",
		],
	},
];
function SearchRecipe() {
	const { dispatch, filterOptions } = useRecipes();
	const [filterClicked, setFilterClicked] = useState(false);
	const selectedMain = filterObj.find(
		(select) => select.Name === filterOptions
	);

	function handleFilterClick() {
		setFilterClicked((filterClicked) => !filterClicked);
	}
	return (
		<>
			<div className={styles.recipesHeader}>
				<Searchform dispatch={dispatch} />
				<ion-icon
					name="filter-circle-outline"
					onClick={handleFilterClick}
				></ion-icon>
			</div>
			<div className={styles.recipesDiets}>
				{filterClicked && (
					<FilterOptions
						optionsArrays={[
							"Select option",
							"diet",
							"Cuisine",
							"Meal types",
							"Intolerances",
							"Exclude Ingredients",
						]}
						dispatch={dispatch}
						selectedMain={selectedMain}
						filterOptions={filterOptions}
					/>
				)}
			</div>
		</>
	);
}

export default SearchRecipe;
