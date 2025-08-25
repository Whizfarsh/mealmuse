import { Outlet } from "react-router-dom";
import RecipeNavs from "./RecipeNavs";
import MobileMenus from "./MobileMenus";
import styled from "styled-components";

const StyledAppLayout = styled.div`
	display: grid;
	grid-template-columns: 15% 1fr;
	overflow: hidden;
	position: relative;

	@media (max-width: 900px) {
		display: block;
	}
`;

function AppLayout() {
	return (
		<StyledAppLayout>
			<div className="">
				<RecipeNavs />
			</div>
			<MobileMenus />
			<div>
				<Outlet />
			</div>
		</StyledAppLayout>
	);
}

export default AppLayout;
