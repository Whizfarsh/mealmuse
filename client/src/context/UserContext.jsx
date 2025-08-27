/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const userContext = createContext();

const initialState = {
	user: "",
	isAuthenticated: false,
};

// user reducer function
function reducer(state, action) {
	switch (action.type) {
		case "user/logged":
			return { ...state, user: action.payload, isAuthenticated: true };
		case "logout":
			return { ...state, user: null, isAuthenticated: false };
		default:
			throw new Error("Unknown action dispatched");
	}
}

function UserProvider({ children }) {
	const [{ user, isAuthenticated }, dispatch] = useReducer(
		reducer,
		initialState
	);

	async function login(email, password) {
		const res = await fetch("/api/v1/users/login", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ email: email, password: password }),
		});
		if (!res.ok) throw new Error("Login failed");

		const data = await res.json();

		dispatch({ type: "user/logged", payload: data });
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
