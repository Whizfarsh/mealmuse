import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Loader from "./Loading";

function ProtectedLayouts() {
	const { isAuthenticated, isLoading } = useUser();
	// const navigate = useNavigate();

	if (isLoading) return <Loader />;

	return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedLayouts;
