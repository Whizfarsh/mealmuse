import { Outlet } from "react-router-dom";
import RecipeNavs from "./RecipeNavs";
import MobileMenus from "./MobileMenus";
import styled from "styled-components";
import SearchRecipe from "./SearchRecipe";
// import Footer from "./Footer";
// import { StyledFooter } from "../pages/Recipes";

const STyledApp = styled.div`
	display: grid;
	grid-template-columns: 15% 1fr;

	@media (max-width: 900px) {
		display: block;
	}
`;

function AppLayout() {
	return (
		<STyledApp>
			<div className="">
				<RecipeNavs />
			</div>
			<MobileMenus />
			<div>
				<SearchRecipe />
				<Outlet />
				{/* <StyledFooter> */}
				{/* <Footer /> */}
				{/* </StyledFooter> */}
			</div>
		</STyledApp>
	);
}

export default AppLayout;
