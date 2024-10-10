import { Link, NavLink } from "react-router-dom";
import styles from "./HeaderNav.module.css";
import Searchform from "./Searchform";

function HeaderNav() {
	return (
		<div className={styles.Menus}>
			<div className={styles.bgScreenMenu}>
				<nav className={styles.nav}>
					<ul className={styles.menuList}>
						<li>
							<NavLink to="recipes"> Recipes</NavLink>
						</li>
						<li>
							<NavLink to="favorites"> Favorites</NavLink>
						</li>
					</ul>

					<Searchform />
					<Link to="/login">
						<button className={styles.btnLogin}>LOGIN</button>
					</Link>
				</nav>
			</div>
			<div className={styles.smallScreens}>
				<ion-icon name="menu-outline"></ion-icon>
			</div>
		</div>
	);
}

export default HeaderNav;
