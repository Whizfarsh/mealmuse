import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { usePage } from "../context/Pagecontext";
import styled from "styled-components";
import { FaHeart, FaSearch, FaUser, FaUtensils } from "react-icons/fa";
import { useUser } from "../context/UserContext";
import { useGlobal } from "../context/GlobalContext";

const MobileMenuWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 1.4rem 0.7rem 1.4rem;
	position: relative;
	/* overflow: hidden; */

	background-color: var(--light-2);

	ion-icon {
		font-size: 3.2rem;
		cursor: pointer;
		color: red;
	}

	@media (min-width: 901px) {
		display: none;
	}
`;

const MobileMenuNav = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	width: 100%;
	height: 100vh;
	background-color: var(--light-2);
	z-index: 999;
	transform: translateX(100%);
	transition: transform 0.5s ease-in-out;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 1rem 1.6rem;

	&.show {
		transform: translateX(0);
	}

	ion-icon {
		font-size: 2.8rem;
		align-self: flex-start;
		cursor: pointer;
	}
`;

const StyledListLink = styled(NavLink)`
	margin-bottom: 1rem;

	display: flex;
	align-items: center;
	gap: 1rem;
	color: var(--dark-0);
	background-color: transparent;
	transition: background-color 1s ease;

	padding: 0 1.4rem;
	&.active {
		padding: 0.6rem 1.4rem;
		background-color: var(--light-0);
		border-radius: 0.8rem;
		font-weight: 600;
	}
`;

const MenuList = styled.ul`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	margin-bottom: 1.4rem;
	margin-top: 2.4rem;

	li {
		cursor: pointer;
		&.active span {
			font-weight: bold;
		}
	}
`;

const UserSection = styled.div`
	margin-top: auto;
	margin-bottom: 2rem;
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
	const { isAuthenticated, user, logout } = useUser();
	const { showMbMenu, setShowMbMenu } = useGlobal();
	const { curPage } = usePage();
	const navigate = useNavigate();

	function handleShowMenu() {
		setShowMbMenu((show) => !show);
	}

	return (
		<MobileMenuWrapper>
			<Logo align="right" size="2.8rem" />
			<ion-icon name="menu-outline" onClick={handleShowMenu} />

			<MobileMenuNav className={showMbMenu ? "show" : ""}>
				<ion-icon name="close-outline" onClick={handleShowMenu} />
				<MenuList>
					<li>
						<StyledListLink to="/" onClick={handleShowMenu}>
							<FaSearch />
							Search
						</StyledListLink>
					</li>
					<li className={curPage.includes("recipes") ? "active" : ""}>
						<StyledListLink to="/recipes" onClick={handleShowMenu}>
							<FaUtensils />
							<span>Recipes</span>
						</StyledListLink>
					</li>

					{isAuthenticated && (
						<>
							<li className={curPage === "/favorites" ? "active" : ""}>
								<StyledListLink to="/favorites" onClick={handleShowMenu}>
									<FaHeart />

									<span>Favorites</span>
								</StyledListLink>
							</li>
							<li className={curPage === "/account" ? "active" : ""}>
								<StyledListLink to="/account" onClick={handleShowMenu}>
									<FaUser />
									<span>Account</span>
								</StyledListLink>
							</li>
						</>
					)}
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
		</MobileMenuWrapper>
	);
}

export default MobileMenus;
