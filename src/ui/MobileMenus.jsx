import { Link, useNavigate } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import Logo from "./Logo";
import { usePage } from "../context/Pagecontext";
import styled from "styled-components";

const MobileMenuWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 1.4rem 0.7rem 1.4rem;
	position: relative;

	ion-icon {
		font-size: 3.2rem;
		cursor: pointer;
		color: red;
	}

	@media (min-width: 901px) {
		display: none;
	}
`;

// const MobileMenuIcon =
// 	styled
// `;

const MobileMenuNav = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	width: 100%;
	height: 100vh;
	background-color: var(--light-1);
	z-index: 999;
	transform: translateX(100%);
	transition: transform 0.5s ease-in;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 1rem 1.6rem;

	&.show {
		transform: translateX(0);
	}
`;

// const CloseIcon =
// 	styled.ion -
// 	icon`
//   font-size: 2.8rem;
//   align-self: flex-start;
//   cursor: pointer;
// `;

const MenuList = styled.ul`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 1.4rem;

	a {
		margin-bottom: 0.4rem;
		text-decoration: none;
		color: var(--dark-2);
	}

	li {
		cursor: pointer;
		&.active span {
			font-weight: bold;
		}
	}
`;

const UserSection = styled.div`
	margin-top: auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	p {
		margin-bottom: 0.6rem;
	}

	button,
	a.login {
		background-color: var(--dark-2);
		border: none;
		border-radius: 2px;
		padding: 0.5rem 1rem;
		color: var(--light-0);
		text-decoration: none;
		cursor: pointer;
	}
`;

function MobileMenus() {
	const { isAuthenticated, user, logout, showMbMenu, setShowMbMenu } =
		useGlobal();
	const { curPage } = usePage();
	const navigate = useNavigate();

	function handleCloseMenu() {
		setShowMbMenu(false);
	}

	return (
		<MobileMenuWrapper>
			<Logo align="right" size="2.8rem" />
			<ion-icon name="menu-outline" onClick={() => setShowMbMenu(true)} />

			{showMbMenu && (
				<MobileMenuNav className={showMbMenu ? "show" : ""}>
					<ion-icon name="close-outline" onClick={handleCloseMenu} />
					<MenuList>
						<Link to="/" onClick={handleCloseMenu}>
							Home
						</Link>
						<Link to="/recipes" onClick={handleCloseMenu}>
							<li className={curPage.includes("recipes") ? "active" : ""}>
								<span>Recipes</span>
							</li>
						</Link>
						<Link to="/favorites" onClick={handleCloseMenu}>
							<li className={curPage === "/favorites" ? "active" : ""}>
								<span>Favorites</span>
							</li>
						</Link>
					</MenuList>
					<UserSection>
						<p>Hello {isAuthenticated ? `${user.name}` : "Guest"}</p>
						{isAuthenticated ? (
							<button
								onClick={() => {
									logout();
									navigate("/recipes");
									setShowMbMenu(false);
								}}
							>
								Logout
							</button>
						) : (
							<Link to="/login" className="login">
								Login
							</Link>
						)}
					</UserSection>
				</MobileMenuNav>
			)}
		</MobileMenuWrapper>
	);
}

export default MobileMenus;
