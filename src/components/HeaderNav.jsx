import { Link, NavLink } from "react-router-dom";
import styles from "./HeaderNav.module.css";
// import User from "./User";
import Searchform from "./Searchform";
// import Login from "../pages/Login";

function HeaderNav() {
	return (
		<div className={styles.Menus}>
			<div className={styles.bgScreenMenu}>
				<nav className={styles.nav}>
					<ul className={styles.menuList}>
						{/* <li>Home</li> */}
						<li>
							<NavLink to="recipes"> Recipes</NavLink>
						</li>
						{/* <li>
							<NavLink to="recipe"> Categories</NavLink>
						</li> */}
					</ul>

					{/* <div className={styles.navOther}> */}
					<Searchform />
					<Link to="/login">
						<button className={styles.btnLogin}>LOGIN</button>
					</Link>
					{/* <Login /> */}
					{/* <User /> */}
					{/* </div> */}
				</nav>
			</div>
			<div className={styles.smallScreens}>
				<ion-icon name="menu-outline"></ion-icon>
			</div>
		</div>
	);
}

export default HeaderNav;
