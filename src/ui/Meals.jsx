/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { usePage } from "../context/Pagecontext";
import { useGlobal } from "../context/GlobalContext";
import styled from "styled-components";
import { useRecipes } from "../context/RecipesContext";

const MealsContainer = styled.div`
	/* margin: 6rem 0; */
	/* padding: 2.4rem 5.2rem; */
	/* background-color: var(--light-0); */
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	h2 {
		align-self: flex-start;
		font-size: 3.2rem;
		margin-bottom: 1.3rem;
	}
`;

const MealLists = styled.div`
	width: 100%;
	display: grid;
	/* flex-wrap: wrap; */
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 2.4rem;
	padding: 2.4rem 0rem;
`;

const MealCard = styled.div`
	box-shadow: 3px 6px 10px rgba(19, 1, 10, 0.4);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: var(--light-1);
	border-radius: 1rem;
	cursor: pointer;

	img {
		border-radius: inherit;
		width: 100%;
		height: 20rem;
		object-fit: cover;
	}

	h4 {
		padding: 0.4rem 1rem;
		text-align: center;
		margin: 0.6rem 0;
	}
`;

const Info = styled.div`
	display: flex;
	gap: 1rem;
	padding: 1rem;

	p {
		display: flex;
		align-items: center;
		column-gap: 0.5rem;

		ion-icon {
			font-size: 2rem;
			color: red;
		}
	}
`;

const DeleteButton = styled.button`
	border: none;
	background-color: var(--dark-2);
	color: var(--light-0);
	padding: 0.4rem 0.8rem;
	border-radius: 0.3rem;
	cursor: pointer;
	margin-bottom: 1rem;
`;

const StyledLink = styled(Link)`
	color: var(--dark-2);
	text-decoration: none;

	&.active {
		color: var(--light-4);
	}
`;

function Meals({ title, recipes, className }) {
	return (
		<MealsContainer className={className}>
			<h2>{title}</h2>
			{/* <Grid> */}
			<MealLists>
				{recipes.map((recipe) => (
					<MealsLists recipe={recipe} key={recipe.id} />
					//key={recipe.id}
				))}
			</MealLists>
			{/* </Grid> */}
		</MealsContainer>
	);
}

export function MealsLists({ recipe }) {
	const { curPage } = usePage();
	const { convertMinutes } = useGlobal();
	const { handleFavoriteDelete } = useRecipes();

	function onDeleteItem(e) {
		e.preventDefault();
		handleFavoriteDelete(recipe.id);
	}

	return (
		// <Link to={`/recipes/${recipe.id}`}>
		<StyledLink to={`/recipes/${recipe.id}`}>
			<MealCard>
				<img
					src={
						recipe.image ||
						`https://img.spoonacular.com/recipes/${recipe.id}-556x370.jpg` ||
						"../assets/noImage.jpg"
					}
					alt={recipe.title}
				/>
				<h4>{recipe.title}</h4>
				{recipe.servings || recipe.readyInMinutes ? (
					<Info>
						<p>
							<ion-icon name="alarm-outline"></ion-icon>
							<span>
								{recipe.readyInMinutes < 60
									? recipe.readyInMinutes
									: convertMinutes(recipe.readyInMinutes)}{" "}
								Minutes
							</span>
						</p>
						|
						<p>
							<ion-icon name="people-outline"></ion-icon>
							<span>{recipe.servings} Servings</span>
						</p>
					</Info>
				) : null}
				{curPage === "/favorites" && (
					<DeleteButton onClick={onDeleteItem}>Delete</DeleteButton>
				)}
			</MealCard>
		</StyledLink>
	);
}

export default Meals;
