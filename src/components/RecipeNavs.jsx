/* eslint-disable react/prop-types */
import styles from "./RecipeNavs.module.css";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";

function RecipeNavs() {
	const curPage = useLocation().pathname;
	return (
		<div className={styles.recipeNavs}>
			<Logo />

			<div className={styles.userSection}>
				<img className={styles.userImg} src="./src/assets/img.jpg" alt="" />
				<p>John Doe</p>
				<button>Edit Profile</button>
			</div>
			<div className={styles.navOptions}>
				<ul className={`${styles.recipeNavLists} `}>
					<li
						className={`${styles.recipeNavList} ${
							curPage.includes("recipes") ? styles.active : ""
						}`}
					>
						{" "}
						<ion-icon name="fast-food-outline"></ion-icon>
						<span>
							<Link to="/recipes">Recipes</Link>
						</span>
					</li>
					<li
						className={`${styles.recipeNavList} ${
							curPage === "/favorites" ? styles.active : ""
						}`}
					>
						<ion-icon name="heart-outline"></ion-icon>{" "}
						<span>
							<Link to="/favorites">Favorites</Link>
						</span>
					</li>
					<li></li>
				</ul>
			</div>
		</div>
	);
}

export default RecipeNavs;
