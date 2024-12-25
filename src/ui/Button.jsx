import styled, { css } from "styled-components";

const variations = {
	primary: css`
		border-radius: 1.8rem;
		background-color: var(--dark-2);
		color: #fff;
		font-weight: 600;
		padding: 1.2rem;
		border: none;
		width: 20rem;
		transition: background-color 0.4s ease-in;

		&:hover {
			background-color: var(--light-1);
			color: var(--dark-2);
		}
	`,
};

const Button = styled.button`
	cursor: pointer;
	${(props) => variations[props.variations]}
`;

export default Button;
