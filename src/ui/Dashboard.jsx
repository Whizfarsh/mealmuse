import styled from "styled-components";
import AddIngrredients from "./AddIngrredients";
import HeaderMenu from "./HeaderMenu";
import Footer from "./Footer";

const StyledDashBoard = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	margin-top: 2.4rem;
	padding: 4.2rem;
`;

function Dashboard() {
	// const [i]
	return (
		<>
			<HeaderMenu bgColor="var(--light-1)" />
			<StyledDashBoard>
				<AddIngrredients />
			</StyledDashBoard>
			<Footer />
		</>
	);
}

export default Dashboard;
