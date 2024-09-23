/* eslint-disable react/prop-types */
import styles from "./Searchform.module.css";

function Searchform({ dispatch }) {
	function handleSearch(e) {
		e.preventDefault();
		if (e.target.value.trim().length <= 3) return;

		dispatch({ type: "searchUpdate", payload: e.target.value });
	}
	return (
		<form
			action="/recipes"
			className={styles.headerForm}
			onSubmit={(e) => e.preventDefault()}
		>
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
