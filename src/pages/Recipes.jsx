// import Loading from "../components/Loading";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { Outlet } from "react-router-dom";
import RecipeNavs from "../components/RecipeNavs";
import RecipesContent from "../components/RecipesContent";
import styles from "./Recipes.module.css";
import RecipeDetails from "../components/RecipeDetails";
import { useEffect } from "react";
import Favorites from "./Favorites";
import { useRecipes } from "../context/RecipesContext";
import { useGlobal } from "../context/GlobalContext";

function Recipes() {
	const { API_Key, setFavorites, favorites } = useGlobal();
	const {
		filterOptions,
		recipes,
		selectedFilter,
		searchQuery,
		isLoading,
		dispatch,
	} = useRecipes();
	const navigate = useNavigate();
	const curPage = useLocation().pathname;

	const { id } = useParams();

	document.title = "MealMuse | Recipes";

	useEffect(
		function () {
			const controller = new AbortController();
			async function fetchRecipes() {
				try {
					const res = await fetch(
						`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_Key}&query=${searchQuery}${
							filterOptions !== "Select option"
								? `&${filterOptions}=${selectedFilter}`
								: ""
						}&addRecipeInformation=true&number=10
                        `,
						{ signal: controller.signal }
					);
					if (!res.ok) throw new Error("Unavailable request");

					const data = await res.json();
					if (data.Response === "False")
						throw new Error("Unable to fetch recipes");

					// console.log(data.results);
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
		[filterOptions, selectedFilter, searchQuery, API_Key, dispatch]
	);

	useEffect(() => {
		if (searchQuery && searchQuery.length > 3) {
			navigate(`/recipes?q=${searchQuery}`);
		}
	}, [searchQuery, navigate]);
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
		</div>
	);
}

export default Recipes;
