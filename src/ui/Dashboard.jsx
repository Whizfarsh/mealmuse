import styled from "styled-components";
import AddIngrredients from "./AddIngrredients";
import HeaderMenu from "./HeaderMenu";
import Footer from "./Footer";
import AddedIngredients from "./AddedIngredients";
import { useRef } from "react";

const StyledDashBoard = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	margin-top: 2.4rem;
	padding: 3.2rem;
`;

const StyledPage = styled.div`
	overflow: hidden;

	display: flex;
	flex-direction: column;
	min-height: 100vh;

	position: relative;
`;

function Dashboard() {
	const addIngRefs = useRef();

	function handleScroll() {
		if (addIngRefs.current) {
			addIngRefs.current.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	}
	// const [i]
	return (
		<StyledPage>
			<HeaderMenu bgColor="var(--light-1)" />
			<StyledDashBoard ref={addIngRefs}>
				<AddIngrredients />
			</StyledDashBoard>
			<AddedIngredients handleClick={handleScroll} />
			<Footer />
		</StyledPage>
	);
}

export default Dashboard;
