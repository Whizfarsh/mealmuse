/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useGlobal } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import styled from "styled-components";

const RecipesContainer = styled.div`
	max-width: 100%;
	margin-top: -8rem;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	column-gap: 7rem;
	row-gap: 2rem;
	justify-content: space-between;
	align-items: center;
	place-items: center;
	padding: 1.4rem 5rem 1.4rem 2rem;
	color: var(--dark-0);

	@media (max-width: 39.94rem) {
		grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
	}

	@media (max-width: 31.25rem) {
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		margin-top: -13rem;
		padding: 0.4rem 4rem;
	}

	@media (max-width: 28.75rem) {
		margin-top: -9rem;
	}
`;

const RecipeCard = styled.div`
	max-width: 100%;
	height: 18rem;
	background-color: var(--light-1);
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0rem 1.4rem;
	border-radius: 2rem;
	box-shadow: 3px 6px 10px rgba(19, 1, 10, 0.7);
	cursor: pointer;
`;

const RecipeTexts = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 1rem;
`;

const RecipeName = styled.p`
	font-size: 1.8rem;
	font-weight: 600;
`;

const RecipeDetails = styled.p`
	display: flex;
	align-items: center;
	column-gap: 0.5rem;

	ion-icon {
		color: red;
		font-size: 2rem;
	}
`;

const RecipeImage = styled.img`
	padding: 0.8rem 1.2rem;
	width: 80%;
	height: 80%;
	margin-right: -7rem;
	border-radius: 0 10rem 10rem 0;
	object-fit: cover;

	@media (max-width: 31.25rem) {
		margin-right: -5rem;
	}
`;

// const Icon =
// 	styled.ion -
// 	icon`
//   color: red;
//   font-size: 2rem;
// `;

// Main Component
function HomeRandomMeal() {
	const { API_Key, convertMinutes } = useGlobal();
	const [homeRecipe, setHomeRecipe] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await fetch(
					`https://api.spoonacular.com/recipes/random?apiKey=${API_Key}&number=6`
				);
				const data = await res.json();
				setHomeRecipe(data.recipes);
			} catch (err) {
				console.log(err.message);
			}
		}
		fetchData();
	}, [API_Key]);

	return (
		<RecipesContainer>
			{homeRecipe.map((recipe) => (
				<RecipeLists
					recipe={recipe}
					key={recipe.id}
					convertMinutes={convertMinutes}
				/>
			))}
		</RecipesContainer>
	);
}

function RecipeLists({ recipe, convertMinutes }) {
	return (
		<>
			{recipe.title.length < 50 && (
				<Link to={`/recipes/${recipe.id}`}>
					<RecipeCard>
						<RecipeTexts>
							<RecipeName>{recipe.title}</RecipeName>
							<RecipeDetails>
								<ion-icon name="people-outline"></ion-icon>
								<span>{recipe.servings} servings</span>
							</RecipeDetails>
							<RecipeDetails>
								<ion-icon name="alarm-outline"></ion-icon>
								<span>
									{recipe.readyInMinutes < 60
										? recipe.readyInMinutes
										: convertMinutes(recipe.readyInMinutes)}{" "}
									Minutes
								</span>
							</RecipeDetails>
						</RecipeTexts>
						<RecipeImage src={recipe.image} alt={recipe.title} />
					</RecipeCard>
				</Link>
			)}
		</>
	);
}

export default HomeRandomMeal;
