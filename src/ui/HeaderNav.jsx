import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import Searchform from "./Searchform";

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

const LoginButton = styled.button`
	background-color: var(--dark-3);
	color: var(--light-0);
	border: none;
	padding: 0.7rem 1.4rem;
	border-radius: 0.7rem;
	font-weight: 600;
	cursor: pointer;
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
	return (
		<MenusWrapper>
			<BgScreenMenu>
				<Nav>
					<MenuList>
						<MenuItem>
							<NavLink to="recipes">Recipes</NavLink>
						</MenuItem>
						<MenuItem>
							<NavLink to="favorites">Favorites</NavLink>
						</MenuItem>
					</MenuList>
					<Searchform />
					<Link to="/login">
						<LoginButton>LOGIN</LoginButton>
					</Link>
				</Nav>
			</BgScreenMenu>

			<SmallScreensMenu>
				<ion-icon name="menu-outline"></ion-icon>
			</SmallScreensMenu>
		</MenusWrapper>
	);
}

export default HeaderNav;
