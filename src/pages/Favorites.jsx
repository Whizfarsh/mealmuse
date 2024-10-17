import styles from "./Favorites.module.css";

import Meals from "../components/Meals";
import RecipeNavs from "../components/RecipeNavs";
import { useEffect, useState } from "react";
import SearchRecipe from "../components/SearchRecipe";

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
		<div className={styles.favorites}>
			<div>
				<RecipeNavs />
			</div>
			<div className={styles.favRecipes}>
				<SearchRecipe />
				<Meals recipes={favoritesLocal} onDelete={handleFavoriteDelete} />
			</div>
		</div>
	);
}

export default Favorites;
