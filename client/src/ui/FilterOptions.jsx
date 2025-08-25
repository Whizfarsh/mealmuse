import { useState } from "react";

/* eslint-disable react/prop-types */
export default function FilterOptions({
	optionsArrays,
	dispatch,
	selectedMain,
	filterOptions,
}) {
	const [selectedName, setSelectedName] = useState("Select option");

	function handleDiet(e) {
		console.log(e.target.value);
		setSelectedName(e.target.value);
		dispatch({ type: "filterOptionUpdate", payload: e.target.value });
	}
	return (
		<div>
			<select value={selectedName} onChange={handleDiet}>
				{optionsArrays.map((el) => (
					<option key={el} value={el}>
						{el}
					</option>
				))}
			</select>
			{filterOptions === "Intolerances" ||
			filterOptions === "Exclude Ingredients" ? (
				<input
					onChange={(e) =>
						dispatch({
							type: `${
								filterOptions === "Intolerances"
									? "updateIntolerances"
									: "updateExcludeText"
							}`,
							payload: e.target.value,
						})
					}
					type="text"
					placeholder={`Enter your ${filterOptions} here ...`}
				/>
			) : filterOptions !== "Select option" ? (
				<select
					onChange={(e) =>
						dispatch({ type: "updateElectedFilter", payload: e.target.value })
					}
				>
					{selectedMain
						? selectedMain.options.map((optn) => (
								<option key={optn} value={optn}>
									{optn}
								</option>
						  ))
						: ""}
				</select>
			) : (
				""
			)}
		</div>
	);
}
