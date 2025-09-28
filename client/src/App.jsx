import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import User from "./pages/User";
import GlobalStyles from "./styles/GlobalStyles";
import { IngredientsProvider } from "./context/IngredientsContext";
import { UserProvider } from "./context/UserContext";
import IngredientsSearch from "./pages/IngredientsSearch";
import { FilterProvider } from "./context/FilterContext";
import EditProfile from "./ui/EditProfile";
import ChangePassword from "./ui/ChangePassword";
import ProtectedLayouts from "./ui/ProtectedLayouts";
import AddRecipe from "./features/recipes/AddRecipe";

export default function App() {
	return (
		<GlobalProvider>
			<BrowserRouter>
				<UserProvider>
					<FilterProvider>
						<RecipesProvider>
							<GlobalStyles />
							<PageProvider>
								<IngredientsProvider>
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

											<Route element={<ProtectedLayouts />}>
												<Route path="/addRecipe" element={<AddRecipe />} />
												<Route path="/favorites" element={<Favorites />} />
												<Route path="/user" element={<User />}>
													<Route
														index
														element={<Navigate to="editprofile" replace />}
													/>
													<Route path="editprofile" element={<EditProfile />} />
													<Route
														path="changepassword"
														element={<ChangePassword />}
													/>
												</Route>
												<Route path="*" element={<p>Page not found</p>} />
											</Route>
										</Route>
									</Routes>
								</IngredientsProvider>
							</PageProvider>
						</RecipesProvider>
					</FilterProvider>
				</UserProvider>
			</BrowserRouter>
		</GlobalProvider>
	);
}
