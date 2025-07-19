/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { cuisine, dietsList, recipeTypesList } from "./apiRecipe";
import { FaSortAlphaDown } from "react-icons/fa";
import { BsCursor } from "react-icons/bs";
import { useIngredients } from "../../context/IngredientsContext";

const StyledRecipefilters = styled.div`
	padding: 0.6rem 5rem;
	margin-top: 1.4rem;

	@media (max-width: 900px) {
		margin-top: 2rem;
		padding: 0.1rem 1.8rem;
	}
`;

const StyledOptions = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 2rem;

	div {
		@media (max-width: 900px) {
			flex-wrap: wrap;
		}
	}

	button {
		/* background-color: var(--dark-0); */
		color: var(--dark-1);
		border: none;
		padding: 0.8rem 1.6rem;
		border-radius: 0.4rem;
		cursor: pointer;
		font-size: 1.6rem;
		font-weight: 600;
		background-color: transparent;
		margin-right: 0.2rem;

		&:hover {
			background-color: var(--dark-2);
			color: var(--light-1);
		}

		&.active {
			background-color: var(--dark-1);
			color: var(--light-1);
		}

		@media (max-width: 500px) {
			padding: 0.3rem 0.8rem;
		}
	}
`;

const StyledRecipeFilterOptionsLists = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 1rem;
	padding: 2rem 3rem;
	font-size: 1.4rem;
`;

const OptionList = styled.span`
	cursor: pointer;

	&.active {
		&.active {
			background-color: var(--dark-1);
			color: var(--light-1);
			padding: 0.5rem 1rem;
		}
	}
`;

function Recipefilters() {
	const {
		selectedFilter,
		selectedCuisine,
		selectedDiet,
		selectedType,
		handleFilterChange,
		handleCuisineChange,
		handleDietChange,
		handleTypeChange,
	} = useIngredients();

	console.log(selectedFilter, selectedCuisine, selectedDiet, selectedType);
	return (
		<StyledRecipefilters>
			<StyledOptions>
				<div>
					<button
						className={selectedFilter === "all" ? "active" : ""}
						onClick={() => handleFilterChange("all")}
					>
						All
					</button>
					<button
						className={selectedFilter === "cuisine" ? "active" : ""}
						onClick={() => handleFilterChange("cuisine")}
					>
						Cuisine
					</button>
					<button
						className={selectedFilter === "diets" ? "active" : ""}
						onClick={() => handleFilterChange("diets")}
					>
						Diets
					</button>
					<button
						className={selectedFilter === "mealtype" ? "active" : ""}
						onClick={() => handleFilterChange("mealtype")}
					>
						Meals types
					</button>
					<button
						className={selectedFilter === "duration" ? "active" : ""}
						onClick={() => handleFilterChange("duration")}
					>
						Cooking durartion
					</button>
				</div>

				<div>
					<FaSortAlphaDown size={25} />
				</div>
			</StyledOptions>

			<StyledRecipeFilterOptionsLists>
				{selectedFilter === "cuisine" && (
					<RecipeFilterOptionsLists
						arr={cuisine}
						onClick={handleCuisineChange}
						selected={selectedCuisine}
					/>
				)}
				{selectedFilter === "diets" && (
					<RecipeFilterOptionsLists
						arr={dietsList}
						onClick={handleDietChange}
						selected={selectedDiet}
					/>
				)}
				{selectedFilter === "mealtype" && (
					<RecipeFilterOptionsLists
						arr={recipeTypesList}
						onClick={handleTypeChange}
						selected={selectedType}
					/>
				)}
			</StyledRecipeFilterOptionsLists>
		</StyledRecipefilters>
	);
}

export default Recipefilters;

function RecipeFilterOptionsLists({ arr, onClick, selected }) {
	return (
		<>
			<OptionList
				className={selected === "all" ? "active" : ""}
				onClick={() => onClick("all")}
			>
				All
			</OptionList>
			{arr.map((item) => (
				<OptionList
					className={selected === item ? "active" : ""}
					key={item}
					onClick={() => onClick(item)}
				>
					{item}{" "}
				</OptionList>
			))}
		</>
	);
}
