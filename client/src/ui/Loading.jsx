import styled, { keyframes } from "styled-components";

// Keyframes for animation
const d7 = keyframes`
  0% {
    background-position: 0% -100%, 50% -100%, 100% -100%;
  }
  16.67% {
    background-position: 0% 50%, 50% -100%, 100% -100%;
  }
  33.33% {
    background-position: 0% 50%, 50% 50%, 100% -100%;
  }
  45%,
  55% {
    background-position: 0% 50%, 50% 50%, 100% 50%;
  }
  66.67% {
    background-position: 0% 200%, 50% 50%, 100% 50%;
  }
  83.33% {
    background-position: 0% 200%, 50% 200%, 100% 50%;
  }
  100% {
    background-position: 0% 200%, 50% 200%, 100% 200%;
  }
`;

// Styled component for the loading container
const Loading = styled.div`
	width: 60vw;
	height: 30vh;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 10rem auto;
`;

// Styled component for the dots animation
const Dots4 = styled.div`
	width: 60px;
	aspect-ratio: 1;
	--_g: no-repeat radial-gradient(farthest-side, #000 90%, #0000);
	background: var(--_g), var(--_g), var(--_g);
	background-size: 25% 25%;
	animation: ${d7} 1s infinite;
`;

function Loader() {
	return (
		<Loading>
			<Dots4 />
		</Loading>
	);
}

export default Loader;
