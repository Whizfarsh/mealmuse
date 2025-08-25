/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styled from "styled-components";

const EmptyContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 70vh;
	/* flex-grow: 1; Makes this container take the remaining height */
`;

const Empty = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	row-gap: 1rem;
	flex: 1 0 100%;
	/* flex-grow: 1; Ensures the message takes up all available space in its container */
	/* color: ; */
	text-align: center;

	span {
		font-size: 2.4rem;
	}
`;

const StyledLink = styled(Link)`
	font-size: 1.4rem;
	font-weight: 600;
	color: red !important;
	/* color: var(--dark-2); */
`;

function EmptyMessage({ note, path, pathText }) {
	return (
		<EmptyContainer>
			<Empty>
				<span>{note}</span>
				<StyledLink to={path}>{pathText}</StyledLink>
			</Empty>
		</EmptyContainer>
	);
}

export default EmptyMessage;
