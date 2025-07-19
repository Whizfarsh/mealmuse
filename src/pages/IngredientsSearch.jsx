import Meals from "../ui/Meals";

import styled from "styled-components";
import { useIngredients } from "../context/IngredientsContext";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

const RecipeMenus = styled.div`
	margin: 1.2rem 1.8rem;
`;

const NoIngredients = styled.div`
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
	document.title = "MealMuse | Searched Recipes";

	const { recipeResults } = useIngredients();

	return (
		<>
			<RecipeMenus>
				{recipeResults.length > 0 ? (
					<Meals title="" recipes={recipeResults} />
				) : (
					<NoIngredients className="no-recipes">
						<p>
							No recipes found. Please add ingredients to search for recipes.
						</p>
						<SearchLink to="/">Search your recipe</SearchLink>
						<Button>Show All</Button>
					</NoIngredients>
				)}
			</RecipeMenus>
		</>
	);
}

export default RecipesMenus;
