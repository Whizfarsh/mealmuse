import { Link, useNavigate } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import Logo from "./Logo";
import styles from "./MobileMenus.module.css";
import { usePage } from "../context/Pagecontext";

function MobileMenus() {
	const { isAuthenticated, user, logout, showMbMenu, setShowMbMenu } =
		useGlobal();
	const { curPage } = usePage();
	const navigate = useNavigate();

	function handleCloseMenu() {
		setShowMbMenu(false);
	}

	return (
		<>
			<div className={styles.mobileMenus}>
				<Logo logoAlign="left" size="2.8rem" />
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
							onClick={handleCloseMenu}
						></ion-icon>
						<ul className={styles.menuLists}>
							<Link
								to="/"
								style={{ marginBottom: "0.4rem" }}
								onClick={handleCloseMenu}
							>
								Home
							</Link>
							<Link to="/recipes" onClick={handleCloseMenu}>
								<li
									className={`${styles.recipeNavList} ${
										curPage.includes("recipes") ? styles.active : ""
									}`}
								>
									<span>Recipes</span>
								</li>
							</Link>
							<Link to="/favorites" onClick={handleCloseMenu}>
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
