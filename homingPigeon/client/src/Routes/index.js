import React from "react";
import { BrowserRouter as Router, Routes as RoutesDOM, Route} from "react-router-dom";
//BrowserRouter: elemente responsável pelo controle dos estados da URL da aplicação;
//Switch/ Routes: sistema de match da rota e URL ;
//Route: declara uma rota e qual elemente deve ser renderizado quando a rota for ativada.
//exact informa ao Switch que a rota a ser ativada deve ser exatamente igual a que foi atribuída, se não adicionássemos isso a rota /register também ativaria a rota.

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../components/Register";
import TweetList from "../components/TweetList";

<link rel="stylesheet" href="../index.css" />;

export default function Routes() {
	return(
		<Router>
			<RoutesDOM>
				<Route path="/" exact element={<Login />} />;
				<Route path="/register" element={<Register />} />;
				<Route path="/home" element={<Home />} />;
				<Route path="/login" element={<Login />} />;
				<Route path="/tweets" element={<TweetList />} />;
			</RoutesDOM>
		</Router>
	)
}

