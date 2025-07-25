import styled from "styled-components";
import Meals from "../../ui/Meals";
import { useRecipes } from "../../context/RecipesContext";

const StyledSimilarRecipe = styled.div`
	margin-top: 5rem;
	h3 {
		font-size: 2.4rem;
		margin-bottom: -1rem;
		text-transform: Capitalize;
	}
`;

function SimilarRecipes() {
	const { similar } = useRecipes();
	return (
		<StyledSimilarRecipe>
			<h3>Similar Recipes</h3>
			<Meals recipes={similar} />
		</StyledSimilarRecipe>
	);
}

export default SimilarRecipes;
