/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Button from "./Button";
import { useGlobal } from "../context/GlobalContext";
import { useEffect, useState } from "react";
import Meals, { MealsLists } from "./Meals";
import { useIngredients } from "../context/IngredientsContext";

const StyledAdd = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100rem;
	gap: 1.2rem;

	padding: 0 10.4rem;
	p {
		font-size: 3.2rem;
		text-align: center;
		margin-bottom: 0.4rem;
	}

	@media (max-width: 900px) {
		padding: 0 1.2rem;
		width: 100%;
		p {
			font-size: 2rem;
		}
	}
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	padding: 0 1.2rem;
	input {
		width: 60rem;
		height: 4.8rem;
		padding: 1.2rem 1.4rem;
		border: 1px solid var(--dark-2);
		border-radius: 1.8rem;

		&:focus,
		&.active {
			border: none;
			outline: none;
		}
	}

	p {
		font-size: 1.2rem;
	}

	@media (max-width: 900px) {
		input {
			width: 30rem;
			height: 3.2rem;
		}
		p {
			/* font-size: 0.5rem; */
		}
	}
`;

const IngredientsLists = styled.ul`
	list-style: none;

	display: flex;
	gap: 1.2rem;

	li {
		background-color: red;
		color: #fff;
		padding: 0.6rem 1.2rem;
		border-radius: 2.4rem;

		&.added {
			background-color: var(--dark-2);
		}
	}

	@media (max-width: 450px) {
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 0.6rem;
	}
`;

const MealsWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(
		auto-fill,
		minmax(255px, 1fr)
	); /* Adjust size as needed */
	gap: 1.4rem;
	width: 100%;
	margin-top: 2rem; /* Optional spacing */
`;

function AddIngrredients() {
	const { API_Key } = useGlobal();

	const {
		ingredientQuery,
		setIngredientQuery,
		ingredientsLists,
		setIngredientsLists,
		setAddedIng,
		recipeResults,
		setRecipeResults,
		ingredients,
		addedIng,
		showAdded,
		setShowAdded,
	} = useIngredients();

	useEffect(
		function () {
			async function getIngredients() {
				if (ingredientQuery.length <= 3) {
					setIngredientsLists([]);
					return;
				}
				try {
					const res = await fetch(
						`https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${API_Key}&query=${ingredientQuery}&number=5`
					);

					if (!res.ok) throw new Error("Couldn't fetch ingredients");

					const data = await res.json();
					if (!data) throw new Error("No matching ingredients for that query");

					setIngredientsLists(data);
					// console.log(data);
				} catch (err) {
					console.error(err.message);
				}
			}
			getIngredients();
		},

		[API_Key, ingredientQuery, setIngredientsLists]
	);

	function handleQuery(e) {
		e.preventDefault();

		setIngredientQuery(e.target.value);
		setShowAdded(false);
	}

	function handeleAdded(ing) {
		setAddedIng((ings) =>
			ings.includes(ing) ? ings.filter((item) => item !== ing) : [...ings, ing]
		);

		// console.log(addedIng);
	}

	useEffect(
		function () {
			async function getRecipeByIngredients() {
				// if (!ingredients) return;
				// if (addedIng.length === 0) return;

				if (addedIng.length === 0) {
					setRecipeResults([]);
					return;
				}

				try {
					const res = await fetch(
						`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_Key}&ingredients=${ingredients}&number=5 `
					);
					const data = await res.json();

					// console.log(data);
					setRecipeResults(data);
					// console.log(recipeResults);
				} catch (err) {
					console.log(err.message);
				}
			}

			getRecipeByIngredients();
		},
		[API_Key, ingredients, addedIng, setRecipeResults]
	);

	// const isAdded = true;
	return (
		<>
			<StyledAdd>
				<p>
					Add the ingredients you have , we provide you with some{" "}
					<strong>Excellent</strong> Recipes
				</p>
				<Form action="">
					<input
						type="text"
						name=""
						id=""
						placeholder="ingredients..."
						onChange={handleQuery}
					/>
					{ingredientsLists.length > 0 && (
						<>
							<IngredientsLists>
								{showAdded
									? addedIng.map((ing) => (
											<li
												key={ing}
												onClick={() => handeleAdded(ing)}
												className={addedIng.includes(ing) ? "added" : ""}
											>
												{`${ing} ${addedIng.includes(ing) ? "-" : "+"}`}
											</li>
									  ))
									: ingredientsLists.map(
											(ing) => (
												<li
													key={ing.name}
													onClick={() => handeleAdded(ing.name)}
													className={addedIng.includes(ing.name) ? "added" : ""}
												>
													{`${ing.name} ${
														addedIng.includes(ing.name) ? "-" : "+"
													}`}
												</li>
											)
											// console.log(ing.name);
									  )}
							</IngredientsLists>
							{addedIng.length > 0 && (
								<p>
									You have added {addedIng.length} ingredients which are{" "}
									{ingredients}
								</p>
							)}
						</>
					)}
				</Form>
			</StyledAdd>
			{recipeResults.length > 0 && (
				<MealsWrapper>
					{recipeResults.map((recipe) => (
						<MealsLists recipe={recipe} key={recipe.id} />
					))}
				</MealsWrapper>
			)}
		</>
	);
}

export default AddIngrredients;
