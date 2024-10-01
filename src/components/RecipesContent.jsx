/* eslint-disable react/prop-types */
// import { useState } from "react";
import styles from "./RecipesContent.module.css";
// import Searchform from "./Searchform";
import Meals from "./Meals";
import Loading from "./Loading";
// import FilterOptions from "./FilterOptions";
import { useRecipes } from "../content/RecipesContext";
import SearchRecipe from "./SearchRecipe";
// import { useLocation } from "react-router-dom";

function RecipesContent() {
	const { recipes, isLoading } = useRecipes();
	// const { filterOptions, recipes, selectedFilter, searchQuery, isLoading } =
	// state;

	return (
		<div className={styles.recipesContent}>
			<SearchRecipe />
			<div className={styles.recipes}>
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
