import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../Hooks/useAuthContext";

const PublicRoute = () => {
    const { user } = useAuthContext();
    return (
        <div className={`PublicRoute`}>
            {!user ? <Outlet /> : <Navigate to="/" />}
        </div>
    );
};

export default PublicRoute;
