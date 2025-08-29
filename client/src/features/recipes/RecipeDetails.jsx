import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import parse from "html-react-parser";
import Loading from "../../ui/Loading.jsx";
import { useGlobal } from "../../context/GlobalContext.jsx";
import { useRecipes } from "../../context/RecipesContext.jsx";
import { MainTabs, TabsOptions } from "../../ui/Tabs.jsx";
import BreakDownLists from "../../ui/BreakDownLists";
import { BsSave2 } from "react-icons/bs";

// import SimilarRecipes from "./SimilarRecipes.jsx";

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
	margin: 1.8rem 0rem;
`;

const DetailsTabs = styled.div`
	display: flex;
	gap: 1.2rem;
`;

const ListsItems = styled.ul`
	margin: 1.8rem 1rem !important;
`;

const ListItem = styled.li`
	margin-bottom: 1rem;
`;

const Nutrients = styled.div`
	margin-bottom: 2.8rem;
	display: flex;
	flex-direction: column;
	row-gap: 1.8rem;

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
		display: flex;
		gap: 0.8rem;
	}

	&.added {
		background-color: var(--dark-3);
		color: var(--light-1);
	}
`;

const IngredientsNutrients = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 1rem;
`;

// Component
function RecipeDetails() {
	const { convertMinutes } = useGlobal();

	const {
		recipe,
		setRecipe,
		error,
		setError,
		tabs,
		tabsIndex,
		favorites,
		handleSaveRecipe,
	} = useRecipes();

	const { id: pageId } = useParams();
	const navigate = useNavigate();

	const {
		_id = "",
		name = "",
		// image = "",
		totalServings = "",
		cookingDuration = "",
		summary = "",
		instruction = [],
		ingredients = [],
		nutrients = [],
	} = recipe || {};

	const isFavorites = favorites?.some((favorite) => favorite.id === _id);

	useEffect(() => {
		document.title = `${name} | MealMuse`;
	}, [name]);

	useEffect(() => {
		async function fetchRecipeDetails() {
			try {
				const res = await fetch(`/api/v1/recipes/${pageId}`);

				const data = await res.json();
				if (!data)
					throw new Error(
						"Details for the required recipe is not available right now"
					);
				setRecipe(data.data.data);
			} catch (err) {
				setError(err.message);
			}
		}
		fetchRecipeDetails();
	}, [pageId, setError, setRecipe]);

	if (error) return <ErrorMessage>{error}</ErrorMessage>;

	return (
		<RecipeDetailsContainer>
			{recipe ? (
				<>
					<FirstDetails>
						<BasicDetails>
							<h2>{name}</h2>
							<img src="../src/assets/img.jpg" alt={name} />
							<MiniInfo>
								<p>{totalServings} Servings</p>
								<p>
									{cookingDuration > 60
										? convertMinutes(cookingDuration)
										: cookingDuration}{" "}
									Minutes
								</p>
								{isFavorites ? (
									<FavButton
										className="added"
										onClick={() => navigate("/favorites")}
									>
										View saved
									</FavButton>
								) : (
									<FavButton
										className="add"
										onClick={() => handleSaveRecipe(recipe._id)}
									>
										<BsSave2 />
										Save
									</FavButton>
								)}
							</MiniInfo>
						</BasicDetails>
						<FirstDetailsMini>
							<DetailsTabs>
								<MainTabs name={"summary"}>Summary</MainTabs>
								<MainTabs name={"ingredients"}>Ingredients</MainTabs>
								<MainTabs name={"cookingInstructions"}>
									Cooking Instructions
								</MainTabs>
							</DetailsTabs>
							{tabs === "summary" && <Summary>{summary}</Summary>}
							{tabs === "cookingInstructions" && (
								<ListsItems>
									{instruction.map((step, i) => (
										<ListItem key={step}>{`${i + 1}: ${step}`}</ListItem>
									))}
								</ListsItems>
							)}
							{tabs === "ingredients" && (
								<ListsItems>
									{ingredients.map((ingredient, ind) => (
										<ListItem key={ingredient}>{`${
											ind + 1
										}: ${ingredient}`}</ListItem>
									))}
								</ListsItems>
							)}
						</FirstDetailsMini>
					</FirstDetails>
					{nutrients && (
						<Nutrients>
							<h5>Ingredients nutrients</h5>
							<div className="nutTabs">
								{nutrients.map((nutrient, index) => (
									// <span key={index}>

									<TabsOptions index={index} key={`${index}${nutrient.name}`}>
										<span>{nutrient.name}</span>
									</TabsOptions>
								))}
							</div>
							<IngredientsNutrients>
								{tabsIndex !== null && (
									<>
										<p>
											{nutrients[tabsIndex].nutrition.nutrients.map((nut) =>
												nut.amount > 0
													? `${nut.amount}${nut.unit} of ${nut.name}
											, `
													: ""
											)}
										</p>
										<BreakDownLists
											name={"Caloric Break Down"}
											objItems={nutrients[tabsIndex].nutrition.caloricBreakdown}
											symbolUnit={" %"}
											wps={nutrients[tabsIndex].nutrition.weightPerServing}
										/>
									</>
								)}
							</IngredientsNutrients>
						</Nutrients>
					)}
				</>
			) : (
				<Loading />
			)}
			{/* <SimilarRecipes /> */}
		</RecipeDetailsContainer>
	);
}

export default RecipeDetails;
