/* eslint-disable react/prop-types */
import { useEffect } from "react";
import styles from "./HomeRandomMeal.module.css";
import { useState } from "react";
import { useGlobal } from "../content/GlobalContent";
import { Link } from "react-router-dom";

// import styles from "./HomeMain.module.css";

function HomeRandomMeal() {
	const { API_Key, convertMinutes } = useGlobal();
	const [homeRecipe, setHomeRecipe] = useState([]);
	useEffect(function () {
		async function fetchData() {
			try {
				const res = await fetch(
					`https://api.spoonacular.com/recipes/random?apiKey=${API_Key}&number=6`
				);
				const data = await res.json();

				// console.log(data);
				setHomeRecipe(data.recipes);
				// console.log(homeRecipe);
			} catch (err) {
				console.log(err.essage);
			}
		}
		fetchData();
	}, []);
	return (
		<div className={styles.recipes}>
			{homeRecipe.map((recipe) => (
				<RecipeLists
					recipe={recipe}
					key={recipe.id}
					convertMinutes={convertMinutes}
				/>
			))}
		</div>
	);
}

export default HomeRandomMeal;

function RecipeLists({ recipe, convertMinutes }) {
	return (
		<>
			{recipe.title.length < 50 && (
				<Link to={`/recipes/${recipe.id}`}>
					<div className={styles.recipe}>
						<div className={styles.recipeTexts}>
							<p className={styles.recipeName}>{recipe.title}</p>
							<p className={styles.recipeServings}>
								<ion-icon name="people-outline"></ion-icon>{" "}
								<span>{recipe.servings} servings</span>
							</p>
							<p className={styles.recipeTime}>
								<ion-icon name="alarm-outline"></ion-icon>{" "}
								<span>
									{recipe.readyInMinutes < 60
										? recipe.readyInMinutes
										: convertMinutes(recipe.readyInMinutes)}{" "}
									Minutes
								</span>
							</p>
						</div>
						<img className={styles.recipeImage} src={recipe.image} alt="" />
					</div>
				</Link>
			)}
		</>
	);
}
