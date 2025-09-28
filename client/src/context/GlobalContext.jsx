/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
	const [showMbMenu, setShowMbMenu] = useState(false);

	const convertMinutes = function (minutesGiven) {
		const hour = Math.ceil(minutesGiven / 60);
		const minutes = minutesGiven % 60;

		return `${hour}h:${minutes < 10 ? minutes + "0" : minutes} `;
	};

	const { data: allDiets } = useFetch("/api/v1/diets");
	const { data: allCusines } = useFetch("/api/v1/cuisines");

	return (
		<GlobalContext.Provider
			value={{
				convertMinutes,
				showMbMenu,
				setShowMbMenu,
				allDiets,
				allCusines,
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

// eslint-disable-next-line react-refresh/only-export-components
export { GlobalProvider, useGlobal };
