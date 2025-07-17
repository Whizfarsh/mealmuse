/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { cuisine, dietsList, recipeTypesList } from "./apiRecipe";
import { FaSortAlphaDown } from "react-icons/fa";
import { BsCursor } from "react-icons/bs";

const StyledRecipefilters = styled.div`
	padding: 2rem 10rem;
`;

const StyledOptions = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 2rem;

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
	}
`;

const StyledRecipeFilterOptionsLists = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
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
		}
	}
`;

function Recipefilters() {
	return (
		<StyledRecipefilters>
			<StyledOptions>
				<div>
					<button className="active">Cuisine</button>
					<button>Diets</button>
					<button>Meals types</button>
					<button>Cooking durartion</button>
				</div>

				<div>
					<FaSortAlphaDown size={25} />
				</div>
			</StyledOptions>

			<StyledRecipeFilterOptionsLists>
				<RecipeFilterOptionsLists arr={cuisine} />
				<RecipeFilterOptionsLists arr={dietsList} />
				<RecipeFilterOptionsLists arr={recipeTypesList} />
			</StyledRecipeFilterOptionsLists>
		</StyledRecipefilters>
	);
}

export default Recipefilters;

function RecipeFilterOptionsLists({ arr }) {
	return arr.map((item) => <OptionList key={item}>{item} </OptionList>);
}
