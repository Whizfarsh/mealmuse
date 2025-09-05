import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../context/UserContext";
import Button from "./Button";

// Styled Components
const MenusWrapper = styled.div`
	display: flex;

	@media (max-width: 900px) {
		display: none;
	}
`;

const BgScreenMenu = styled.div`
	display: flex;

	@media (max-width: 900px) {
		display: none;
	}
`;

const Nav = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1.6rem;
	font-family: "Poppins";
`;

const MenuList = styled.ul`
	display: flex;
	gap: 0.3rem;
`;

const MenuItem = styled.li`
	list-style: none;
	cursor: pointer;
	font-size: 1.2rem;
	font-weight: 600;
	margin-right: 1.2rem;
	color: var(--dark-3);

	a {
		color: inherit;
		text-decoration: none;
	}
`;

const SmallScreensMenu = styled.div`
	display: none;

	@media (max-width: 900px) {
		display: block;
	}

	ion-icon {
		font-size: 4.4rem;
		cursor: pointer;
	}
`;

// HeaderNav Component
function HeaderNav() {
	const { isAuthenticated, logout } = useUser();

	// const navigate = useNavigate();
	return (
		<MenusWrapper>
			<BgScreenMenu>
				<Nav>
					<MenuList>
						<MenuItem>
							<NavLink to="/recipes">Recipes</NavLink>
						</MenuItem>
						{isAuthenticated && (
							<>
								<MenuItem>
									<NavLink to="/favorites">Favorites</NavLink>
								</MenuItem>
								<MenuItem>
									<NavLink to="/user">User</NavLink>
								</MenuItem>
							</>
						)}
					</MenuList>

					{isAuthenticated ? (
						<Link to="/">
							<Button
								$variation="loginout"
								onClick={() => {
									logout();
								}}
							>
								Logout
							</Button>
						</Link>
					) : (
						<Link to="/login">
							<Button $variation="loginout">Login</Button>
						</Link>
					)}
				</Nav>
			</BgScreenMenu>

			<SmallScreensMenu>
				<ion-icon name="menu-outline"></ion-icon>
			</SmallScreensMenu>
		</MenusWrapper>
	);
}

export default HeaderNav;
