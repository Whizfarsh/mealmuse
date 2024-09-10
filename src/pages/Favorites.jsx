/* eslint-disable react/prop-types */
import styles from "./Favorites.module.css";

import Meals from "../components/Meals";
import RecipeNavs from "../components/RecipeNavs";

function Favorites() {
	const favoritesL = localStorage.getItem("favorites");

	console.log(JSON.parse(favoritesL));
	return (
		<div className={styles.favorites}>
			<div>
				<RecipeNavs />
			</div>
			<div className={styles.favRecipes}>
				<Meals recipes={JSON.parse(favoritesL)} />
			</div>
		</div>
	);
}

export default Favorites;
