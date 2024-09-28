/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./Meals.module.css";

function Meals({ title, recipes, className }) {
	// console.log(recipes);
	return (
		<div className={className}>
			<h2>{title}</h2>

			<div className={`${styles.meals} ${styles.grid4}`}>
				{recipes.map((recipe) => (
					<MealsLists recipe={recipe} key={recipe.id} />
				))}
			</div>
		</div>
	);
}

export default Meals;

function MealsLists({ recipe }) {
	// console.log(recipe);
	return (
		<Link to={`/recipes/${recipe.id}`}>
			<div className={styles.meal}>
				<img
					src={
						recipe.image ||
						`https://img.spoonacular.com/recipes/${recipe.id}-556x370.jpg` ||
						"../assets/noImage.jpg"
					}
					alt=""
				/>
				<h4>{recipe.title}</h4>
				{recipe.servings || recipe.readyInMinutes ? (
					<div className={styles.info}>
						<p className={styles.duration}>
							<ion-icon name="alarm-outline"></ion-icon>
							<span>{recipe.readyInMinutes} Minutes</span>
						</p>
						|
						<p className={styles.servings}>
							<ion-icon name="people-outline"></ion-icon>
							<span>{recipe.servings} Servings</span>
						</p>
					</div>
				) : (
					""
				)}
			</div>
		</Link>
	);
}

// {title === "Today's Meal" ? (
// 	<div className={styles.mealInfo}>
// 		<p>
// 			This List of meals is just a recommendation for today. There is a
// 			high probability that it will change tomorrow. Based on
// 			today&apos;s meal plan, the total calories are 1894.09, the total
// 			protein is 54.62, the total fat is 57.56,and the contained
// 			carbohydrates are 287.09. Need more information? Check each meal,
// 			enjoy the recipes 😃 !!!
// 		</p>
// 		<div className={styles.customMeals}>
// 			<p>customize your meals here</p>
// 			<ion-icon name="arrow-redo-sharp"></ion-icon>
// 		</div>
// 	</div>
// ) : (
// 	<div className={styles.meal}>
// 		<img src="../src/assets/img.jpg" alt="" />
// 		<h4>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h4>
// 		<div className={styles.info}>
// 			<p className={styles.duration}>
// 				<ion-icon name="alarm-outline"></ion-icon>
// 				<span>30 Minutes</span>
// 			</p>
// 			|
// 			<p className={styles.servings}>
// 				<ion-icon name="people-outline"></ion-icon>
// 				<span>8 Servings</span>
// 			</p>
// 		</div>
// 	</div>
// )}
