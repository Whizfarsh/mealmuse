/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const userContext = createContext();

const initialState = {
	user: "",
	statusMessage: "",
	errorMessage: "",
	isAuthenticated: false,
};

// user reducer function
function reducer(state, action) {
	switch (action.type) {
		case "user/logged":
			return { ...state, user: action.payload, isAuthenticated: true };
		case "user/loaded":
			return { ...state, user: action.payload, isAuthenticated: true };
		case "userinfo/updated":
			return {
				...state,
				user: action.payload,
				statusMessage: "Updated succesfully",
			};
		case "logout":
			return { ...state, user: null, isAuthenticated: false };
		case "user/updated":
			return { ...state, statusMessage: action.payload };
		case "error":
			return { ...state, errorMessage: action.payload };
		default:
			throw new Error("Unknown action dispatched");
	}
}

function UserProvider({ children }) {
	const [{ user, isAuthenticated, statusMessage, errorMessage }, dispatch] =
		useReducer(reducer, initialState);

	const navigate = useNavigate();

	//login
	async function login(email, password) {
		try {
			const res = await fetch("/api/v1/users/login", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({ email: email, password: password }),
			});
			const data = await res.json();
			if (!res.ok)
				throw new Error(
					data.message || "Incorrect email and password, please try again!"
				);

			dispatch({ type: "user/logged", payload: data });
		} catch (err) {
			// console.log(err.message);
			dispatch({
				type: "error",
				payload: err.message,
			});
		}
	}

	//logout
	async function logout() {
		await fetch("/api/v1/users/logout", {
			method: "GET",
			headers: {
				"content-type": "application/json",
			},
			credentials: "include",
		});
		dispatch({ type: "logout" });
	}

	//(
	// user profile update
	async function updateUser(newName, newEmail, newImage) {
		const updateData = {};

		if (newName) {
			updateData.name = newName;
		}
		if (newEmail) {
			updateData.email = newEmail;
		}
		if (newImage) {
			updateData.userImage = newImage;
		}

		const res = await fetch("/api/v1/users/updateMyProfile", {
			method: "PATCH",
			headers: {
				"content-type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(updateData),
		});

		if (!res.ok) throw new Error("User can not be updated");

		const data = await res.json();

		console.log(data.data.user);
		dispatch({ type: "userinfo/updated", payload: data.data.user });
	}

	//user password update
	async function updateCurrentPassword(
		currentPassword,
		newPassword,
		newPasswordConfirm
	) {
		const res = await fetch("/api/v1/users/updateMyPassword", {
			method: "PATCH",
			headers: {
				"content-type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				passwordCurrent: currentPassword,
				password: newPassword,
				passwordConfirm: newPasswordConfirm,
			}),
		});

		if (!res.ok) throw new Error("User can not be updated");

		const data = await res.json();

		console.log(data.user);
		logout();
		dispatch({ type: "logout" });
		navigate("/login", { replace: true });
	}

	//effects
	useEffect(() => {
		async function fetchUser() {
			const res = await fetch("/api/v1/users/me");

			if (!res.ok) throw new Error("User not logged in");

			const data = await res.json();

			dispatch({ type: "user/loaded", payload: data.user });
		}
		fetchUser();
	}, []);
	return (
		<userContext.Provider
			value={{
				login,
				logout,
				user,
				isAuthenticated,
				updateUser,
				statusMessage,
				updateCurrentPassword,
				errorMessage,
			}}
		>
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
