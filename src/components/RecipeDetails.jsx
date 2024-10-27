/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "./RecipeDetails.module.css";
import { Link, useParams } from "react-router-dom";
import Meals from "./Meals";
import parse from "html-react-parser";
import SearchRecipe from "./SearchRecipe.jsx";
import { useGlobal } from "../context/GlobalContext.jsx";

function Error({ message }) {
	return <div className={styles.errorMessage}>{message}</div>;
}

function RecipeDetails({ API_Key, setFavorites, favorites }) {
	const [recipe, setRecipe] = useState(null);
	const [tabs1, setTabs1] = useState("summary");
	const [tabs2, setTabs2] = useState("similarRecipes");
	const [similar, setSimilar] = useState([]);
	const [error, setError] = useState("");
	const { id } = useParams();

	useEffect(
		function () {
			async function fetchRecipeDetails() {
				try {
					const res = await fetch(
						`https://api.spoonacular.com/recipes/${Number(
							id
						)}/information?apiKey=${API_Key}&includeNutrition=true&addWinePairing=true`
					);
					if (!res.ok) throw new Error("Can not find recipe at this moment");

					const data = await res.json();
					if (!data || undefined)
						throw new Error(
							"Details for the required recipe is not available right now"
						);
					setRecipe(data);
					// console.log(data.winePairing.productMatches);
				} catch (err) {
					setError(err.message);
					// console.log(err.message);
				}
			}
			fetchRecipeDetails();
		},
		[id, API_Key]
	);

	useEffect(
		function () {
			async function fetchSimilar() {
				try {
					const res = await fetch(
						`https://api.spoonacular.com/recipes/${id}/similar?apiKey=${API_Key}&number=4`
					);
					const data = await res.json();
					setSimilar(data);
					// console.log(data);
				} catch (err) {
					console.log(err.message);
				}
			}
			fetchSimilar();
		},
		[id, API_Key]
	);

	//effect for updating favorites
	useEffect(
		function () {
			if (!favorites) return;
			localStorage.setItem("favorites", JSON.stringify(favorites));
		},
		[favorites]
	);

	function handleAddfavorites(newItem) {
		setFavorites((favs) => [...favs, newItem]);
		localStorage.setItem("favorites", JSON.stringify(favorites));

		// console.log(favorites);
	}
	return (
		<>
			<div style={{ padding: "1.4rem" }}>
				<SearchRecipe />
			</div>
			<RecipeDetail
				recipe={recipe}
				setTabs1={setTabs1}
				setTabs2={setTabs2}
				tabs1={tabs1}
				tabs2={tabs2}
				similar={similar}
				error={error}
				setError={setError}
				favorites={favorites}
				setFavorites={setFavorites}
				handleAddfavorites={handleAddfavorites}
			/>
		</>
	);
}

export default RecipeDetails;

function RecipeDetail({
	recipe,
	tabs1,
	tabs2,
	setTabs1,
	setTabs2,
	similar,
	favorites,
	handleAddfavorites,
}) {
	const { convertMinutes } = useGlobal();

	const wine = recipe?.winePairing?.productMatches[0];
	const ingredients = recipe?.nutrition?.ingredients;
	const nutrients = recipe?.nutrition?.nutrients;
	// console.log(recipe);
	const {
		id = "",
		title = "",
		image = "",
		servings = "",
		readyInMinutes = "",
		summary = "",

		analyzedInstructions = [],
	} = recipe || {};

	const isFavorites = favorites?.some((favorite) => favorite.id === id);

	useEffect(
		function () {
			document.title = `${title} | MealMuse`;
		},
		[title]
	);
	return (
		<div className={styles.recipeDetails}>
			{recipe !== null ? (
				<>
					<div className={styles.firstDetails}>
						<div className={styles.basicDetails}>
							<h2>{title}</h2>
							<img
								src={
									image ||
									`https://img.spoonacular.com/recipes/${id}-556x370.jpg` ||
									"../src/assets/noImage.jpg"
								}
								alt=""
							/>
							<div className={styles.miniInfo}>
								<p>{servings} Servings</p>
								<p>
									{readyInMinutes > 60
										? convertMinutes(readyInMinutes)
										: readyInMinutes}{" "}
									Minutes
								</p>
								{isFavorites ? (
									<Link to="/favorites">
										<button className={`${styles.favBtn} ${styles.favAdded}`}>
											Go to Favorites
										</button>
									</Link>
								) : (
									<button
										className={`${styles.favBtn} ${styles.favAdd}`}
										onClick={() => handleAddfavorites(recipe)}
									>
										Add to favorites
									</button>
								)}
							</div>
						</div>
						<div className={styles.firstDetailsMini}>
							<div className={styles.detailsTabs}>
								<button
									className={`${styles.tabs}  ${
										tabs1 === "summary" ? styles.tabsActive : ""
									}`}
									onClick={() => setTabs1("summary")}
								>
									Summary
								</button>
								<button
									className={`${styles.tabs} ${
										tabs1 === "ingredients" ? styles.tabsActive : ""
									}`}
									onClick={() => setTabs1("ingredients")}
								>
									{" "}
									Ingredients
								</button>
								<button
									className={`${styles.tabs} ${
										tabs1 === "cookingInstructions" ? styles.tabsActive : ""
									}`}
									onClick={() => setTabs1("cookingInstructions")}
								>
									{" "}
									Cooking Instructions
								</button>
							</div>
							<p className={styles.summary}>
								{/* {removeHtmlTags(summary)} */}
								{tabs1 === "summary" && parse(String(summary))}
							</p>
							{/* {summary} */}
							{tabs1 === "cookingInstructions" && (
								<ul className={styles.listsItems}>
									{analyzedInstructions[0].steps.map((step) => (
										<CookingInstructions step={step} key={step.number} />
									))}
								</ul>
							)}
							{tabs1 === "ingredients" && (
								<ul className={styles.listsItems}>
									{/* <p>Per servings</p> */}
									{ingredients.map((ingredient) => (
										<li
											className={styles.listItem}
											key={ingredient.id}
										>{`${ingredient.amount} ${ingredient.unit} of ${ingredient.name}`}</li>
									))}
								</ul>
							)}
						</div>
					</div>
					{nutrients && (
						<div className={styles.nutrients}>
							<h5>Nutrients</h5>
							{nutrients.map((nutrient, index) => (
								<span key={index}>
									{" "}
									{`${nutrient.amount}${nutrient.unit} of ${nutrient.name}${
										nutrients.length - 1 === index ? "" : ", "
									}`}{" "}
								</span>
							))}
						</div>
					)}
					{/* <div className={styles.submitReviews}>
						<p>Write a review</p>
						<form action="" className={styles.formReview}>
							<input type="text" name="" id="" placeholder="Name" />
							<input type="text" name="" id="" placeholder="Your review" />
							<button>Submit review</button>
						</form>
					</div> */}
				</>
			) : (
				// <Loading />
				<Error message={"No Information is available"} />
			)}
			<div className={styles.secondDetails}>
				<div className={styles.detailsTabs}>
					<button
						className={`${styles.tabs}  ${
							tabs2 === "similarRecipes" ? styles.tabsActive : ""
						}`}
						onClick={() => setTabs2("similarRecipes")}
					>
						Similar Recipes
					</button>
				</div>

				{tabs2 === "similarRecipes" && <Meals recipes={similar} />}
				{tabs2 === "winePairs" && (
					<div className={styles.winePair}>
						<img src={wine.imageUrl} alt="" />
						<p>{wine.title}</p>
						<span>{wine.price}</span>
						<button>
							<a href={wine.link}>view</a>
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

function CookingInstructions({ step }) {
	return (
		<li>
			<div>{`${step.number}. ${step.step}`}</div>
			<div style={{ display: "none", gap: "1.4rem" }}>
				{step.ingredients.length > 0
					? step.ingredients.map((ing) => (
							<span
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
								}}
								key={ing.id}
							>
								{ing.name}
								<img
									style={{ width: "100%", height: "7rem" }}
									src={`https://img.spoonacular.com/ingredients_100x100/${ing.image}`}
									alt={ing.image}
								/>
							</span>
					  ))
					: "no"}
			</div>
		</li>
	);
}
