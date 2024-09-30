/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { useLocation } from "react-router-dom";

const PageContext = createContext();

function PageProvider({ children }) {
	const curPage = useLocation().pathname;

	return (
		<PageContext.Provider value={{ curPage }}>{children}</PageContext.Provider>
	);
}

function usePage() {
	const context = useContext(PageContext);

	if (context === undefined)
		throw new Error("usePage is being outside pageProvider");

	return context;
}

export { PageProvider, usePage };
