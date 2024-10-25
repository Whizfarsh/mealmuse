/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./Meals.module.css";
import { usePage } from "../context/Pagecontext";
import { useGlobal } from "../context/GlobalContext";

function Meals({ title, recipes, onDelete, className }) {
	return (
		<div className={className}>
			<h2>{title}</h2>

			<div className={`${styles.meals} ${styles.grid4}`}>
				{recipes.map((recipe) => (
					<MealsLists recipe={recipe} onDelete={onDelete} key={recipe.id} />
				))}
			</div>
		</div>
	);
}

export default Meals;

function MealsLists({ recipe, onDelete }) {
	const { curPage } = usePage();
	const { convertMinutes } = useGlobal();

	function onDeleteItem(e) {
		e.preventDefault();
		onDelete(recipe.id);
	}
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
							<span>
								{recipe.readyInMinutes < 60
									? recipe.readyInMinutes
									: convertMinutes(recipe.readyInMinutes)}{" "}
								Minutes
							</span>
							{/* <span>{recipe.readyInMinutes} Minutes</span> */}
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
				{curPage === "/favorites" ? (
					<button className={styles.btnDelete} onClick={onDeleteItem}>
						Delete
					</button>
				) : (
					""
				)}
			</div>
		</Link>
	);
}
