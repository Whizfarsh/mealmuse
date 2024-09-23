/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";

const GlobalContext = createContext();
function GlobalProvider({ children }) {
	// const API_Key = "ae0fc98731a34ef1a9dd2aff9448752b";
	// const API_Key = "c6414a7b8638405386aee74a1cee23e2";
	const API_Key = "1f390112146b438c9fff53abe569e602";
	// const API_Key = "58f1453b84d44ea5a09a1bfe25c4a436";
	// const API_Key = "";
	const convertMinutes = function (minutesGiven) {
		const hour = Math.ceil(minutesGiven / 60);
		const minutes = minutesGiven % 60;

		return `${hour}h:${minutes < 10 ? minutes + "0" : minutes} `;
	};
	return (
		<GlobalContext.Provider value={{ API_Key, convertMinutes }}>
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
