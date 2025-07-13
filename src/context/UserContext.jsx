/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const userContext = createContext();

// Initial state function to check localStorage for user data
const intitialState = () => {
	const loggedUser = localStorage.getItem("user");
	return loggedUser
		? { user: JSON.parse(loggedUser), isAuthenticated: true }
		: { user: null, isAuthenticated: false };
};

// user reducer function
function reducer(state, action) {
	switch (action.type) {
		case "login":
			localStorage.setItem("user", JSON.stringify(action.payload));
			return { ...state, user: action.payload, isAuthenticated: true };
		case "logout":
			localStorage.removeItem("user");
			return { ...state, user: null, isAuthenticated: false };
		default:
			throw new Error("Unknown action dispatched");
	}
}

// user details
const FK_USER = {
	name: "Farsh",
	email: "farsh@example.com",
	password: "beaKing",
	avatar: "https://i.pravatar.cc/107?u=dscZ",
};
function UserProvider({ children }) {
	const [{ user, isAuthenticated }, dispatch] = useReducer(
		reducer,
		undefined, // initial state is undefined
		intitialState
	);

	function login(email, password) {
		if (email === FK_USER.email && password === FK_USER.password) {
			dispatch({ type: "login", payload: FK_USER });
			// localStorage.setItem("user", JSON.stringify(user));
		}
	}

	function logout() {
		dispatch({ type: "logout" });
	}

	return (
		<userContext.Provider value={{ login, logout, user, isAuthenticated }}>
			{children}
		</userContext.Provider>
	);
}

function useUser() {
	const context = useContext(userContext);
	if (context === undefined) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { UserProvider, useUser };
