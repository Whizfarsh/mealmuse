import Meals from "../../ui/Meals";

import styled from "styled-components";
import { Link } from "react-router-dom";
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

const SearchLink = styled(Link)`
	text-decoration: none;
	color: var(--dark-2);
	font-size: 1.6rem;
	font-weight: 700;
`;

function RecipesMenus() {
	document.title = "MealMuse | Recipes";

	const { recipes, isLoading } = useRecipes();

	return (
		<>
			<Recipefilters />
			<RecipeMenus>
				{isLoading || recipes.length == 0 ? (
					<Loader />
				) : recipes.length > 0 ? (
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
