import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Recipes from "./pages/Recipes";
import Favorites from "./pages/Favorites";
import { useState } from "react";
import { GlobalProvider } from "./content/GlobalContent";
// import RecipeDetails from "./components/RecipeDetails";

// const API_Key = "ae0fc98731a34ef1a9dd2aff9448752b";
// const API_Key = "c6414a7b8638405386aee74a1cee23e2";
const API_Key = "1f390112146b438c9fff53abe569e602";
// const API_Key = "58f1453b84d44ea5a09a1bfe25c4a436";
// const API_Key = "";

export default function App() {
	const [favorites, setFavorites] = useState(() => {
		const getFavorites = localStorage.getItem("favorites");
		return getFavorites ? JSON.parse(getFavorites) : [];
	});
	return (
		<GlobalProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/recipes" element={<Recipes API_Key={API_Key} />} />
					<Route
						path="recipes/:id"
						element={
							<Recipes
								API_Key={API_Key}
								setFavorites={setFavorites}
								favorites={favorites}
							/>
						}
					/>
					<Route
						path="/favorites"
						element={<Favorites API_Key={API_Key} favorites={favorites} />}
					/>
				</Routes>
			</BrowserRouter>
		</GlobalProvider>
	);
}
