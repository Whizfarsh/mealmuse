import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Recipes from "./pages/Recipes";
import Favorites from "./pages/Favorites";
import { GlobalProvider } from "./context/GlobalContext";
import { RecipesProvider } from "./context/RecipesContext";
import Login from "./pages/Login";
import { PageProvider } from "./context/Pagecontext";
import RecipeDetails from "./features/recipes/RecipeDetails";
import RecipesMenus from "./features/recipes/RecipesMenus";
import AppLayout from "./ui/AppLayout";

export default function App() {
	return (
		<GlobalProvider>
			<RecipesProvider>
				<BrowserRouter>
					<PageProvider>
						<Routes>
							{/* <Route index element={<Navigate replace to="dashboard" />} /> */}
							<Route path="/" element={<Homepage />} />
							<Route path="/login" element={<Login />} />
							<Route element={<AppLayout />}>
								<Route index element={<Navigate replace to="recipes" />} />
								<Route path="recipes" element={<Recipes />}>
									<Route index element={<RecipesMenus />} />
									<Route path=":id" element={<RecipeDetails />} />
								</Route>
								<Route path="/favorites" element={<Favorites />} />
							</Route>
						</Routes>
					</PageProvider>
				</BrowserRouter>
			</RecipesProvider>
		</GlobalProvider>
	);
}
