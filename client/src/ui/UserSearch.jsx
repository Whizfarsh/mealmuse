import styled from "styled-components";

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	row-gap: 1.4rem;
	padding: 4.2rem 10.8rem;
	max-width: 50rem;
	margin: 0 auto;
	label {
		font-size: 1.6rem;
	}

	select {
		border: none;
		/* border-radius: 1.4rem; */
		padding: 1.6rem;
		background-color: var(--light-1);

		&.active {
			outline: none;
			border: none;
		}
	}

	option {
		padding: 10rem;
	}
`;

const StyledInput = styled.input`
	padding: 1.6rem 1.2rem;
	/* border-radius: 0.8rem; */
	border: none;
	background-color: var(--light-1);
	color: var(--dark-0);

	&:focus {
		outline: none;
	}
`;

const StyledButton = styled.button`
	background-color: var(--dark-3);
	color: var(--light-0);
	padding: 1.2rem 1.8rem;
	border-radius: 1.4rem;
	font-size: 1.8rem;

	border: none;
	cursor: pointer;
`;

function UserSearch() {
	return (
		<StyledForm>
			<label htmlFor="includeIngredients">Include Ingredients</label>
			<StyledInput
				type="text"
				id="includeIngredients"
				placeholder="seperate by commas (,)"
			/>
			<label htmlFor="excludeIngredients">Exclude Ingredients</label>
			<StyledInput
				type="text"
				id="excludeIngredients"
				placeholder="seperate by commas (,)"
			/>
			<label htmlFor="">Select your Diet</label>
			<select name="" id="">
				<option value="">None</option>
				<option value="">Whole30</option>
				<option value="">Vegan</option>
				<option value="">Glutten Free</option>
			</select>
			<StyledButton type="submit">Search my ingredients</StyledButton>
		</StyledForm>
	);
}

export default UserSearch;
