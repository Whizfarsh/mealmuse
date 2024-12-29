/* eslint-disable react/prop-types */
import { GiFruitBowl } from "react-icons/gi";
import styled from "styled-components";
import { useIngredients } from "../context/IngredientsContext";

const StyledIngredients = styled.div`
	background-color: var(--light-1);
	border: 2px solid var(--dark-1);
	border-radius: 0.9rem;
	margin-right: 1rem;
	padding: 1rem;
	cursor: pointer;

	position: fixed;
	bottom: 2vh;
	right: 0;
	z-index: 999;

	display: flex;
	gap: 0.8rem;
	align-items: center;
	justify-content: center;
`;

const IconStyle = styled.div`
	color: var(--dark-2);
`;

function AddedIngredients({ handleClick }) {
	const { addedIng, handleShowAdded } = useIngredients();

	return addedIng.length > 0 ? (
		<StyledIngredients
			onClick={() => {
				handleShowAdded(), handleClick();
			}}
		>
			<IconStyle>
				<GiFruitBowl size={32} />
			</IconStyle>

			<p> {addedIng.length}</p>
		</StyledIngredients>
	) : null;
}

export default AddedIngredients;
