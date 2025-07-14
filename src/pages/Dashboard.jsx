import styled from "styled-components";
import AddIngrredients from "../ui/AddIngrredients";
import HeaderMenu from "../ui/HeaderMenu";
import Footer from "../ui/Footer";
import AddedIngredients from "../ui/AddedIngredients";
import { useEffect, useRef, useState } from "react";
import { useGlobal } from "../context/GlobalContext";
import { useIngredients } from "../context/IngredientsContext";
import { useNavigate } from "react-router-dom";

const StyledDashBoard = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	margin-top: 2.4rem;
	padding: 3.2rem;
`;

const StyledPage = styled.div`
	overflow: hidden;

	display: flex;
	flex-direction: column;
	min-height: 100vh;

	position: relative;
`;

const SearchButton = styled.button`
	margin-top: 2.4rem;
	padding: 1.2rem 2.4rem;
	cursor: pointer;
	border: none;
	border-radius: 0.8rem;

	display: " block";
	background-color: var(--dark-2);
	color: var(--light-0);
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

	function handleSearch() {
		setToSearch(true);
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
					navigate("/recipes");
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
				<SearchButton onClick={handleSearch}>Search</SearchButton>
			</StyledDashBoard>
			<AddedIngredients handleClick={handleScroll} />
			<Footer />
		</StyledPage>
	);
}

export default Dashboard;
