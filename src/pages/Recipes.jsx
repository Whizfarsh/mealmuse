/* eslint-disable react/prop-types */
// import Loading from "../components/Loading";
import { useLocation, useParams } from "react-router-dom";
// import { Outlet } from "react-router-dom";
import RecipeNavs from "../components/RecipeNavs";
import RecipesContent from "../components/RecipesContent";
import styles from "./Recipes.module.css";
import RecipeDetails from "../components/RecipeDetails";
import { useReducer, useEffect } from "react";
import Favorites from "./Favorites";

const initialState = {
	isLoading: true,
	searchQuery: "",
	filterOptions: "Select option",
	selectedFilter: "",
	intoleranceText: "",
	excludeText: "",
	recipes: [],
};

function reducer(state, action) {
	switch (action.type) {
		case "searchUpdate":
			return { ...state, searchQuery: action.payload };
		case "filterOptionUpdate":
			return { ...state, filterOptions: action.payload };
		case "dataFetched":
			return {
				...state,
				recipes: action.payload,
				isLoading: false,
			};
		case "updateElectedFilter":
			return { ...state, selectedFilter: action.payload };
		default:
			throw new Error("No action found");
	}
}

function Recipes({ API_Key, setFavorites, favorites }) {
	const curPage = useLocation().pathname;
	const [
		{ filterOptions, recipes, selectedFilter, searchQuery, isLoading },
		dispatch,
	] = useReducer(reducer, initialState);

	const { id } = useParams();
	// const curPage = useLocation().pathname;
	// console.log(id);
	// console.log(curPage);

	useEffect(
		function () {
			const controller = new AbortController();
			async function fetchRecipes() {
				try {
					const res = await fetch(
						`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_Key}&query=${searchQuery}&${filterOptions}=${selectedFilter}&addRecipeInformation=true&number=10
                        `,
						{ signal: controller.signal }
					);
					if (!res.ok) throw new Error("Unavailable request");

					const data = await res.json();
					if (data.Response === "False")
						throw new Error("Unable to fetch recipes");

					console.log(data.results);
					dispatch({ type: "dataFetched", payload: data.results });
				} catch (err) {
					if (!err.name === "AbortError") console.log(err);
					console.log(err.message);
				}
			}
			fetchRecipes();

			return function () {
				controller.abort();
			};
		},
		[filterOptions, selectedFilter, searchQuery]
	);
	return (
		<div className={styles.recipes}>
			{/* <Loading /> */}
			<div className={styles.recipeMenus}>
				<RecipeNavs />
			</div>
			{curPage.includes("recipes") && (
				<div className={styles.recipesLists}>
					{id ? (
						<RecipeDetails
							recipes={recipes}
							dispatch={dispatch}
							API_Key={API_Key}
							setFavorites={setFavorites}
							favorites={favorites}
						/>
					) : (
						<RecipesContent
							dispatch={dispatch}
							recipes={recipes}
							isLoading={isLoading}
							filterOptions={filterOptions}
						/>
						// <Outlet />
					)}
				</div>
			)}
			{curPage.includes("favorites") && <Favorites />}
			{/* <div className={styles.recipesLists}>
				{id ? (
					<RecipeDetails
						recipes={recipes}
						dispatch={dispatch}
						API_Key={API_Key}
					/>
				) : (
					<RecipesContent
						dispatch={dispatch}
						recipes={recipes}
						isLoading={isLoading}
						filterOptions={filterOptions}
					/>
					// <Outlet />
				)}
			</div> */}
			{/* <Outlet /> */}
		</div>
	);
}

export default Recipes;
