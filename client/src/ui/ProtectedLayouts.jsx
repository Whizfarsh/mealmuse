import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

function ProtectedLayouts() {
	const { isAuthenticated } = useUser();
	// const navigate = useNavigate();

	return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedLayouts;
