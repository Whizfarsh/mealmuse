/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLogo = styled.h2`
	font-family: var(--handFonts);
	color: red;
	margin-top: 1.2rem;
	font-size: ${(props) => props.$size || "24px"};
	text-align: ${(props) => props.$align || "center"};

	a {
		color: red;
		text-decoration: none;
	}
`;

function Logo({ size = "24px", align = "center" }) {
	return (
		<StyledLogo $size={size} $align={align}>
			<Link to="/">MealMuse</Link>
		</StyledLogo>
	);
}

export default Logo;
