import styled from "styled-components";
import AddIngrredients from "./AddIngrredients";
import HeaderMenu from "./HeaderMenu";
import Footer from "./Footer";

const StyledDashBoard = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	margin-top: 2.4rem;
	padding: 4.2rem;
`;

const StyledPage = styled.div`
	overflow: hidden;

	display: flex;
	flex-direction: column;
	min-height: 100vh;
`;

function Dashboard() {
	// const [i]
	return (
		<StyledPage>
			<HeaderMenu bgColor="var(--light-1)" />
			<StyledDashBoard>
				<AddIngrredients />
			</StyledDashBoard>

			<Footer />
		</StyledPage>
	);
}

export default Dashboard;
