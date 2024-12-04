// import Newletter from "./Newletter";

import "../index.css";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import HomePageMeals from "../ui/HomePageMeals";
import HomeRandomMeal from "../ui/HomeRandomMeal";
import Newletter from "../ui/Newletter";

function Homepage() {
	return (
		<div style={{ overflow: "hidden" }}>
			<Header />
			<main>
				<HomeRandomMeal />
				<HomePageMeals />
				<Newletter />
			</main>
			<Footer />
		</div>
	);
}

export default Homepage;
