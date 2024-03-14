import React from "react"
import { useNavigate, Route} from "react-router-dom"

export default function AuthRoute(props) {
    const navigate = useNavigate()

    if(!localStorage.getItem("SESSION_TOKEN")){
        navigate("/")
        return null;
    }
    return <Route {...props} />
}