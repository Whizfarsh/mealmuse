import Meals from "../ui/Meals";
import Loading from "../ui/Loading";
import styled from "styled-components";
import { useRecipes } from "../context/RecipesContext";
import EmptyMessage from "../ui/Empty";
import { useUser } from "../context/UserContext";

const StyledFavorites = styled.div`
	margin: 1.2rem 1.8rem;
	max-width: 100%;
	overflow-x: hidden;

	@media (max-width: 900px) {
		display: flex;
		flex-direction: column;
	}
`;

function Favorites() {
	document.title = `MealMuse | Favorites`;
	const { isAuthenticated } = useUser();
	const { isLoading, savedRecipes } = useRecipes();

	return (
		<StyledFavorites>
			{isLoading ? (
				<Loading />
			) : !savedRecipes || savedRecipes.length === 0 ? (
				<EmptyMessage
					note="NO RECIPES HAS BEEN ADDED"
					path="/recipes"
					pathText="Add your recipes"
				/>
			) : !isAuthenticated ? (
				<EmptyMessage
					note="YOU NEED TO LOGIN TO ACCESS SAVED RECIPES"
					path="/login"
					pathText="login here"
				/>
			) : (
				<div>
					<Meals recipes={savedRecipes} />
				</div>
			)}
		</StyledFavorites>
	);
}

export default Favorites;
