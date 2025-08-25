import Meals from "../ui/Meals";
import { useEffect } from "react";
import styled from "styled-components";
import { useRecipes } from "../context/RecipesContext";
import EmptyMessage from "../ui/Empty";

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
	const { favorites, setFavorites } = useRecipes();

	useEffect(() => {
		const savedFavorites = localStorage.getItem("favorites");
		if (savedFavorites) {
			setFavorites(JSON.parse(savedFavorites));
		}
	}, [setFavorites]);

	if (!favorites || favorites.length === 0)
		return (
			<EmptyMessage
				note="NO RECIPES HAS BEEN ADDED"
				path="/recipes"
				pathText="Add your recipes"
			/>
		);
	return (
		<StyledFavorites>
			<div>
				<Meals recipes={favorites} />
			</div>
			{/* <div className="favFooter">
				<Footer />
			</div> */}
		</StyledFavorites>
	);
}

export default Favorites;
