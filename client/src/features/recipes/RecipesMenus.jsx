import Meals from "../../ui/Meals";

import styled from "styled-components";
import { Link } from "react-router-dom";
import Recipefilters from "./Recipefilters";
import { useRecipes } from "../../context/RecipesContext";
import { useState } from "react";
// import { useFilter } from "../../context/FilterContext";

const RecipeMenus = styled.div`
	margin: -1em 1.8rem 0rem;
`;

const NoRecipe = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 20rem auto;
	font-size: 2.4rem;
	text-align: center;
	gap: 1.4rem;
`;

const SearchLink = styled(Link)`
	text-decoration: none;
	color: var(--dark-2);
	font-size: 1.6rem;
	font-weight: 700;
`;

function RecipesMenus() {
	document.title = "MealMuse | Recipes";

	const [sortBy, setSortBy] = useState("none");
	// const { selectedCuisine, selectedDiet, selectedType, duration } = useFilter();

	// const { localRecipes } = useRecipes();
	const { recipes } = useRecipes();

	console.log(recipes);

	// const recipesToDisplay = localRecipes.filter((recipe) => {
	// 	const selectedCuisineLower = selectedCuisine?.toLowerCase();
	// 	const selectedDietLower = selectedDiet?.toLowerCase();
	// 	const selectedTypeLower = selectedType?.toLowerCase();

	// 	const cuisines = recipe.cuisines?.map((c) => c.toLowerCase()) || [];
	// 	const diets = recipe.diets?.map((d) => d.toLowerCase()) || [];
	// 	const types = recipe.dishTypes?.map((t) => t.toLowerCase()) || [];

	// 	const matchesCuisine =
	// 		!selectedCuisine ||
	// 		selectedCuisineLower === "all" ||
	// 		cuisines.includes(selectedCuisineLower);

	// 	const matchesDiet =
	// 		!selectedDiet ||
	// 		selectedDietLower === "all" ||
	// 		diets.includes(selectedDietLower);

	// 	const matchesType =
	// 		!selectedType ||
	// 		selectedTypeLower === "all" ||
	// 		types.includes(selectedTypeLower);

	// 	const matchesDuration =
	// 		!duration ||
	// 		duration === "all" ||
	// 		(recipe.readyInMinutes <= 15 && duration === "quick") ||
	// 		(recipe.readyInMinutes > 15 &&
	// 			recipe.readyInMinutes <= 30 &&
	// 			duration === "short") ||
	// 		(recipe.readyInMinutes > 30 &&
	// 			recipe.readyInMinutes <= 60 &&
	// 			duration === "medium") ||
	// 		(recipe.readyInMinutes > 60 && duration === "long");

	// 	return matchesCuisine && matchesDiet && matchesType && matchesDuration;
	// });

	// const sortedRecipes = [...recipesToDisplay].sort((a, b) => {
	// 	if (sortBy === "name") {
	// 		return a.title.localeCompare(b.title);
	// 	} else if (sortBy === "duration") {
	// 		return a.readyInMinutes - b.readyInMinutes;
	// 	} else if (sortBy === "servings") {
	// 		return a.servings - b.servings;
	// 	} else {
	// 		return recipesToDisplay;
	// 	}
	// });

	return (
		<>
			<Recipefilters
				sortBy={sortBy}
				handleSortBy={(e) => setSortBy(e.target.value)}
			/>
			<RecipeMenus>
				{recipes.length > 0 ? (
					<Meals title="" recipes={recipes} />
				) : (
					<NoRecipe className="no-recipes">
						<p>
							No recipes found. Please adjust your filters or search for new
							recipes.
						</p>
						<SearchLink to="/">Search for a recipe</SearchLink>
					</NoRecipe>
				)}
			</RecipeMenus>
		</>
	);
}

export default RecipesMenus;
