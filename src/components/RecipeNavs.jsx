import styles from "./RecipeNavs.module.css";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import { usePage } from "../context/Pagecontext";

function RecipeNavs() {
	const { curPage } = usePage();
	const navigate = useNavigate();
	const { user, isAuthenticated, logout } = useGlobal();

	function handleLogout() {
		logout();
		navigate("/recipes");
	}
	return (
		<div className={styles.recipeNavs}>
			<div className={styles.recipeNavsItems}>
				<Logo />

				{isAuthenticated && (
					<div className={styles.userSection}>
						<img className={styles.userImg} src={user.avatar} alt="" />
						<p>{user.name}</p>
						<button>Edit Profile</button>
					</div>
				)}
				<div className={isAuthenticated ? "" : styles.navOptions}>
					<ul className={`${styles.recipeNavLists} `}>
						<Link to="/recipes">
							<li
								className={`${styles.recipeNavList} ${
									curPage.includes("recipes") ? styles.active : ""
								}`}
							>
								{" "}
								<ion-icon name="fast-food-outline"></ion-icon>
								<span>Recipes</span>
							</li>
						</Link>
						<Link to="/favorites">
							<li
								className={`${styles.recipeNavList} ${
									curPage === "/favorites" ? styles.active : ""
								}`}
							>
								<ion-icon name="heart-outline"></ion-icon>{" "}
								<span>Favorites</span>
							</li>
						</Link>
						<li></li>
					</ul>
				</div>
				{isAuthenticated ? (
					<button className={styles.btnLogout} onClick={handleLogout}>
						logout
					</button>
				) : (
					<Link to="/login" className={styles.login}>
						Login
					</Link>
				)}
			</div>
		</div>
	);
}

export default RecipeNavs;
