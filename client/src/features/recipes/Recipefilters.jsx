/* eslint-disable react/prop-types */
import styled from "styled-components";
import { FaSortAlphaDown } from "react-icons/fa";
import { useState } from "react";
import { useFilter } from "../../context/FilterContext";
import { useGlobal } from "../../context/GlobalContext";

const filterOptions = ["all", "cuisine", "diets", "mealsTypes", "duration"];

const StyledRecipefilters = styled.div`
	margin: 1.4rem;

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
	padding: 2rem 1.4rem;
	font-size: 1.4rem;
`;

const OptionList = styled.span`
	cursor: pointer;
	padding: 0.4rem 0.5rem;
	background-color: var(--light-1);

	&.active {
		background-color: var(--dark-1);
		color: var(--light-1);
	}
`;

const StyledSelected = styled.select`
	width: 30rem;
	height: 3rem;
	border-radius: 1rem;
	background-color: var(--light-1);
	padding: 0.5rem 1rem;
	border: 1px solid var(--dark-1);
	appearance: none; /* For most browsers */
	-webkit-appearance: none; /* Safari/Chrome */
	-moz-appearance: none; /* Firefox */

	@media (max-width: 900px) {
		width: 48rem;
	}

	option {
		margin: 0.5rem;
		background-color: var(--light-0);
		color: var(--dark-1);
	}
`;

function Recipefilters() {
	const { allDiets, allCusines, allTypes: recipeTypesList } = useGlobal();

	const [showSort, setShowSort] = useState(false);

	const {
		selectedFilter,
		selectedCuisine,
		selectedDiet,
		selectedType,
		duration,
		sortby,
		dispatch,
	} = useFilter();

	return (
		<StyledRecipefilters>
			<StyledOptions>
				<div>
					{filterOptions.map((option) => (
						<button
							className={selectedFilter.includes(option) ? "active" : ""}
							onClick={() =>
								dispatch({ type: "updateSelectedFilter", payload: option })
							}
							key={option}
						>
							{`${option[0].toUpperCase()}${option.slice(1)}`}
						</button>
					))}
				</div>

				<div>
					<FaSortAlphaDown size={25} onClick={() => setShowSort((s) => !s)} />
				</div>
			</StyledOptions>

			<StyledRecipeFilterOptionsLists>
				{selectedFilter === "cuisine" && (
					<RecipeFilterOptionsLists
						arr={allCusines}
						onClick={(item) => {
							dispatch({
								type: "updateSelectedCuisine",
								payload: item,
							});
						}}
						selected={selectedCuisine}
					/>
				)}
				{selectedFilter === "diets" && (
					<RecipeFilterOptionsLists
						arr={allDiets}
						onClick={(item) =>
							dispatch({
								type: "updateSelectedDiet",
								payload: item,
							})
						}
						selected={selectedDiet}
					/>
				)}
				{selectedFilter === "mealsTypes" && (
					<RecipeFilterOptionsLists
						arr={recipeTypesList}
						onClick={(item) =>
							dispatch({
								type: "updateSelectedType",
								payload: item._id,
							})
						}
						selected={selectedType}
					/>
				)}
				{selectedFilter === "duration" && (
					<StyledSelected
						value={duration}
						onChange={(e) =>
							dispatch({
								type: "updateDuration",
								payload: e.target.value,
							})
						}
					>
						<option value="all">All</option>
						<option value="15"> 0-15 min</option>
						<option value="30">15-30 min</option>
						<option value="60">30-60 min</option>
						<option value="61"> 60+ min</option>
					</StyledSelected>
				)}
				{showSort && (
					<StyledSelected
						value={sortby}
						onChange={(e) =>
							dispatch({
								type: "updateSort",
								payload: e.target.value,
							})
						}
					>
						<option value="none">None</option>
						<option value="name">Sort by Name</option>
						<option value="duration">Sort by Duration</option>
						<option value="servings">Sort by Servings</option>
					</StyledSelected>
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
					key={item._id}
					onClick={() => onClick(item)}
				>
					{item.name}
				</OptionList>
			))}
		</>
	);
}
