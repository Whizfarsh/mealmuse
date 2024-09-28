import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Recipes from "./pages/Recipes";
import Favorites from "./pages/Favorites";
import { GlobalProvider } from "./content/GlobalContent";
import { RecipesProvider } from "./content/RecipesContext";
import Login from "./pages/Login";

export default function App() {
	return (
		<GlobalProvider>
			<RecipesProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Homepage />} />
						<Route path="/login" element={<Login />} />
						<Route path="/recipes" element={<Recipes />} />
						<Route path="recipes/:id" element={<Recipes />} />
						<Route path="/favorites" element={<Favorites />} />
					</Routes>
				</BrowserRouter>
			</RecipesProvider>
		</GlobalProvider>
	);
}
