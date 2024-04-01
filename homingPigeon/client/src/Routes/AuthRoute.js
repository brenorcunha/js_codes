import React from "react";
import { Navigate, Route} from "react-router-dom";

const AuthRoute = ({component: Component, isAuthenticated, ...rest}) =>{
    return (
        <Route
            {...rest}
            render={(props) => isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />
            //<component {...props}/> no lugar de <Home se erro.
    );
};

export default AuthRoute;

/* export default function AuthRoute(props) {
    const navigate = useNavigate()

    if(!localStorage.getItem("SESSION_TOKEN")){
        navigate("/")
        return null;
    }
    return <Route {...props} />
} */