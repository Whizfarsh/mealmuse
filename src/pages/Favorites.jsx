import Meals from "../ui/Meals";
import { useEffect, useState } from "react";
import styled from "styled-components";

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

	const [favoritesLocal, setFavoritesLocal] = useState(() => {
		const savedFavorites = localStorage.getItem("favorites");
		return savedFavorites ? JSON.parse(savedFavorites) : [];
	});

	function handleFavoriteDelete(id) {
		const newRecipes = favoritesLocal.filter((recipe) => recipe.id !== id);
		setFavoritesLocal(newRecipes);
	}

	useEffect(
		function () {
			localStorage.setItem("favorites", JSON.stringify(favoritesLocal));
		},
		[favoritesLocal]
	);
	if (!favoritesLocal) return;
	return (
		<StyledFavorites>
			<div>
				<Meals recipes={favoritesLocal} onDelete={handleFavoriteDelete} />
			</div>
			{/* <div className="favFooter">
				<Footer />
			</div> */}
		</StyledFavorites>
	);
}

export default Favorites;
