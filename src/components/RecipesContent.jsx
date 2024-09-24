/* eslint-disable react/prop-types */
// import { useState } from "react";
import styles from "./RecipesContent.module.css";
import Searchform from "./Searchform";
import Meals from "./Meals";
import Loading from "./Loading";
import FilterOptions from "./FilterOptions";
// import { useLocation } from "react-router-dom";

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

function RecipesContent({ dispatch, recipes, isLoading, filterOptions }) {
	// const { filterOptions, recipes, selectedFilter, searchQuery, isLoading } =
	// state;
	const selectedMain = filterObj.find(
		(select) => select.Name === filterOptions
	);

	return (
		<div className={styles.recipesContent}>
			<div className={styles.recipesHeader}>
				<Searchform dispatch={dispatch} />
				<ion-icon name="filter-circle-outline"></ion-icon>
			</div>
			<div className={styles.recipes}>
				<div className={styles.recipesDiets}>
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
				</div>
				{isLoading ? (
					<Loading />
				) : (
					<RecipesRender>
						<Meals title="" recipes={recipes} />
					</RecipesRender>
				)}
			</div>
		</div>
	);
}

export default RecipesContent;

function RecipesRender({ children }) {
	return <div>{children}</div>;
}
