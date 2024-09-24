import { useNavigate } from "react-router-dom";
import styles from "./Searchform.module.css";
import { useRecipes } from "../content/RecipesContext";

function Searchform() {
	const { dispatch, searchQuery } = useRecipes();
	const navigate = useNavigate();
	function handleSearch(e) {
		e.preventDefault();
		if (e.target.value.trim().length <= 3) return;

		dispatch({ type: "searchUpdate", payload: e.target.value });
		navigate(`/recipes?q=${searchQuery}`);
	}

	return (
		<form className={styles.headerForm} onSubmit={(e) => e.preventDefault()}>
			<input
				onChange={handleSearch}
				className={styles.serachInput}
				type="text"
				placeholder="Search recipe..."
			/>
			<ion-icon name="search-outline"></ion-icon>
		</form>
	);
}

export default Searchform;
