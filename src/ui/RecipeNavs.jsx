import styled from "styled-components";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import { usePage } from "../context/Pagecontext";

const RecipeNavsWrapper = styled.div`
	position: fixed;
	background-color: var(--light-1);
	width: 15%;
	height: 100vh;

	@media (max-width: 900px) {
		display: none;
	}
`;

const RecipeNavsContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	height: 100%;
`;

const UserSection = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 2.4rem;

	img {
		width: 9rem;
		height: 9rem;
		border-radius: 50%;
		object-fit: cover;
	}

	p {
		font-weight: 600;
		font-size: 1.8rem;
	}

	button {
		border: none;
		background-color: inherit;
		cursor: pointer;
		padding: 0.7rem;
	}
`;

const NavOptions = styled.div`
	margin-top: auto;
`;

const NavList = styled.ul`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 0;
`;

const NavItem = styled.li`
	margin-bottom: 1.2rem;
	padding: 0.7rem 0.7rem;
	border-radius: 0.6rem;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.9rem;
	background-color: ${({ active }) =>
		active ? "var(--dark-3)" : "transparent"};
	color: ${({ active }) => (active ? "var(--light-0)" : "var(--dark-1)")};
	box-shadow: ${({ active }) =>
		active ? "1px 1px 5px rgba(0, 0, 0, 0.5)" : "none"};
	transition: all 200ms ease-in;

	a {
		text-decoration: none;
		color: inherit;
	}
`;

const MenuFooter = styled.div`
	margin-top: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	ul {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		list-style: none;
		padding: 0;

		li {
			margin: 0.6rem 0;
		}
	}
`;

const Button = styled.button`
	margin-top: 1rem;
	margin-bottom: 2rem;
	border: none;
	background-color: transparent;
	text-transform: capitalize;
	font-size: 1.5rem;
	font-weight: 600;
	cursor: pointer;
	color: var(--dark-1);
`;

const LoginLink = styled(Link)`
	margin-top: 1rem;
	margin-bottom: 2rem;
	padding: 0.6rem 1.2rem;
	color: var(--dark-1) !important;
	font-size: 1.5rem;
	font-weight: 600;
	text-decoration: none;
`;

function RecipeNavs() {
	const { curPage } = usePage();
	const navigate = useNavigate();
	const { user, isAuthenticated, logout } = useGlobal();

	function handleLogout() {
		logout();
		navigate("/recipes");
	}

	return (
		<RecipeNavsWrapper>
			<RecipeNavsContent>
				<Logo />

				{isAuthenticated && (
					<UserSection>
						<img src={user.avatar} alt="" />
						<p>{user.name}</p>
						<button>Edit Profile</button>
					</UserSection>
				)}

				<NavOptions>
					<NavList>
						<Link to="/recipes">
							<NavItem active={curPage.includes("recipes")}>
								<span>Recipes</span>
							</NavItem>
						</Link>
						<Link to="/favorites">
							<NavItem active={curPage === "/favorites"}>
								<span>Favorites</span>
							</NavItem>
						</Link>
					</NavList>
				</NavOptions>

				<MenuFooter>
					<ul>
						<li>About us</li>
						<li>Contact us</li>
						<li>Terms of service</li>
					</ul>

					{isAuthenticated ? (
						<Button onClick={handleLogout}>logout</Button>
					) : (
						<LoginLink to="/login">Login</LoginLink>
					)}
				</MenuFooter>
			</RecipeNavsContent>
		</RecipeNavsWrapper>
	);
}

export default RecipeNavs;
