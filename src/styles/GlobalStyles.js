import { createGlobalStyle } from "styled-components";

// import ".index.css";

const GlobalStyles = createGlobalStyle`

:root {
	--handFonts: "Pacifico";

	--light-0: #eaf6ec;
	--light-1: #bfe5c7;
	--light-3: #a9dcb5;
	--light-2: #7eca8f;
	--light-4: #69c17d;

	--color-default-0: #53b96a;

	--dark-0: #041107;
	--dark-1: #0c3215;
	--dark-2: #145423;
	--dark-3: #1c7530;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

html {
	font-size: 62.5%;
}

body {
	font-size: 1.4rem;
	font-family: "Poppins";
	line-height: 1.1;
	background-color: var(--light-0);
	/* background-color: #f3f3f3; */
}

.horizontalLists {
	display: flex;
	align-items: center;
	column-gap: 1.2rem;
}

li {
	list-style: none;
	cursor: pointer;
}

.btn-active-01 {
	background-color: var(--dark-2);
	color: var(--light-0);
	border: none;
	border-radius: 1.2rem;
	padding: 0.5rem 1.4rem;
}

`;

export default GlobalStyles;
