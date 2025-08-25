import styled from "styled-components";
import { Link } from "react-router-dom";

// Styled Components
const HeroContentWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	row-gap: 1rem;
	padding: 5rem 30rem;
	margin: 6rem 0;

	@media (max-width: 69.4rem) {
		padding: 4rem 5rem;
	}

	@media (max-width: 500px) {
		padding: 2rem 2rem;
	}
`;

const HeroText = styled.p`
	font-size: 4.2rem;
	font-weight: 700;
	text-align: center;
	line-height: 0.9;

	@media (max-width: 500px) {
		font-size: 4.2rem;
		padding-left: 3rem;
	}

	@media (max-width: 28.75rem) {
		margin-top: 7rem;
		font-size: 3.6rem;
		padding-left: 0;
	}
`;

const HeroSpan = styled.span`
	text-align: center;
`;

const Button = styled.button`
	border: none;
	background-color: var(--dark-3);
	border-radius: 0 1.8rem 0 1.8rem;
	padding: 1.2rem;
	color: var(--light-0);
	cursor: pointer;
`;

const StyledLink = styled(Link)`
	text-decoration: none;
`;

// HeaderContent Component
function HeaderContent() {
	return (
		<HeroContentWrapper>
			<HeroText>Your Next Favorite Meal is Just a Click Away.</HeroText>
			<HeroSpan>Browse from the list of available recipes</HeroSpan>

			<StyledLink to="recipes">
				<Button>view all recipes</Button>
			</StyledLink>
		</HeroContentWrapper>
	);
}

export default HeaderContent;
