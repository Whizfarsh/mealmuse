import { Link, useNavigate } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import Logo from "./Logo";
import styles from "./MobileMenus.module.css";
import { usePage } from "../context/Pagecontext";
import { useState } from "react";

function MobileMenus() {
	const [showMbMenu, setShowMbMenu] = useState(false);
	const { isAuthenticated, user, logout } = useGlobal();
	const { curPage } = usePage();
	const navigate = useNavigate();

	return (
		<>
			<div className={styles.mobileMenus}>
				<Logo logoAlign="left" size="1.8rem" />
				<ion-icon
					name="menu-outline"
					onClick={() => setShowMbMenu(true)}
				></ion-icon>
				{showMbMenu && (
					<div
						className={`${styles.mobileMenusNavs} ${
							showMbMenu === true ? styles.show : ""
						}`}
					>
						<ion-icon
							className={styles.closeIcon}
							name="close-outline"
							onClick={() => setShowMbMenu(false)}
						></ion-icon>
						<ul className="">
							<Link to="/recipes">
								<li
									className={`${styles.recipeNavList} ${
										curPage.includes("recipes") ? styles.active : ""
									}`}
								>
									<span>Recipes</span>
								</li>
							</Link>
							<Link to="/favorites">
								<li
									className={`${styles.recipeNavList} ${
										curPage === "/favorites" ? styles.active : ""
									}`}
								>
									<span>Favorites</span>
								</li>
							</Link>
							<li></li>
						</ul>
						<div>
							<p>Hello {isAuthenticated ? `${user.name}` : "Guest"}</p>
							{isAuthenticated ? (
								<button
									className={styles.btnLogout}
									onClick={() => {
										logout();
										navigate("/recipes");
										setShowMbMenu(false);
									}}
								>
									logout
								</button>
							) : (
								//     <button
								//     className={styles.login}
								//     onClick={() => {
								//         logout();
								//         navigate("/login");
								//         setShowMbMenu(false);
								//     }}
								// >
								//     Login
								// </button>
								<Link to="/login" className={styles.login}>
									Login
								</Link>
							)}
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default MobileMenus;
