import { useEffect, useState } from "react";
import Meals from "./Meals";
import styles from "./Meals.module.css";
import { useGlobal } from "../context/GlobalContext";

function HomePageMeals() {
	const { API_Key } = useGlobal();
	const [fiveMinutesMeal, setFiveMinutesMeal] = useState([]);
	const [mostPopular, setMostPopular] = useState([]);

	// effects for day meal
	useEffect(
		function () {
			async function fetchData() {
				try {
					const res = await fetch(
						`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_Key}&maxReadyTime=5&type=drink&number=4`
					);
					const data = await res.json();

					// console.log(data);
					setFiveMinutesMeal(data.results);
					// console.log(dayMeal);
				} catch (err) {
					console.log(err.essage);
				}
			}
			fetchData();
		},
		[API_Key]
	);

	//effect for most popular
	useEffect(
		function () {
			async function fetchData() {
				try {
					const res = await fetch(
						`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_Key}&diet=Whole30&addRecipeInformation=true&number=4`
					);
					const data = await res.json();

					// console.log(data.results);
					setMostPopular(data.results);
					// console.log(dayMeal);
				} catch (err) {
					console.log(err.essage);
				}
			}
			fetchData();

			// return function () {
			// 	setMostPopular([]);
			// };
		},
		[API_Key]
	);
	return (
		<div>
			{/* <Meals title="Today's Meal" recipes={dayMeal} /> */}
			<Meals
				title="5 Minutes Recipes"
				recipes={fiveMinutesMeal}
				className={styles.mealsPlan}
			/>
			<Meals
				title="Most Popular"
				recipes={mostPopular}
				className={styles.mealsPlan}
			/>
		</div>
	);
}

export default HomePageMeals;
