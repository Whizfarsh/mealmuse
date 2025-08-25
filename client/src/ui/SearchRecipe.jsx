import { useState } from "react";
import { useRecipes } from "../context/RecipesContext";
import FilterOptions from "./FilterOptions";
import Searchform from "./Searchform";
import styled from "styled-components";

const StyledSearch = styled.div`
	margin: 1.4rem 1.2rem 0 1.2rem;
`;

const RecipesHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	ion-icon {
		font-size: 2.4rem;
		color: var(--dark-2);
		cursor: pointer;
	}
`;

const RecipesDiets = styled.div`
	margin: 1.4rem 0;
	display: flex;
	gap: 1.4rem;

	select,
	input {
		padding: 0.6rem 1.2rem;
		height: 3.4rem;
		width: 30rem;
		border-radius: 0.6rem;
		background-color: var(--light-0);
		border: 1px solid var(--light-1);

		&:focus,
		&:active {
			outline: none;
		}
	}
`;

// const FilterIcon =
// 	styled.ion -
// 	icon`
//   font-size: 2.4rem;
//   color: var(--dark-2);
//   cursor: pointer;
// `;

const filterObj = [
	{
		Name: "diet",
		options: [
			"Whole30",
			"Low FODMAP",
			"Primal",
			"Paleo",
			"Pescetarian",
			"Vegan",
			"Ovo-Vegetarian",
			"Lacto-Vegetarian",
			"Vegetarian",
			"Ketogenic",
			"Gluten Free",
		],
	},
	{
		Name: "Cuisine",
		options: [
			"African",
			"Asian",
			"American",
			"British",
			"Cajun",
			"Caribbean",
			"Chinese",
			"Eastern European",
			"European",
			"French",
			"German",
			"Greek",
			"Indian",
			"Irish",
			"Italian",
			"Japanese",
			"Jewish",
			"Korean",
			"Latin American",
			"Mediterranean",
			"Mexican",
			"Middle Eastern",
			"Nordic",
			"Southern",
			"Spanish",
			"Thai",
			"Vietnamese",
		],
	},
	{
		Name: "Meal types",
		options: [
			"main course",
			"side dish",
			"dessert",
			"appetizer",
			"salad",
			"bread",
			"breakfast",
			"soup",
			"beverage",
			"sauce",
			"marinade",
			"fingerfood",
			"snack",
			"drink",
		],
	},
];

function SearchRecipe() {
	const { dispatch, filterOptions } = useRecipes();
	const [filterClicked, setFilterClicked] = useState(false);

	const selectedMain = filterObj.find(
		(select) => select.Name === filterOptions
	);

	function handleFilterClick() {
		setFilterClicked((filterClicked) => !filterClicked);
	}

	return (
		<StyledSearch>
			<RecipesHeader>
				<Searchform dispatch={dispatch} />
				<ion-icon name="filter-circle-outline" onClick={handleFilterClick} />
			</RecipesHeader>
			<RecipesDiets>
				{filterClicked && (
					<FilterOptions
						optionsArrays={[
							"Select option",
							"diet",
							"Cuisine",
							"Meal types",
							"Intolerances",
							"Exclude Ingredients",
						]}
						dispatch={dispatch}
						selectedMain={selectedMain}
						filterOptions={filterOptions}
					/>
				)}
			</RecipesDiets>
		</StyledSearch>
	);
}

export default SearchRecipe;
