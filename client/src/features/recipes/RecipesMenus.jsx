import Meals from "../../ui/Meals";

import styled from "styled-components";
import Recipefilters from "./Recipefilters";
import { useRecipes } from "../../context/RecipesContext";
import Loader from "../../ui/Loading";

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

function RecipesMenus() {
	document.title = "MealMuse | Recipes";

	const { recipes, isLoading } = useRecipes();

	return (
		<>
			<Recipefilters />
			<RecipeMenus>
				{isLoading ? (
					<Loader />
				) : recipes.length > 0 ? (
					<>
						<Meals title="" recipes={recipes} />
					</>
				) : (
					<NoRecipe className="no-recipes">
						<p>
							No recipes found for the selected filters. Please adjust your
							filters.
						</p>
					</NoRecipe>
				)}
			</RecipeMenus>
		</>
	);
}

export default RecipesMenus;
