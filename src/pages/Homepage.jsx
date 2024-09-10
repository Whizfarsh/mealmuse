/* eslint-disable react/prop-types */
// import Newletter from "./Newletter";

import "../index.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomeMain from "../components/HomeMain";
import HomePageMeals from "../components/HomePageMeals";
import HomeRandomMeal from "../components/HomeRandomMeal";

const convertMinutes = function (minutesGiven) {
	const hour = Math.ceil(minutesGiven / 60);
	const minutes = minutesGiven % 60;

	return `${hour}h:${minutes < 10 ? minutes + "0" : minutes} `;
};

function Homepage({ API_Key }) {
	return (
		<div>
			<Header />
			<HomeMain>
				<HomeRandomMeal API_Key={API_Key} convertMinutes={convertMinutes} />
				<HomePageMeals API_Key={API_Key} convertMinutes={convertMinutes} />
			</HomeMain>
			<Footer />
		</div>
	);
}

export default Homepage;
