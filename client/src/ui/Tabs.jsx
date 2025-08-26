/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";
import { useRecipes } from "../context/RecipesContext";

const variations = {
	primary: css`
		background-color: var(--light-1);
		border: none;
		border-radius: 0.5rem;
		padding: 0.7rem 1rem;

		&.active,
		&:hover {
			font-weight: 600;
			background-color: var(--dark-2);
			color: var(--light-0);
			transition: background-color 500ms ease-in;
		}
	`,
	secondary: css`
		background-color: var(--light-3);
		color: var(--dark-1);
		border: none;
		margin-right: 1rem;
		padding: 0.3em 1rem;
		margin-bottom: 0.6rem;

		&.active,
		&:hover {
			background-color: var(--dark-2);
			color: var(--light-0);
		}
	`,
};

const Tabs = styled.button`
	cursor: pointer;
	${(props) => variations[props.$variation]};
`;

function MainTabs({ name, children }) {
	// const [tabs, setTabs] = useState(null);
	const { tabs, setTabs } = useRecipes();
	return (
		<Tabs
			$variation="primary"
			className={tabs === name ? "active" : ""}
			onClick={() => setTabs(name)}
		>
			{children}
		</Tabs>
	);
}

function TabsOptions({ index, children }) {
	const { tabsIndex, setTabsIndex } = useRecipes();
	return (
		<Tabs
			$variation="secondary"
			className={tabsIndex === index ? "active" : ""}
			onClick={() => {
				setTabsIndex(Number(index));
			}}
		>
			{children}
		</Tabs>
	);
}

export { MainTabs, TabsOptions };
