import styled from "styled-components";
import Button from "../../ui/Button";
import { useEffect, useState } from "react";
import { useRecipes } from "../../context/RecipesContext";

const StyledAddRecipe = styled.div`
	margin: 4rem 20rem;
	padding: 2.5rem 4.8rem;
	border: 2px solid var(--light-2);
	border-radius: 0.5rem;
	box-shadow: 1px 1px 10px rgba(67, 32, 32, 0.5);

	h5 {
		font-size: 2.8rem;
		color: var(--dark-2);
		margin-bottom: 1.2rem;
	}

	.addIns {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		flex-wrap: wrap;
	}

	textarea {
		height: 80px;
		padding: 12px 14px;
		font-size: 16px;
		line-height: 1.45;
		border: 1px solid var(--dark-1);
		background-color: #e5f5e9;
		border-radius: 8px;
		resize: vertical;
		overflow-wrap: break-word;
		white-space: pre-wrap;
		word-wrap: break-word;
		outline: none;
	}
	@media (max-width: 1200px) {
		margin: 2rem 14rem;
	}
	@media (max-width: 700px) {
		margin: 2rem 6rem;
	}
	@media (max-width: 500px) {
		margin: 2rem 2rem;
	}
`;

const StyledForm = styled.form`
	display: flex;
	gap: 1rem;
	justify-content: space-between;
	flex-direction: column;
	width: 100%;

	.selectBtn {
		background-color: var(--dark-2);
		color: var(--light-0);
		padding: 1rem 1.2rem;
		border-radius: 0.4rem;
		cursor: pointer;
	}

	.resSummary,
	.resInstruction {
		display: flex;
		flex-direction: column;
		row-gap: 0.8rem;
		margin-top: 0.6rem;

		h6 {
			font-size: 1.4rem;
		}
	}

	.resNameWtoptns {
		display: flex;
		gap: 0.7rem;
		flex-wrap: wrap;
	}
	.slctBtns {
		display: flex;
		gap: 0.7rem;
	}
`;

const StyledInput = styled.input`
	height: 4.2rem;
	width: 48.5%;
	/* width: 40rem; */
	padding: 0.8rem 0.8rem;
	border: 1px solid var(--dark-1);
	border-radius: 0.8rem;
	background-color: #e5f5e9;

	&:focus {
		outline: none;
	}

	@media (max-width: 750px) {
		width: 100%;
	}
`;

function AddRecipe() {
	document.title = "Add a recipe | Mealmuse";

	const { handleAddToRecipes } = useRecipes();
	// /api/v1/diets
	const [resName, setResName] = useState("");
	const [resDiets, setResDiets] = useState([]);
	const [resCusine, setResCusine] = useState([]);
	const [resSummary, setResSummary] = useState("");
	const [instruction, setInstruction] = useState("");
	const [resIngredients, setResIngredients] = useState("");
	const [resCookingDuration, setResCookingDuration] = useState("");
	const [resPreparationTime, setResPreparationTime] = useState("");
	const [resTotalServings, setResTotalServings] = useState("");

	const [allDiets, setAllDiets] = useState([]);
	const [allCusines, setAllCusines] = useState([]);

	const [status, setStatus] = useState();

	const [toShow, setToShow] = useState("");

	useEffect(() => {
		async function getAllDiets() {
			const res = await fetch("/api/v1/diets");
			const data = await res.json();

			setAllDiets(data.data.data);
		}
		getAllDiets();
	}, []);

	useEffect(() => {
		async function getAllCuisines() {
			const res = await fetch("/api/v1/cuisines");
			const data = await res.json();

			setAllCusines(data.data.data);
		}
		getAllCuisines();
	}, []);

	function handleMainTabs(option) {
		setToShow(toShow === option ? "" : option);
	}

	function handleTabOption(array, item) {
		console.log(array);
		return array.includes(item)
			? array.filter((el) => el !== item)
			: [...array, item];
	}

	function convertToArray(item) {
		return item.split(/[\n,]+/);
	}

	function handleAddRecipe(e) {
		e.preventDefault();

		if (
			!resName.trim() ||
			resDiets.length === 0 ||
			resCusine.length === 0 ||
			!resSummary.trim() ||
			!instruction.trim() ||
			!resIngredients.trim() ||
			!resCookingDuration.trim() ||
			!resPreparationTime.trim() ||
			!resTotalServings.trim()
		) {
			setStatus("error");
		} else {
			const newRecipe = {
				name: resName,
				diets: resDiets,
				cuisines: resCusine,
				summary: resSummary,
				instruction: convertToArray(instruction),
				ingredients: convertToArray(resIngredients),
				cookingDuration: Number(resCookingDuration),
				preparationTime: Number(resPreparationTime),
				totalServings: Number(resTotalServings),
			};

			handleAddToRecipes(newRecipe);
			setStatus("success");
		}

		setResName("");
		setResDiets([]);
		setResCusine([]);
		setResSummary("");
		setInstruction("");
		setResIngredients("");
		setResCookingDuration("");
		setResPreparationTime("");
		setResTotalServings("");
	}
	return (
		<StyledAddRecipe>
			<h5>Add a recipe</h5>
			<StyledForm>
				<div className="resNameWtoptns">
					<StyledInput
						type="text"
						placeholder="Name"
						value={resName}
						onChange={(e) => setResName(e.target.value)}
					/>
					<div className="slctBtns">
						<Button
							$variation="tabsBtns"
							className={toShow === "diets" ? "active" : ""}
							onClick={() => handleMainTabs("diets")}
						>
							Diets
						</Button>
						<Button
							$variation="tabsBtns"
							className={toShow === "cuisines" ? "active" : ""}
							onClick={() => handleMainTabs("cuisines")}
						>
							Cuisine
						</Button>
					</div>
					<div>
						<div style={{ display: "flex", flexWrap: "wrap", gap: ".7rem" }}>
							{toShow === "diets" &&
								allDiets.map((d) => (
									<Button
										$variation="tabBtn"
										className={resDiets.includes(d._id) ? "active" : ""}
										key={d.name}
										onClick={() =>
											setResDiets((nd) => handleTabOption(nd, d._id))
										}
									>
										{d.name}
									</Button>
								))}
							{toShow === "cuisines" &&
								allCusines.map((c) => (
									<Button
										$variation="tabBtn"
										className={resCusine.includes(c._id) ? "active" : ""}
										key={c.name}
										onClick={() =>
											setResCusine((nc) => handleTabOption(nc, c._id))
										}
									>
										{c.name}
									</Button>
								))}
						</div>
					</div>
				</div>
				<div className="resSummary">
					<h6>Summry</h6>
					<textarea
						id="summary"
						name="summary"
						placeholder="Short Recipe summary: what makes this recipe special..."
						rows="4"
						wrap="soft"
						value={resSummary}
						onChange={(e) => setResSummary(e.target.value)}
					/>
				</div>
				<div className="addIns">
					<div className="resInstruction">
						<h6>Instructions</h6>
						<textarea
							id="summary"
							name="summary"
							placeholder="separate Recipe instructions with a comma (,)"
							rows="4"
							wrap="soft"
							value={instruction}
							onChange={(e) => setInstruction(e.target.value)}
						/>
					</div>
				</div>
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						gap: "1rem",
						justifyContent: "space-between",
					}}
				>
					<StyledInput
						type="text"
						placeholder="ingredients separate with a comma ','"
						value={resIngredients}
						onChange={(e) => setResIngredients(e.target.value)}
					/>
					<StyledInput
						type="number"
						placeholder="Preparation time (10)"
						value={resPreparationTime}
						onChange={(e) => setResPreparationTime(e.target.value)}
					/>
					<StyledInput
						type="number"
						placeholder="Cooking duration (25)"
						value={resCookingDuration}
						onChange={(e) => setResCookingDuration(e.target.value)}
					/>
					<StyledInput
						type="number"
						placeholder="Total servings (5)"
						value={resTotalServings}
						onChange={(e) => setResTotalServings(e.target.value)}
					/>
				</div>
				{status === "error" ? (
					<p style={{ color: "red" }}>All informations are required</p>
				) : status === "success" ? (
					<p style={{ color: " var(--dark-2)" }}>
						Recipe has been added Successfully !!!
					</p>
				) : (
					""
				)}
				<div>
					<Button $variation="mainUse" onClick={handleAddRecipe}>
						Submit Recipe
					</Button>
				</div>
			</StyledForm>
		</StyledAddRecipe>
	);
}

export default AddRecipe;
