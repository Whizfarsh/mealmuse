import { Outlet } from "react-router-dom";
import Footer from "../ui/Footer";
import styled from "styled-components";

export const StyledFooter = styled.div`
	display: none;

	/* MEDIA QUEERIES */
	@media (max-width: 900px) {
		/* .recipes {
			display: flex;
			flex-direction: column;
		} */

		display: block;
	}
`;

function Recipes() {
	return (
		<div>
			<Outlet />
			<StyledFooter>
				<Footer />
			</StyledFooter>
		</div>
	);
}

export default Recipes;
