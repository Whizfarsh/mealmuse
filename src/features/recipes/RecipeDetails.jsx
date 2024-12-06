import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import Meals from "../../ui/Meals.jsx";
import { API_Key, useGlobal } from "../../context/GlobalContext.jsx";
import { useRecipes } from "../../context/RecipesContext.jsx";

// Styled Components
const ErrorMessage = styled.div`
	width: 100%;
	color: red;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 40vh;
	font-size: 2.4rem;
	font-weight: 600;
`;

const RecipeDetailsContainer = styled.div`
	padding: 2.4rem;

	@media (max-width: 900px) {
		.basicDetails {
			flex: 0 0 100%;
		}
		.miniInfo {
			justify-content: center;
			align-items: center;
		}
		.firstDetails {
			flex-direction: column;
		}
	}
`;

const FirstDetails = styled.div`
	display: flex;
	column-gap: 2.4rem;
	margin-bottom: 1rem;
	@media (max-width: 500px) {
		flex-direction: column;
	}
`;

const BasicDetails = styled.div`
	flex: 0 0 50%;

	h2 {
		font-size: 2.4rem;
		margin-bottom: 1rem;
	}

	img {
		width: 100%;
		object-fit: cover;
		border-radius: 1.2rem;
		border: 1px solid var(--light-3);
	}
`;

const FirstDetailsMini = styled.div`
	margin-top: 3.4rem;
	display: flex;
	flex-direction: column;
`;

const MiniInfo = styled.div`
	display: flex;
	gap: 1.2rem;
	margin-bottom: 3.2rem;
	margin-top: 1rem;

	p {
		font-size: 1.2rem;
		border-radius: 0.6rem;
		background-color: var(--light-3);
		color: var(--dark-0);
		padding: 0.7rem;
	}
`;

const Summary = styled.p`
	font-size: 1.6rem;
	line-height: 1.4;
	margin: 1rem 0rem;
`;

const DetailsTabs = styled.div`
	display: flex;
	gap: 1.2rem;
`;

const Tabs = styled.button`
	background-color: var(--light-1);
	border: none;
	cursor: pointer;
	border-radius: 0.5rem;
	padding: 0.7rem 1rem;

	&.active,
	&:hover {
		font-weight: 600;
		background-color: var(--dark-2);
		color: var(--light-0);
		transition: background-color 500ms ease-in;
	}
`;

const ListsItems = styled.ul`
	margin: 0 1rem !important;
`;

const ListItem = styled.li`
	margin-bottom: 1rem;
`;

const Nutrients = styled.div`
	margin-bottom: 2.8rem;

	h5 {
		margin-bottom: 0.5rem;
		font-size: 2.4rem;
	}
`;

const FavButton = styled.button`
	margin-left: auto;
	border: none;
	border-radius: 0.9rem;
	padding: 0.7rem;
	cursor: pointer;

	&.add {
		background-color: var(--dark-3);
		color: var(--light-0);
	}

	&.added {
		background-color: var(--dark-3);
		color: var(--light-1);
	}
`;

// Component
function RecipeDetails() {
	const { setFavorites, favorites, convertMinutes } = useGlobal();
	const {
		recipe,
		setRecipe,
		error,
		setError,
		tabs1,
		setTabs1,
		tabs2,
		setTabs2,
		similar,
		setSimilar,
	} = useRecipes();

	const { id: pageId } = useParams();
	const navigate = useNavigate();

	const wine = recipe?.winePairing?.productMatches[0];
	const ingredients = recipe?.nutrition?.ingredients;
	const nutrients = recipe?.nutrition?.nutrients;

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

	useEffect(() => {
		document.title = `${title} | MealMuse`;
	}, [title]);

	useEffect(() => {
		async function fetchRecipeDetails() {
			try {
				const res = await fetch(
					`https://api.spoonacular.com/recipes/${Number(
						pageId
					)}/information?apiKey=${API_Key}&includeNutrition=true&addWinePairing=true`
				);
				if (!res.ok) throw new Error("Can not find recipe at this moment");

				const data = await res.json();
				if (!data)
					throw new Error(
						"Details for the required recipe is not available right now"
					);
				setRecipe(data);
			} catch (err) {
				setError(err.message);
			}
		}
		fetchRecipeDetails();
	}, [pageId, setError, setRecipe]);

	useEffect(() => {
		async function fetchSimilar() {
			try {
				const res = await fetch(
					`https://api.spoonacular.com/recipes/${pageId}/similar?apiKey=${API_Key}&number=4`
				);
				const data = await res.json();
				setSimilar(data);
			} catch (err) {
				console.log(err.message);
			}
		}
		fetchSimilar();
	}, [pageId, setSimilar]);

	useEffect(() => {
		if (!favorites) return;
		localStorage.setItem("favorites", JSON.stringify(favorites));
	}, [favorites]);

	function handleAddfavorites(newItem) {
		setFavorites((favs) => [...favs, newItem]);
		localStorage.setItem("favorites", JSON.stringify(favorites));
	}

	if (error) return <ErrorMessage>{error}</ErrorMessage>;

	return (
		<RecipeDetailsContainer>
			{recipe ? (
				<>
					<FirstDetails>
						<BasicDetails>
							<h2>{title}</h2>
							<img
								src={
									image ||
									`https://img.spoonacular.com/recipes/${id}-556x370.jpg`
								}
								alt=""
							/>
							<MiniInfo>
								<p>{servings} Servings</p>
								<p>
									{readyInMinutes > 60
										? convertMinutes(readyInMinutes)
										: readyInMinutes}{" "}
									Minutes
								</p>
								{isFavorites ? (
									<FavButton
										className="added"
										onClick={() => navigate("/favorites")}
									>
										Go to Favorites
									</FavButton>
								) : (
									<FavButton
										className="add"
										onClick={() => handleAddfavorites(recipe)}
									>
										Add to favorites
									</FavButton>
								)}
							</MiniInfo>
						</BasicDetails>
						<FirstDetailsMini>
							<DetailsTabs>
								<Tabs
									className={tabs1 === "summary" ? "active" : ""}
									onClick={() => setTabs1("summary")}
								>
									Summary
								</Tabs>
								<Tabs
									className={tabs1 === "ingredients" ? "active" : ""}
									onClick={() => setTabs1("ingredients")}
								>
									Ingredients
								</Tabs>
								<Tabs
									className={tabs1 === "cookingInstructions" ? "active" : ""}
									onClick={() => setTabs1("cookingInstructions")}
								>
									Cooking Instructions
								</Tabs>
							</DetailsTabs>
							{tabs1 === "summary" && (
								<Summary>{parse(String(summary))}</Summary>
							)}
							{tabs1 === "cookingInstructions" && (
								<ListsItems>
									{analyzedInstructions[0]?.steps.map((step) => (
										<ListItem key={step.number}>
											{`${step.number}. ${step.step}`}
										</ListItem>
									))}
								</ListsItems>
							)}
							{tabs1 === "ingredients" && (
								<ListsItems>
									{ingredients.map((ingredient) => (
										<ListItem
											key={ingredient.id}
										>{`${ingredient.amount} ${ingredient.unit} of ${ingredient.name}`}</ListItem>
									))}
								</ListsItems>
							)}
						</FirstDetailsMini>
					</FirstDetails>
					{nutrients && (
						<Nutrients>
							<h5>Nutrients</h5>
							{nutrients.map((nutrient, index) => (
								<span key={index}>
									{`${nutrient.amount}${nutrient.unit} of ${nutrient.name}${
										nutrients.length - 1 === index ? "" : ", "
									}`}
								</span>
							))}
						</Nutrients>
					)}
				</>
			) : (
				<ErrorMessage>No Information is available</ErrorMessage>
			)}
			<DetailsTabs>
				<Tabs
					className={tabs2 === "similarRecipes" ? "active" : ""}
					onClick={() => setTabs2("similarRecipes")}
				>
					Similar Recipes
				</Tabs>
			</DetailsTabs>
			{tabs2 === "similarRecipes" && <Meals recipes={similar} />}
			{tabs2 === "winePairs" && (
				<div>
					<img src={wine.imageUrl} alt="" />
					<p>{wine.title}</p>
					<span>{wine.price}</span>
					<button>
						<a href={wine.link}>view</a>
					</button>
				</div>
			)}
		</RecipeDetailsContainer>
	);
}

export default RecipeDetails;
