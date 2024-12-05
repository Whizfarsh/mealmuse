/* eslint-disable react/prop-types */
import Meals from "../../ui/Meals";
import Loading from "../../ui/Loading";
import { useRecipes } from "../../context/RecipesContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_Key } from "../../context/GlobalContext";
import styled from "styled-components";

const RecipeMenus = styled.div`
	margin: 1.2rem 1.8rem;
	/* background-color: red !important; */
`;

function RecipesMenus() {
	document.title = "MealMuse | Recipes";
	const {
		filterOptions,
		recipes,
		selectedFilter,
		searchQuery,
		isLoading,
		dispatch,
	} = useRecipes();

	const navigate = useNavigate();

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
		[filterOptions, selectedFilter, searchQuery, dispatch]
	);

	useEffect(() => {
		if (searchQuery && searchQuery.length > 3) {
			navigate(`/recipes?q=${searchQuery}`);
		}
	}, [searchQuery, navigate]);

	return (
		<RecipeMenus>
			<div>
				{isLoading ? (
					<Loading />
				) : (
					<RecipesLists>
						<Meals title="" recipes={recipes} />
					</RecipesLists>
				)}
			</div>
		</RecipeMenus>
	);
}

export default RecipesMenus;

function RecipesLists({ children }) {
	return <div>{children}</div>;
}
