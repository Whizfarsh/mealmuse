// import Newletter from "./Newletter";

import "../index.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomeMain from "../components/HomeMain";
import HomePageMeals from "../components/HomePageMeals";
import HomeRandomMeal from "../components/HomeRandomMeal";

function Homepage() {
	return (
		<div>
			<Header />
			<HomeMain>
				<HomeRandomMeal />
				<HomePageMeals />
			</HomeMain>
			<Footer />
		</div>
	);
}

export default Homepage;
