import Meals from "../../ui/Meals";

import styled from "styled-components";
import { Link } from "react-router-dom";
import Recipefilters from "./Recipefilters";
import { useRecipes } from "../../context/RecipesContext";

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

	const { localRecipes } = useRecipes();

	return (
		<>
			<Recipefilters />
			<RecipeMenus>
				{localRecipes.length > 0 ? (
					<Meals title="" recipes={localRecipes} />
				) : (
					<NoRecipe className="no-recipes">
						<p>
							No recipes found. Please add ingredients to search for recipes.
						</p>
						<SearchLink to="/">Search your recipe</SearchLink>
					</NoRecipe>
				)}
			</RecipeMenus>
		</>
	);
}

export default RecipesMenus;
