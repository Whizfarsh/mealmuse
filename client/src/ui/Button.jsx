import styled, { css } from "styled-components";

const variations = {
	primary: css`
		background-color: var(--dark-2);
		border-radius: 1.8rem;
		color: #fff;
		font-weight: 600;
		padding: 1.2rem 0.1rem;
		border: none;
		width: 20rem;
		transition: background-color 0.4s ease-in;

		&:hover {
			background-color: var(--light-1);
			color: var(--dark-2);
		}
	`,
	mini: css`
		padding: 0.7rem 0.9rem;
		background-color: var(--dark-2);
		color: var(--light-0);
		border-radius: 0.9rem;
	`,
	danger: css`
		background-color: red;
		color: #fff;
		padding: 0.8rem;
		border: none;

		border-radius: 0.5rem;
	`,
	loginout: css`
		background-color: var(--dark-3);
		color: var(--light-0);
		border: none;
		padding: 0.7rem 1.4rem;
		border-radius: 0.7rem;
		font-weight: 600;
		cursor: pointer;
	`,
	mainUse: css`
		padding: 1.2rem 2.4rem;
		cursor: pointer;
		border: none;
		border-radius: 0.8rem;

		display: " block";
		background-color: var(--dark-2);
		color: var(--light-0);
	`,
};

const Button = styled.button`
	cursor: pointer;
	${(props) => variations[props.$variation]}
`;

export default Button;
