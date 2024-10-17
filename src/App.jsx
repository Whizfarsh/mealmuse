import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Recipes from "./pages/Recipes";
import Favorites from "./pages/Favorites";
import { GlobalProvider } from "./context/GlobalContext";
import { RecipesProvider } from "./context/RecipesContext";
import Login from "./pages/Login";
import { PageProvider } from "./context/Pagecontext";
import RecipeDetails from "./components/RecipeDetails";
// import RecipeNavs from "./components/RecipeNavs";

export default function App() {
	return (
		<GlobalProvider>
			<RecipesProvider>
				<BrowserRouter>
					<PageProvider>
						<Routes>
							<Route path="/" element={<Homepage />} />
							<Route path="/login" element={<Login />} />
							<Route path="/recipes" element={<Recipes />}>
								<Route path="/recipes/:id" element={<RecipeDetails />} />
							</Route>
							<Route path="/favorites" element={<Favorites />} />
						</Routes>
					</PageProvider>
				</BrowserRouter>
			</RecipesProvider>
		</GlobalProvider>
	);
}
