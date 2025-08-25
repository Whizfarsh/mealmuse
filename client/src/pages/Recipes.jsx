import { Outlet } from "react-router-dom";
import Footer from "../ui/Footer";
import styled from "styled-components";

const StyledRecipe = styled.div`
	@media (max-width: 900px) {
		/* overflow: hidden; */
		/* .recipes {
			display: flex;git 
			flex-direction: column;
		} */

		/* display: block; */
	}
`;

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
		<StyledRecipe>
			<Outlet />
			<StyledFooter>
				<Footer />
			</StyledFooter>
		</StyledRecipe>
	);
}

export default Recipes;
