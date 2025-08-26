/* eslint-disable react/prop-types */
import styled from "styled-components";

const StyledDiv = styled.div`
	display: flex;
	column-gap: 1rem;

	p {
		padding: 0.2rem 0.5rem;
	}

	p.title {
		background-color: var(--dark-2);
		color: var(--light-0);
		border-radius: 0 1rem 1rem 0;
		font-size: 1.3rem;
		padding: 0.5rem 0.7rem;
	}
`;

function ObjectslIsts({ name, objItems, symbolUnit, wps }) {
	return (
		<StyledDiv>
			<div>
				<p className="title">{name}</p>
				<span>
					{Object.entries(objItems).map(([key, value]) => (
						<p key={key}>
							{key.replace("percent", "")}: {value}
							{symbolUnit}
						</p>
					))}
				</span>
			</div>

			<div>
				<p className="title">Weight Per serving:</p>
				<p>
					{wps.amount}
					{wps.unit}
				</p>
			</div>
		</StyledDiv>
	);
}

export default ObjectslIsts;
