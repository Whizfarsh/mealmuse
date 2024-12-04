import styled from "styled-components";
import HeaderContent from "./HeaderMain";
import MobileMenus from "./MobileMenus";
import Logo from "./Logo";
import HeaderNav from "./HeaderNav";

const StyledHeader = styled.header`
	background-color: var(--light-1);
	background-image: linear-gradient(
			rgba(199, 199, 196, 0.8),
			rgba(223, 215, 200, 0.2)
		),
		url("/src/assets/bg1.jpg");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	width: 100%;
	height: 80vh;
`;

const HeaderMenu = styled.div`
	justify-content: space-between;
	display: flex;
	align-items: center;
	padding: 0.5rem 1.8rem;
	color: var(--dark-0);

	@media (max-width: 900px) {
		.header {
			display: none;
		}
	}
`;

function Header() {
	return (
		<StyledHeader>
			<HeaderMenu>
				<Logo />
				<HeaderNav />
			</HeaderMenu>
			<MobileMenus />
			<HeaderContent />
		</StyledHeader>
	);
}

export default Header;