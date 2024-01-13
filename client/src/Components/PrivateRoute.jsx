import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../Hooks/useAuthContext";

const PrivateRoute = () => {
    const { user } = useAuthContext();
    return (
        <div className={`PrivateRoute`}>
            {user ? <Outlet /> : <Navigate to="/accounts" />}
        </div>
    );
};

export default PrivateRoute;
