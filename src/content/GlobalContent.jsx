/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer, useState } from "react";

const GlobalContext = createContext();
const initialState = {
	user: "",
	isAuthenticated: false,
};
function reducer(state, action) {
	switch (action.type) {
		case "login":
			return { ...state, user: action.payload, isAuthenticated: true };
		case "logout":
			return { ...state, user: null, isAuthenticated: false };
		default:
			throw new Error("Unknown action dispatched");
	}
}

const FK_USER = {
	name: "Farsh",
	email: "farsh@example.com",
	password: "beaking",
	avatar: "https://i.pravatar.cc/107?u=dscZ",
};
function GlobalProvider({ children }) {
	// const API_Key = "ae0fc98731a34ef1a9dd2aff9448752b";
	// const API_Key = "c6414a7b8638405386aee74a1cee23e2";
	// const API_Key = "1f390112146b438c9fff53abe569e602";
	const API_Key = "58f1453b84d44ea5a09a1bfe25c4a436";
	// const API_Key = "";

	const [{ user, isAuthenticated }, dispatch] = useReducer(
		reducer,
		initialState
	);

	const convertMinutes = function (minutesGiven) {
		const hour = Math.ceil(minutesGiven / 60);
		const minutes = minutesGiven % 60;

		return `${hour}h:${minutes < 10 ? minutes + "0" : minutes} `;
	};

	const [favorites, setFavorites] = useState(() => {
		const getFavorites = localStorage.getItem("favorites");
		return getFavorites ? JSON.parse(getFavorites) : [];
	});

	function login(email, password) {
		if (email === FK_USER.email && password === FK_USER.password) {
			dispatch({ type: "login", payload: FK_USER });
		}
	}

	function logout() {
		dispatch({ type: "logout" });
	}
	return (
		<GlobalContext.Provider
			value={{
				API_Key,
				favorites,
				setFavorites,
				convertMinutes,
				user,
				isAuthenticated,
				login,
				logout,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
}
function useGlobal() {
	const context = useContext(GlobalContext);

	if (context === undefined)
		throw new Error("No context provided for your query");

	return context;
}

export { GlobalProvider, useGlobal };
