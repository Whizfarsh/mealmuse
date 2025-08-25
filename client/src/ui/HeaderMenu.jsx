/* eslint-disable react/prop-types */
import styled from "styled-components";
import HeaderNav from "./HeaderNav";
import Logo from "./Logo";
import MobileMenus from "./MobileMenus";

const StyledHeaderMenu = styled.div`
	background-color: ${(props) =>
		props.$bgcolor ? props.$bgcolor : "transparent"};
	justify-content: space-between;
	display: flex;
	align-items: center;
	padding: 0.9rem 1.8rem;
	color: var(--dark-0);

	@media (max-width: 900px) {
		display: none;
	}
`;

function HeaderMenu({ bgColor }) {
	return (
		<>
			<StyledHeaderMenu $bgcolor={bgColor}>
				<Logo />
				<HeaderNav />
			</StyledHeaderMenu>
			<MobileMenus />
		</>
	);
}

export default HeaderMenu;
