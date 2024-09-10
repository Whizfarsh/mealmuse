/* eslint-disable react/prop-types */
// import HomePageMeals from "./HomePageMeals";
// import HomeRandomMeal from "./HomeRandomMeal";
import Newletter from "./Newletter";

function HomeMain({ children }) {
	return (
		<div>
			{children}
			<Newletter />
		</div>
	);
}

export default HomeMain;
