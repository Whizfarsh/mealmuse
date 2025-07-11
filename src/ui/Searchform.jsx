import styled from "styled-components";
import { useRecipes } from "../context/RecipesContext";
import { useNavigate } from "react-router-dom";

const HeaderForm = styled.form`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: 1px solid var(--dark-1);
	padding: 0.6rem 1rem;
	border-radius: 1.8rem;
	background-color: var(--light-0);

	&:focus,
	&:active {
		background-color: transparent;
		border: 1px solid var(--dark-0);
	}

	ion-icon {
		font-size: 1.5rem;
		color: var(--dark-1);
	}
`;

const SearchInput = styled.input`
	background: transparent;
	border-radius: 1.8rem;
	border: none;
	height: 2rem;
	padding: 0.3rem 0.5rem;

	&:focus {
		outline: none;
	}
`;

// const SearchIcon =
// 	styled.ion -
// 	icon`
//   font-size: 1.5rem;
//   color: var(--dark-1);
// `;

function Searchform() {
	const { dispatch } = useRecipes();
	const navigate = useNavigate();

	function handleSearch(e) {
		e.preventDefault();
		if (e.target.value.trim().length <= 3) return;

		dispatch({ type: "searchUpdate", payload: e.target.value });
		navigate("/recipes");
	}

	return (
		<HeaderForm onSubmit={(e) => e.preventDefault()}>
			<SearchInput
				onChange={handleSearch}
				type="text"
				placeholder="Search recipe..."
			/>
			<ion-icon name="search-outline" />
		</HeaderForm>
	);
}

export default Searchform;
