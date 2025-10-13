import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import GlobalStyles from "./styles/GlobalStyles";

import { GlobalProvider } from "./context/GlobalContext";
import { RecipesProvider } from "./context/RecipesContext";
import { PageProvider } from "./context/Pagecontext";
import { UserProvider } from "./context/UserContext";
import { IngredientsProvider } from "./context/IngredientsContext";
import { FilterProvider } from "./context/FilterContext";

import Loader from "./ui/Loading";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const AppLayout = lazy(() => import("./ui/AppLayout"));
const User = lazy(() => import("./pages/User"));
const Login = lazy(() => import("./pages/Login"));
const RecipeDetails = lazy(() => import("./features/recipes/RecipeDetails"));
const RecipesMenus = lazy(() => import("./features/recipes/RecipesMenus"));
const Recipes = lazy(() => import("./pages/Recipes"));
const Favorites = lazy(() => import("./pages/Favorites"));
const IngredientsSearch = lazy(() => import("./pages/IngredientsSearch"));
const EditProfile = lazy(() => import("./ui/EditProfile"));
const ChangePassword = lazy(() => import("./ui/ChangePassword"));
const ProtectedLayouts = lazy(() => import("./ui/ProtectedLayouts"));
const AddRecipe = lazy(() => import("./features/recipes/AddRecipe"));

export default function App() {
	return (
		<GlobalProvider>
			<BrowserRouter>
				<Suspense fallback={<Loader />}>
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
														<Route
															path="editprofile"
															element={<EditProfile />}
														/>
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
				</Suspense>
			</BrowserRouter>
		</GlobalProvider>
	);
}
