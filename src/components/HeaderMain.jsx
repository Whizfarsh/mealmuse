import styles from "./HeaderMain.module.css";
import { Link } from "react-router-dom";

function HeaderContent() {
	return (
		<div className={styles.heroContent}>
			<p className={styles.heroText}>
				Your Next Favorite Meal is Just a Click Away. Explore Our Recipe{" "}
				Collection Now!
			</p>
			<span>Browse from the list of available recipes</span>

			<Link to="recipes">
				<button className={styles.btn}>view all recipes</button>
			</Link>
		</div>
	);
}

export default HeaderContent;
