import React from "react";
import { Navigate, Route} from "react-router-dom";

const AuthRoute = ({component: Component, isAuthenticated, ...rest}) =>(
    <Route 
    {...rest}
    render={(props) =>
    isAuthenticated ? <component {...props}
/>  : <Navigate to="/login" replace/>
    }
    />
);
export default AuthRoute;

/* export default function AuthRoute(props) {
    const navigate = useNavigate()

    if(!localStorage.getItem("SESSION_TOKEN")){
        navigate("/")
        return null;
    }
    return <Route {...props} />
} */