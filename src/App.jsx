import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Homepage from "./pages/Homepage";
import Recipes from "./pages/Recipes";
import Favorites from "./pages/Favorites";
import { GlobalProvider } from "./context/GlobalContext";
import { RecipesProvider } from "./context/RecipesContext";
import Login from "./pages/Login";
import { PageProvider } from "./context/Pagecontext";
import RecipeDetails from "./features/recipes/RecipeDetails";
import RecipesMenus from "./features/recipes/RecipesMenus";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import GlobalStyles from "./styles/GlobalStyles";
import { IngredientsProvider } from "./context/IngredientsContext";
import { UserProvider } from "./context/UserContext";
import IngredientsSearch from "./pages/IngredientsSearch";
import { FilterProvider } from "./context/FilterContext";

export default function App() {
	return (
		<GlobalProvider>
			<RecipesProvider>
				<GlobalStyles />
				<BrowserRouter>
					<PageProvider>
						<IngredientsProvider>
							<UserProvider>
								<FilterProvider>
									<Routes>
										<Route path="/" element={<Dashboard />} />
										<Route path="/login" element={<Login />} />
										<Route element={<AppLayout />}>
											<Route
												path="/searchByIngredients"
												element={<IngredientsSearch />}
											/>
											<Route path="/recipes" element={<Recipes />}>
												<Route index element={<RecipesMenus />} />
												<Route path=":id" element={<RecipeDetails />} />
											</Route>

											<Route path="/favorites" element={<Favorites />} />
										</Route>
									</Routes>
								</FilterProvider>
							</UserProvider>
						</IngredientsProvider>
					</PageProvider>
				</BrowserRouter>
			</RecipesProvider>
		</GlobalProvider>
	);
}
