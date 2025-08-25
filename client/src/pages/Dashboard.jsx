import styled from "styled-components";
import AddIngrredients from "../ui/AddIngrredients";
import HeaderMenu from "../ui/HeaderMenu";
import Footer from "../ui/Footer";
import AddedIngredients from "../ui/AddedIngredients";
import { useEffect, useRef, useState } from "react";
import { useGlobal } from "../context/GlobalContext";
import { useIngredients } from "../context/IngredientsContext";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

const StyledDashBoard = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	margin-top: 2.4rem;
	padding: 3.2rem;

	div {
		display: flex;
		gap: 1.4rem;
	}
`;

const StyledPage = styled.div`
	overflow: hidden;

	display: flex;
	flex-direction: column;
	min-height: 100vh;

	position: relative;
`;

function Dashboard() {
	const { API_Key } = useGlobal();

	const navigate = useNavigate();
	const [toSearch, setToSearch] = useState(false);
	const { ingredients, addedIng, setRecipeResults } = useIngredients();
	const addIngRefs = useRef();

	function handleScroll() {
		if (addIngRefs.current) {
			addIngRefs.current.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	}

	useEffect(
		function () {
			if (!toSearch) return;
			async function getRecipeByIngredients() {
				if (!ingredients) return;
				if (addedIng.length === 0) return;

				try {
					const res = await fetch(
						`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_Key}&ingredients=${ingredients}&number=5`
					);
					const data = await res.json();

					const allIds = data.map((recipe) => recipe.id).join(",");

					const bulkRes = await fetch(
						`https://api.spoonacular.com/recipes/informationBulk?ids=${allIds}&includeNutrition=true&apiKey=${API_Key}`
					);

					const bulkRecipeData = await bulkRes.json();

					setRecipeResults(bulkRecipeData);
					navigate("/searchByIngredients");
				} catch (err) {
					console.log(err.message);
				}
			}

			getRecipeByIngredients();
		},
		[API_Key, ingredients, addedIng, toSearch, setRecipeResults, navigate]
	);

	// const [i]
	return (
		<StyledPage>
			<HeaderMenu bgColor="var(--light-1)" />
			<StyledDashBoard ref={addIngRefs}>
				<AddIngrredients />

				<div>
					<Button $variation="mainUse" onClick={() => setToSearch(true)}>
						Search Ingredients
					</Button>
					<Button $variation="mainUse" onClick={() => navigate("/recipes")}>
						See All Recipes
					</Button>
				</div>
			</StyledDashBoard>
			<AddedIngredients handleClick={handleScroll} />
			<Footer />
		</StyledPage>
	);
}

export default Dashboard;
