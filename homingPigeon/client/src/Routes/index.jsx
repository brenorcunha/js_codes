import React from "react";
import {
  BrowserRouter as Router,
  Routes as RoutesDOM,
  Route, Navigate
} from "react-router-dom";
/* BrowserRouter: componente responsável pelo controle dos estados da URL da aplicação.
Switch/Routes: sistema de match da rota e URL.
Route: declara uma rota e qual componente deve ser renderizado quando a rota for ativada.
Exact: informa ao Switch que a rota a ser ativada deve ser exatamente igual a que foi atribuída, se não adicionássemos isso à rota/register também a ativaria.
 */
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../components/Register";
import TweetList from "../components/TweetList";
/* const userIsAuthenticated(){
  
}
 */
const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);


export default function Routes() {
  return (
    <Router>
      <RoutesDOM>
      <ProtectedRoute path="/" exact component={Home} isAuthenticated={userIsAuthenticated}/>
        <ProtectedRoute path="/home" component={Home} isAuthenticated={userIsAuthenticated}/>
        <Route path="/register" element={<Register />} />;
        <Route path="/login" element={<Login />} />;
        <ProtectedRoute path="/tweets" component={TweetList} isAuthenticated={userIsAuthenticated}/>
      </RoutesDOM>
    </Router>
  );
};