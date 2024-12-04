import { Outlet } from "react-router-dom";
import RecipeNavs from "./RecipeNavs";
import MobileMenus from "./MobileMenus";
import styled from "styled-components";
import SearchRecipe from "./SearchRecipe";

const STyledApp = styled.div`
	display: grid;
	grid-template-columns: 15% 1fr;
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
			</div>
		</STyledApp>
	);
}

export default AppLayout;
